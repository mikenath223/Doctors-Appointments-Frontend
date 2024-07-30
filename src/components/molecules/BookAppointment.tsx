import React from "react";
import { Availability } from "../../domain/user";
import { useBookAppointment } from "../../hooks/useBookAppointment";
import { Button } from "../atoms/Button";
import BasicDateCalendar from "../atoms/DateCalender";
import CustomModal from "./CustomModal";
import { CustomInput } from "../atoms/Input";

interface BookAppointmentProp {
  availability?: Availability[];
}

const BookAppointment: React.FC<BookAppointmentProp> = ({ availability }) => {
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
    setPurpose,
    isLoading,
    bookAppointment,
  } = useBookAppointment();

  return (
    <div className="">
      <CustomModal
        title="Book Appointment"
        isOpen={isModalOpen}
        handleCancel={handleCancel}
        handleOk={bookAppointment}
        isLoading={isLoading}
      >
        <CustomInput
          onChange={(e) => setPurpose(e.target.value)}
          type="textArea"
          label="Purpose of booking appointment"
          className="h-[150px]"
          placeholder="Please tell us the purpose of this appointment"
        />
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
        label="Book Appointment"
        className="rounded-xl"
        isDisabled={!selectedDate || !selectedTime}
        onClick={showModal}
      />
    </div>
  );
};

export default BookAppointment;
