import { CloseOutlined, SearchOutlined } from "@ant-design/icons";
import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/atoms/Button";
import { CustomInput } from "../../components/atoms/Input";
import DoctorCard from "../../components/molecules/DoctorCard";
import { Doctor } from "../../domain/user";
import { useDoctor } from "../../hooks/useDoctor";

const Dashboard: React.FC = () => {
  const {
    doctors,
    loader,
    isLoading,
    handleSearch,
    searchTerm,
    isSearch,
    setSearchTerm,
    setIsSearch,
    isLastItem,
  } = useDoctor();
  return (
    <div>
      <div className="flex items-center justify-between py-[1rem] mt-3">
        <h3 className="font-bold text-[20px]">Find Doctors</h3>
        <Link to="/appointments">
          <Button label="Appointment History" />
        </Link>
      </div>
      <CustomInput
        className="h-[60px]"
        value={searchTerm}
        placeholder="Search doctor names"
        onChange={(e) => handleSearch(e.target.value)}
        prefix={<SearchOutlined />}
        suffix={
          <CloseOutlined
            onClick={() => {
              setSearchTerm("");
              setIsSearch(false);
            }}
          />
        }
      />
      <div className="max-h-[700px] overflow-y-auto space-y-[1rem] mt-2">
        {doctors?.map((doctor: Doctor, _index: number) => (
          <DoctorCard
            key={_index}
            doctorId={doctor.id}
            doctorPhoto={doctor.photo}
            experience={doctor.profileInfo.experience}
            name={doctor.name}
            nextAvailableTime={moment(`${doctor.nextAvailableSlot.date},
              ${doctor.nextAvailableSlot.startTime}`).format(
              "MMMM DD, YYYY h:mm A"
            )}
            specialty={doctor.specialty}
            successRate={doctor.profileInfo.successRate}
            userStoriesCount={doctor.profileInfo.patientStories}
          />
        ))}
        {isLoading ? (
          <h3 className="text-center">Fetching doctors...</h3>
        ) : !doctors || doctors.length === 0 ? (
          <h3 className="text-center">No Doctors found.</h3>
        ) : null}

        {!isSearch && !isLastItem && (
          <div ref={loader} className="h-10 w-full" />
        )}
      </div>
    </div>
  );
};

export default Dashboard;