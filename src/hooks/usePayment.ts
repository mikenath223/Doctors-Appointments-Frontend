import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import { DEFAULT_APPOINTMENT_PRICE } from "../constants/payment.constants";
import { FlutterwaveConfig } from "flutterwave-react-v3/dist/types";
import { useAppSelector } from "../infrastructure/store";
import { useParams } from "react-router-dom";

const generateUniqueTransactionRef = (userId: string, doctorId: string) => {
  return `${userId}-${doctorId}-${Math.floor(
    Math.random() * 1000000
  )}-${new Date().getTime()}`;
};

export const usePayment = () => {
  const { user } = useAppSelector((store) => store.userSlice);
  const { id, dependentId } = useParams();
  const userId = dependentId || user?.id;

  const config: FlutterwaveConfig = {
    public_key: import.meta.env.VITE_FLUTTERWAVE_PUBLIC_KEY,
    tx_ref: generateUniqueTransactionRef(userId ?? "", id ?? ""),
    amount: DEFAULT_APPOINTMENT_PRICE.amount,
    currency: DEFAULT_APPOINTMENT_PRICE.currency,
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email: user?.email || "",
      phone_number: user?.phoneNo || "",
      name: user?.name || "",
    },
    meta: {
      user_id: userId,
      doctor_id: id,
      has_parent_profile: dependentId && true,
      parent_profile: {
        name: user?.name || "",
        email: user?.email || "",
        phone_number: user?.phoneNo || "",
      },
    },
    customizations: {
      title: "Appointment Booking",
      description: "Booking appointment with a doctor",
      logo: "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  return {
    handleFlutterPayment,
    closePaymentModal,
    flutterwaveConfig: config,
  };
};
