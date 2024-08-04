import {
  EnvironmentOutlined,
  IdcardOutlined,
  VideoCameraOutlined,
  WalletOutlined,
} from "@ant-design/icons";
import { Image } from "antd";
import moment from "moment";
import React from "react";
import { Button } from "../atoms/Button";
import { useNavigate } from "react-router-dom";
import { useAppointmentManagement } from "../../hooks/useAppointmentManagement";
import {
  APPOINTMENT_STATUS,
  CONFIRM_ACTION_TYPE,
} from "../../domain/appointment";
import ConfirmationModal from "./ConfirmationModal";
import { useConfirmAction } from "../../hooks/useConfirmAction";

export interface BookingCardProp {
  date: string;
  time: string;
  photo: string;
  name: string;
  specialty: string;
  address: string;
  meetingLink?: string;
  consultation?: string;
  amountPaid?: string;
  doctorId: string;
  appointmentId: string;
  fetchAppointments: () => Promise<void>;
  appointMentStatus: APPOINTMENT_STATUS;
}
const BookingCard: React.FC<BookingCardProp> = ({
  date,
  time,
  photo,
  address,
  name,
  specialty,
  meetingLink,
  consultation,
  amountPaid,
  doctorId,
  appointmentId,
  fetchAppointments,
  appointMentStatus,
}) => {
  const navigate = useNavigate();
  const { cancelAppointment, isLoading } = useAppointmentManagement();

  const onCancelAppointment = async () => {
    await cancelAppointment(appointmentId);
    await fetchAppointments();
  };

  const onReschedule = () =>
    navigate(`/reschedule-appointment/${appointmentId}/doctor/${doctorId}`);

  const {
    handleOk,
    title,
    message,
    setActionType,
    isOpen,
    handleCancel,
    setIsOpen,
  } = useConfirmAction(onCancelAppointment, onReschedule, name);

  const isAppointmentButtonsDisabled =
    appointMentStatus !== APPOINTMENT_STATUS.upcoming;

  return (
    <div className="rounded-lg drop-shadow-lg border p-4 space-y-2">
      <h3 className="font-semibold">
        {moment(date).format("MMMM DD, YYYY")} - {time}
      </h3>
      <hr />
      <div className="flex items-center gap-[1rem]">
        <Image
          src={photo}
          preview={false}
          loading="lazy"
          className="rounded-md"
          style={{ height: "150px", width: "150px" }}
        />
        <div>
          <h3>{name}</h3>
          <h3>{specialty}</h3>
          <div className="flex items-center space-x-1">
            <EnvironmentOutlined />
            <p className="text-sm">{address}</p>
          </div>
          {meetingLink && (
            <div className="flex items-center space-x-1 mt-2">
              <VideoCameraOutlined className="text-green-500" />
              <p className="text-sm">{meetingLink}</p>
            </div>
          )}
          {consultation && (
            <div className="flex items-center space-x-1 mt-2">
              <IdcardOutlined className="text-red-500" />
              <p className="text-sm">{consultation}</p>
            </div>
          )}
          {amountPaid && (
            <div className="flex items-center space-x-1 mt-2">
              <WalletOutlined className="text-blue-500" />
              <p className="text-sm">{amountPaid}</p>
            </div>
          )}
        </div>
      </div>
      <hr />
      <div className="flex items-center justify-between gap-[2rem]">
        <Button
          label={isLoading ? "Cancelling..." : "Cancel"}
          isDisabled={isAppointmentButtonsDisabled || isLoading}
          onClick={() => {
            setIsOpen(true);
            setActionType(CONFIRM_ACTION_TYPE.CANCEL_APPOINTMENT);
          }}
          className="rounded-3xl h-[40px]"
        />
        <Button
          label="Reschedule"
          className="rounded-3xl text-white h-[40px] disabled:text-gray-400"
          onClick={() => {
            setIsOpen(true);
            setActionType(CONFIRM_ACTION_TYPE.RESCHEDULE_APPOINTMENT);
          }}
          isDisabled={isAppointmentButtonsDisabled}
          style={{
            backgroundColor: "#1818A6",
          }}
        />
      </div>
      <ConfirmationModal
        title={title}
        handleOk={handleOk}
        handleCancel={handleCancel}
        isOpen={isOpen}
        isLoading={isLoading}
      >
        {message}
      </ConfirmationModal>
    </div>
  );
};

export default BookingCard;
