/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { User } from "../domain/user";
import { useIntersectionObserver } from "./useIntersectionObserver";
import { useAppSelector } from "../infrastructure/store";

const fetchUserDependentsFunction = "http://localhost:8085/findUserDependents";

export const useUserDependents = () => {
  const [dependents, setDependents] = useState<Array<User> | null>(null);
  const { user } = useAppSelector((store) => store.userSlice);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [limit, setLimit] = useState<number>(10);
  const [offset, setOffset] = useState<number>(0);
  const [isLastItem, setLastItem] = useState<boolean>(false);

  const loader = useRef<HTMLDivElement>(null);

  const fetchUserDependents = async () => {
    setLoading(true);
    try {
      const response = await axios.post(fetchUserDependentsFunction, {
        userId: user?.id,
        limit,
        offset,
      });

      setDependents((prev) => [...(prev ?? []), ...response.data]);
      setLastItem(response.data.length <= 0);
    } catch (e) {
      toast.error("Failed to fetch user dependents");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDependents();
  }, [limit, offset]);

  const handlePagination = () => {
    setOffset((prevOffset) => prevOffset + 10);
  };

  useIntersectionObserver({ containerRef: loader, onView: handlePagination }, [
    dependents,
  ]);

  return {
    dependents,
    setDependents,
    setOffset,
    setLimit,
    loader,
    isLoading,
    isLastItem,
  };
};
