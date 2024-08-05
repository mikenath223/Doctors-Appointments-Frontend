import {
  EllipsisOutlined,
  EnvironmentFilled,
  LeftOutlined,
  WalletOutlined,
} from "@ant-design/icons";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useDoctorDetails } from "../../hooks/useDoctorDetails";
import { Image, Rate } from "antd";
import BookAppointment from "../../components/molecules/BookAppointment";
import { DEFAULT_APPOINTMENT_PRICE } from "../../constants/payment.constants";

const DoctorDetails: React.FC = () => {
  const { doctorDetails, isLoading, fetchDoctorDetails } = useDoctorDetails();
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex items-center justify-between py-[1rem] mt-[1rem]">
        <LeftOutlined onClick={() => navigate(-1)} />
        <h3 className="text-[18px] font-semibold">Doctor Detail</h3>
        <EllipsisOutlined className="rotate-90" />
      </div>
      {isLoading ? (
        <h3 className="text-center">loading doctors profile...</h3>
      ) : (
        <div>
          <div className="flex items-center gap-[2rem] mt-[2rem]">
            <Image
              src={doctorDetails?.photo}
              style={{ height: "200px", width: "200px" }}
              loading="lazy"
              preview={false}
            />
            <div className="space-y-1">
              <h3 className="text-[30px] tracking-wide font-semibold">
                {doctorDetails?.name}
              </h3>
              <p className="text-[18x] font-medium text-[#1818A6]">
                {doctorDetails?.specialty}
              </p>
              <Rate
                allowHalf
                defaultValue={doctorDetails?.profileInfo.ratings}
              />
              <div className="flex items-center gap-1">
                <EnvironmentFilled />
                <p className="text-gray-600">800m away</p>
              </div>
              <div className="flex items-center gap-1">
                <WalletOutlined />
                <p className="text-gray-600">{`${DEFAULT_APPOINTMENT_PRICE.amount} ${DEFAULT_APPOINTMENT_PRICE.currency}`}</p>
              </div>
            </div>
          </div>
          <div className="mt-[2rem]">
            <h3 className="text-[30px] font-bold text-[#1818A6]">About</h3>
            <p>{doctorDetails?.about}</p>
          </div>

          <BookAppointment
            availability={doctorDetails?.availability}
            fetchDoctorDetails={fetchDoctorDetails}
          />
        </div>
      )}
    </div>
  );
};

export default DoctorDetails;
