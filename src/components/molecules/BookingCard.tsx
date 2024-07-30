import { EnvironmentOutlined } from "@ant-design/icons";
import { Image } from "antd";
import moment from "moment";
import React from "react";
import { Button } from "../atoms/Button";

export interface BookingCardProp {
  date: string;
  time: string;
  photo: string;
  name: string;
  specialty: string;
  address: string;
}
const BookingCard: React.FC<BookingCardProp> = ({
  date,
  time,
  photo,
  address,
  name,
  specialty,
}) => {
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
        </div>
      </div>
      <hr />
      <div className="flex items-center justify-between gap-[2rem]">
        <Button label="Cancel" className="rounded-3xl h-[40px]" />
        <Button
          label="Reschedule"
          className="rounded-3xl text-white h-[40px]"
          style={{
            backgroundColor: "#1818A6",
          }}
        />
      </div>
    </div>
  );
};

export default BookingCard;
