/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { AvailableTimes } from "../domain/user";
import { useAppSelector } from "../infrastructure/store";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { DEFAULT_APPOINTMENT_PRICE } from "../constants/payment.constants";
import {
  CONSULTATION_TYPE,
  IBookAppointmentFormData,
} from "../domain/appointment";
import useBookAppointmentFormSchema from "./useBookAppointmentFormSchema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const bookAppointmentUrl = "http://localhost:8082/bookAppointment";

export const useBookAppointment = () => {
  const [availabilityTime, setAvailability] = useState<Array<AvailableTimes>>(
    []
  );
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const validationSchema = useBookAppointmentFormSchema();
  const formMethods = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onSubmit",
    defaultValues: {
      consultation: "" as CONSULTATION_TYPE,
    },
  });
  const { reset } = formMethods;
  const { id, dependentId } = useParams();
  const { user } = useAppSelector((store) => store.userSlice);
  const userId = dependentId || user?.id;

  const showModal = () => {
    setIsModalOpen(true);
  };

  const bookAppointment = async (data: IBookAppointmentFormData) => {
    setLoading(true);
    try {
      await axios.post(bookAppointmentUrl, {
        doctorId: id,
        date: selectedDate,
        startTime: selectedTime,
        userId,
        purpose: data.purpose,
        amountPaid: `${DEFAULT_APPOINTMENT_PRICE.amount} ${DEFAULT_APPOINTMENT_PRICE.currency}`,
        consultation: data.consultation,
      });
      setLoading(false);
      reset();
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

  const consultationOptions = Object.values(CONSULTATION_TYPE).map((type) => ({
    label: type
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" "),
    key: type,
  }));

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
    bookAppointment,
    isLoading,
    formMethods,
    consultationOptions,
  };
};
