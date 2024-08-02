/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useAppSelector } from "../infrastructure/store";
import { toast } from "react-toastify";
import axios from "axios";

const addUserDependentUrl = "http://localhost:8085/addUserDependent";

export const useAddUserDependent = () => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isUserDependentAdded, setIsUserDependentAdded] =
    useState<boolean>(false);

  const { user } = useAppSelector((store) => store.userSlice);

  const addUserDependent = async (
    dependentId: string,
    dependentName: string
  ) => {
    setLoading(true);
    try {
      await axios.post(addUserDependentUrl, {
        userDependentId: dependentId,
        userId: user?.id,
      });
      toast(`${dependentName} added successfully`);
      setIsUserDependentAdded(true);
    } catch (error: any) {
      setIsUserDependentAdded(false);
      toast.error(error.response.data.msg);
    } finally {
      setLoading(false);
    }
  };

  return {
    addUserDependent,
    isLoading,
    isUserDependentAdded,
  };
};
