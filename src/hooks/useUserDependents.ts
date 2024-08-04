/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { User } from "../domain/user";
import { useAppSelector } from "../infrastructure/store";

const fetchUserDependentsFunction = "http://localhost:8085/findUserDependents";

export const useUserDependents = () => {
  const [dependents, setDependents] = useState<Array<User> | null>(null);
  const { user } = useAppSelector((store) => store.userSlice);
  const [isLoading, setLoading] = useState<boolean>(false);

  const loader = useRef<HTMLDivElement>(null);

  const fetchUserDependents = async () => {
    setLoading(true);
    try {
      const response = await axios.post(fetchUserDependentsFunction, {
        userId: user?.id,
      });

      setDependents(response.data);
    } catch (e) {
      toast.error("Failed to fetch user dependents");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDependents();
  }, []);

  return {
    dependents,
    setDependents,
    loader,
    isLoading,
    fetchUserDependents,
  };
};
