import React from "react";
import { Availability } from "../../domain/user";
import { useBookAppointment } from "../../hooks/useBookAppointment";
import { Button } from "../atoms/Button";
import BasicDateCalendar from "../atoms/DateCalender";
import CustomModal from "./CustomModal";
import { CustomInput } from "../atoms/Input";
import { usePayment } from "../../hooks/usePayment";
import { InfoCircleFilled } from "@ant-design/icons";
import { DEFAULT_APPOINTMENT_PRICE } from "../../constants/payment.constants";
import { CustomDropdown } from "../atoms/Dropdown";
import { FormHookForm } from "./Form";
import { IBookAppointmentFormData } from "../../domain/appointment";
import { useParams } from "react-router-dom";
import { useAppointmentManagement } from "../../hooks/useAppointmentManagement";

interface BookAppointmentProp {
  availability?: Availability[];
  fetchDoctorDetails: () => Promise<void>;
}

const BookAppointment: React.FC<BookAppointmentProp> = ({
  availability,
  fetchDoctorDetails,
}) => {
  const {
    availabilityTime,
    handleCancel,
    isModalOpen,
    selectedDate,
    selectedTime,
    setAvailability,
    setSelectedDate,
    setSelectedTime,
    showModal,
    isLoading,
    bookAppointment,
    consultationOptions,
    formMethods,
  } = useBookAppointment();
  const { handleFlutterPayment, closePaymentModal } = usePayment();
  const {
    handleSubmit,
    formState: { errors, isValid },
  } = formMethods;

  const onSubmit = (data: IBookAppointmentFormData) => {
    handleFlutterPayment({
      callback: async () => {
        await bookAppointment(data);
        await fetchDoctorDetails();
        closePaymentModal();
      },
      onClose: () => {},
    });
  };
  const purposeInputError = errors["purpose"];
  const params = useParams();
  const { appointmentId: rescheduleAppointmentId } = params;

  const { rescheduleAppointment, isLoading: isReschedulingLoading } =
    useAppointmentManagement();

  const onRescheduleAppointment = async () => {
    await rescheduleAppointment(selectedDate, selectedTime);
    await fetchDoctorDetails();
  };

  const renderReschedulingText = () =>
    isReschedulingLoading ? "Rescheduling..." : "Reschedule Appointment";

  return (
    <div className="">
      <CustomModal
        title="Book Appointment"
        isOpen={isModalOpen}
        handleCancel={handleCancel}
        handleOk={handleSubmit(onSubmit)}
        isLoading={isLoading}
      >
        <FormHookForm<IBookAppointmentFormData> {...formMethods}>
          <CustomInput
            type="textArea"
            label="Purpose of booking appointment"
            className="h-[150px] mb-4"
            placeholder="Please tell us the purpose of this appointment"
            error={
              !isValid && purposeInputError
                ? (purposeInputError.message as string)
                : undefined
            }
            formkey="purpose"
          />
          <CustomDropdown
            label="Select Consultation Preference"
            options={consultationOptions}
            formkey="consultation"
          />
          {!rescheduleAppointmentId && (
            <div className="flex items-center gap-1 mt-2">
              <InfoCircleFilled />
              <p className="text-gray-600">{`You'll be charged ${DEFAULT_APPOINTMENT_PRICE.amount} ${DEFAULT_APPOINTMENT_PRICE.currency}`}</p>
            </div>
          )}
        </FormHookForm>
      </CustomModal>
      <div className="flex items-center">
        <BasicDateCalendar
          setSelectedDate={setSelectedDate}
          setAvailability={setAvailability}
          availability={availability}
        />
        <div className="h-64 overflow-y-auto space-y-2">
          {availabilityTime.map((time, _index: number) => (
            <Button
              label={time.startTime}
              isDisabled={!time.available}
              style={{
                backgroundColor:
                  selectedTime === time.startTime ? "#1818A6" : "",
              }}
              key={_index}
              className={`w-[150px] ${
                selectedTime === time.startTime && "text-white"
              }`}
              onClick={() => setSelectedTime(time.startTime)}
            />
          ))}
        </div>
      </div>
      <Button
        label={
          rescheduleAppointmentId
            ? renderReschedulingText()
            : "Book Appointment"
        }
        className="rounded-xl"
        isDisabled={!selectedDate || !selectedTime || isReschedulingLoading}
        onClick={() =>
          rescheduleAppointmentId ? onRescheduleAppointment() : showModal()
        }
      />
    </div>
  );
};

export default BookAppointment;
