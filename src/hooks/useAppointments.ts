/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Appointment } from "../domain/appointment";
import { toast } from "react-toastify";
import axios from "axios";
import { useAppSelector } from "../infrastructure/store";

const fetchAppointmentURl = "http://localhost:8083/getAppointments";

export const useAppointment = () => {
  const [appointments, setAppointments] = useState<Array<Appointment> | null>(
    null
  );
  const [currTab, setCurrTab] = useState<string>("UPCOMING");
  const [isFetchingAppointments, setIsFetchingAppointments] =
    useState<boolean>(false);

  const { user } = useAppSelector((state) => state.userSlice);

  const fetchAppointments = async () => {
    setIsFetchingAppointments(true);
    try {
      const response = await axios.get(
        `${fetchAppointmentURl}?userId=${user?.id}`
      );
      setAppointments(response.data.appointments);
      setIsFetchingAppointments(false);
    } catch (error) {
      toast.error("An error occured fetching appointments");
      setIsFetchingAppointments(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return {
    appointments,
    currTab,
    isFetchingAppointments,
    setCurrTab,
  };
};
