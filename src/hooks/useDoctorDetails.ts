/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { DoctorDetails } from "../domain/user";

const getDoctorProfileFunction = "http://localhost:8081/getDoctorDetails";

export const useDoctorDetails = () => {
  const [doctorDetails, setDoctorDetails] = useState<DoctorDetails | null>(
    null
  );
  const [isLoading, setLoading] = useState<boolean>(false);
  const { id } = useParams();
 
  const fetchDoctorDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${getDoctorProfileFunction}?id=${id}`);
      setDoctorDetails(response.data);
      setLoading(false);
    } catch (error) {
      toast.error("Failed to fetch doctors profile.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctorDetails();
  }, [id]);
  return { doctorDetails, fetchDoctorDetails, isLoading };
};
