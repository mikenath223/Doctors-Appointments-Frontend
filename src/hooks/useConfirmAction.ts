import { useState } from "react";
import { CONFIRM_ACTION_TYPE } from "../domain/appointment";

interface ConfirmActionParams {
  title: string;
  message: string;
  handleOk: () => void;
  handleCancel: () => void;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setActionType: (action: CONFIRM_ACTION_TYPE) => void;
}

export const useConfirmAction = (
  onCancelAppointment: () => void,
  onReschedule: () => void,
  doctorName: string
): ConfirmActionParams => {
  const [isOpen, setIsOpen] = useState(false);
  const [actionType, setActionType] = useState<CONFIRM_ACTION_TYPE>(
    CONFIRM_ACTION_TYPE.CANCEL_APPOINTMENT
  );

  const handleCancel = () => {
    setIsOpen(false);
  };

  const setConfirmActionParams = (
    title: string,
    message: string,
    handleOk: () => void
  ) => {
    return {
      title,
      message,
      handleOk,
      handleCancel,
      isOpen,
      setActionType,
      setIsOpen,
    };
  };

  switch (actionType) {
    case CONFIRM_ACTION_TYPE.CANCEL_APPOINTMENT:
      return setConfirmActionParams(
        "Cancel Appointment",
        `Are you sure you want to cancel this appointment with ${doctorName}?`,
        onCancelAppointment
      );
    case CONFIRM_ACTION_TYPE.RESCHEDULE_APPOINTMENT:
      return setConfirmActionParams(
        "Reschedule Appointment",
        `Are you sure you want to reschedule this appointment with ${doctorName}?`,
        onReschedule
      );
    default:
      return setConfirmActionParams("Error", "Something went wrong", () => {});
  }
};
