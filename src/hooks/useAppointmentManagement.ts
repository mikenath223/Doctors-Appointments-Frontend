/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const cancelAppointmentUrl = "http://localhost:8087/cancelAppointment";
const rescheduleAppointmentUrl = "http://localhost:8088/rescheduleAppointment";

export const useAppointmentManagement = () => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const { appointmentId } = useParams();

  const cancelAppointment = async (appointmentId: string) => {
    setLoading(true);
    try {
      await axios.post(cancelAppointmentUrl, {
        appointmentId,
      });
      toast("Appointment canceled successfully");
    } catch (error: any) {
      toast.error(error.response.data.msg);
    } finally {
      setLoading(false);
    }
  };

  const rescheduleAppointment = async (newDate: string, newTime: string) => {
    setLoading(true);
    try {
      await axios.post(rescheduleAppointmentUrl, {
        appointmentId,
        newDate,
        newTime,
      });
      toast("Appointment rescheduled successfully");
    } catch (error: any) {
      toast.error(error.response.data.msg);
    } finally {
      setLoading(false);
    }
  };

  return {
    cancelAppointment,
    rescheduleAppointment,
    isLoading,
  };
};
