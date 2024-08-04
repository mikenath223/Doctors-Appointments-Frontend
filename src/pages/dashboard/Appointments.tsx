import { LeftOutlined } from "@ant-design/icons";
import React, { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppointment } from "../../hooks/useAppointments";
import BookingCard from "../../components/molecules/BookingCard";

const tabs = ["UPCOMING", "COMPLETED", "CANCELLED"];

const Appointments: React.FC = () => {
  const navigate = useNavigate();
  const {
    currTab,
    setCurrTab,
    appointments,
    isFetchingAppointments,
    fetchAppointments,
  } = useAppointment();

  const filteredAppointments = useMemo(
    () => appointments?.filter((appointment) => appointment.status === currTab),
    [appointments, currTab]
  );

  const { dependentId } = useParams();

  return (
    <div>
      <div className="flex items-center space-x-[6rem]">
        <LeftOutlined onClick={() => navigate(-1)} />
        <h3 className="py-[2rem] font-bold text-[20px]">{`My Bookings${
          dependentId ? " for dependent profile" : ""
        }`}</h3>
      </div>

      <div className="w-full px-4">
        <div className="tabs">
          {tabs.map((tab, _index) => (
            <div
              key={_index}
              className={`tab ${currTab === tab ? "active" : ""}`}
              onClick={() => setCurrTab(tab)}
            >
              {tab}
            </div>
          ))}
        </div>
        <div className="space-y-3 max-h-[680px] overflow-y-auto">
          {isFetchingAppointments ? (
            <h3 className="text-center">Fetching appointments...</h3>
          ) : filteredAppointments && filteredAppointments.length > 0 ? (
            filteredAppointments.map((appointment, index: number) => (
              <BookingCard
                key={index}
                name={appointment.doctor.name}
                address={
                  appointment?.doctor.address ?? "48 Emily Akinola Street"
                }
                date={appointment.date}
                photo={appointment.doctor.photo}
                specialty={appointment.doctor.specialty}
                time={appointment.time}
                meetingLink={appointment.meetingLink}
                consultation={appointment.consultation}
                amountPaid={appointment.amountPaid}
                doctorId={appointment.doctorId}
                appointmentId={appointment.id}
                fetchAppointments={fetchAppointments}
                appointMentStatus={appointment.status}
              />
            ))
          ) : (
            <h3 className="text-center">
              No {currTab.toLowerCase()} appointments.
            </h3>
          )}
        </div>
      </div>
    </div>
  );
};

export default Appointments;
