import { HeartOutlined } from "@ant-design/icons";
import { Image } from "antd";
import React from "react";
import ActiveDot from "../atoms/ActiveDot";
import { Button } from "../atoms/Button";
import { useNavigate } from "react-router-dom";

export interface DoctorCardProp {
  name: string;
  specialty: string;
  experience: string;
  successRate: number;
  userStoriesCount: number;
  nextAvailableTime: string;
  doctorId: string;
  doctorPhoto: string;
}

const DoctorCard: React.FC<DoctorCardProp> = ({
  doctorPhoto,
  name,
  experience,
  doctorId,
  nextAvailableTime,
  specialty,
  successRate,
  userStoriesCount,
}) => {
  const navigate = useNavigate();
  return (
    <div className="rounded-md bg-white drop-shadow-lg border p-[1.5rem]">
      <div className="flex items-center space-x-3">
        <Image
          src={doctorPhoto}
          style={{ height: "150px", width: "150px" }}
          preview={false}
          className="rounded-md"
          alt={name}
          loading="lazy"
        />
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <h3 className="text-[18px] font-semibold">{name}</h3>
            <HeartOutlined color="red" />
          </div>
          <h3 className="font-semibold text-[#1818A6]">{specialty}</h3>
          <p className="text-sm">{experience} experience</p>
          <div className="flex text-sm items-center space-x-[2rem]">
            <div className="flex items-center space-x-1">
              <ActiveDot />
              <p>{successRate}%</p>
            </div>
            <div className="flex items-center space-x-1">
              <ActiveDot />
              <p>{userStoriesCount} patient stories</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between scrollbar-hide mt-2">
        <div>
          <h3 className="font-semibold text-[#1818A6]">Next Available</h3>
          <p>{nextAvailableTime}</p>
        </div>
        <Button
          label="Book now"
          className="w-[130px]"
          onClick={() => navigate(`doctor/${doctorId}`)}
        />
      </div>
    </div>
  );
};

export default DoctorCard;
