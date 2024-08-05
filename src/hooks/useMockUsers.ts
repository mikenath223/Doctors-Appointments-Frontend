/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { MockUser } from "../domain/user";
import { useIntersectionObserver } from "./useIntersectionObserver";
import { useAppSelector } from "../infrastructure/store";

const fetchMockUsersFunction = "http://localhost:8084/findManyMockUserProfiles";

export const useMockUsers = () => {
  const [mockUsers, setMockUsers] = useState<Array<MockUser> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [limit, setLimit] = useState<number>(10);
  const [offset, setOffset] = useState<number>(0);
  const [isLastItem, setLastItem] = useState<boolean>(false);
  const { user } = useAppSelector((store) => store.userSlice);

  const loader = useRef<HTMLDivElement>(null);

  const fetchMockUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.post(fetchMockUsersFunction, {
        limit,
        offset,
        userId: user?.id,
      });

      setMockUsers((prev) => [...(prev ?? []), ...response.data]);
      setLastItem(response.data.length <= 0);
    } catch (e) {
      toast.error("Failed to fetch mockUsers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMockUsers();
  }, [limit, offset]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const hideModal = () => {
    setIsModalOpen(false);
  };

  const handlePagination = () => {
    setOffset((prevOffset) => prevOffset + 10);
  };

  useIntersectionObserver({ containerRef: loader, onView: handlePagination }, [
    mockUsers,
    isModalOpen,
  ]);

  return {
    mockUsers,
    setOffset,
    setLimit,
    setMockUsers,
    loader,
    isLoading,
    isLastItem,
    showModal,
    hideModal,
    isModalOpen,
  };
};
