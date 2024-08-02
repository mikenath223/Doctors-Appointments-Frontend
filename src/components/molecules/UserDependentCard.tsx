import { HeartOutlined } from "@ant-design/icons";
import { Image } from "antd";
import React from "react";
import { Button } from "../atoms/Button";
import { Link } from "react-router-dom";

export interface UserCardProp {
  name: string;
  userPhoto: string;
  email: string;
  userDependentId: string;
}

const UserDependentCard: React.FC<UserCardProp> = ({
  userPhoto,
  name,
  email,
  userDependentId,
}) => {
  return (
    <div className="rounded-md bg-white drop-shadow-lg border p-[1.5rem]">
      <div className="flex items-center space-x-3">
        <Image
          src={userPhoto}
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
          <h3 className="font-semibold text-[#1818A6]">{email}</h3>
        </div>
      </div>
      <div className="flex items-center justify-between mt-5">
        <Link to={`/appointments/${userDependentId}`}>
          <Button label="View Appointments" />
        </Link>
        <Link to={`/book-dependent-appointment/${userDependentId}`}>
          <Button label="Book Appointment" />
        </Link>
      </div>
    </div>
  );
};

export default UserDependentCard;
