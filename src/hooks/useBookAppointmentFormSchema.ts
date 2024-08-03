import { useMemo } from "react";
import * as Yup from "yup";
import { CONSULTATION_TYPE } from "../domain/appointment";

export default function useBookAppointmentFormSchema() {
  const validationSchema = useMemo(
    () =>
      Yup.object().shape({
        purpose: Yup.string().required("Purpose is required"),
        consultation: Yup.mixed<CONSULTATION_TYPE>()
          .required("Please select a consultation type")
          .oneOf(
            Object.values(CONSULTATION_TYPE),
            "Please select a consultation type"
          ),
      }),
    []
  );

  return validationSchema;
}
