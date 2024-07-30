/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { AvailableTimes } from "../domain/user";
import { useAppSelector } from "../infrastructure/store";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const bookAppointmentUrl = "http://localhost:8082/bookAppointment";

export const useBookAppointment = () => {
  const [availabilityTime, setAvailability] = useState<Array<AvailableTimes>>(
    []
  );
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [purpose, setPurpose] = useState<string>("");

  const { user } = useAppSelector((store) => store.userSlice);
  const { id } = useParams();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const bookAppointment = async () => {
    setLoading(true);
    try {
      await axios.post(bookAppointmentUrl, {
        doctorId: id,
        date: selectedDate,
        startTime: selectedTime,
        userId: user?.id,
        purpose,
      });
      setLoading(false);
      setPurpose("");
      toast("Appointment booked successfully");
      setIsModalOpen(false);
    } catch (error: any) {
      toast.error(error.response.data.msg);
      setLoading(false);
    }
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return {
    availabilityTime,
    selectedDate,
    setSelectedDate,
    isModalOpen,
    setSelectedTime,
    selectedTime,
    setAvailability,
    showModal,
    handleOk,
    handleCancel,
    setPurpose,
    bookAppointment,
    isLoading,
  };
};
