import { HeartOutlined } from "@ant-design/icons";
import { Image } from "antd";
import React from "react";
import { Button } from "../atoms/Button";
import { useAddUserDependent } from "../../hooks/useAddUserDependent";

export interface UserCardProp {
  name: string;
  userPhoto: string;
  email: string;
  userDependentId: string;
  isAddedUserProfile: boolean;
}

const MockUserCard: React.FC<UserCardProp> = ({
  userPhoto,
  name,
  email,
  userDependentId,
  isAddedUserProfile,
}) => {
  const { addUserDependent, isLoading, isUserDependentAdded } =
    useAddUserDependent();

  const onAddUserDependent = (dependentId: string, dependentName: string) => {
    addUserDependent(dependentId, dependentName);
  };

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
      <div className="flex items-center justify-center mt-5">
        <Button
          label={isLoading ? "Adding..." : "Add Profile"}
          className="w-[130px]"
          isDisabled={isLoading || isUserDependentAdded || isAddedUserProfile}
          onClick={() => onAddUserDependent(userDependentId, name)}
        />
      </div>
    </div>
  );
};

export default MockUserCard;
