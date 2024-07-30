/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { Doctor } from "../domain/user";
import { useIntersectionObserver } from "./useIntersectionObserver";
import useDebouncedSearch from "./useDebounceSearch";

const fetchDoctorsFunction = "http://localhost:8080/findManyDoctors";

export const useDoctor = () => {
  const [doctors, setDoctors] = useState<Array<Doctor> | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [limit, setLimit] = useState<number>(10);
  const [offset, setOffset] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const [isLastItem, setLastItem] = useState<boolean>(false);

  const loader = useRef<HTMLDivElement>(null);

  const debouncedSearchTerm = useDebouncedSearch(searchTerm, 1200);

  const fetchDoctors = async (search: string) => {
    setLoading(true);
    try {
      const response = await axios.post(fetchDoctorsFunction, {
        limit,
        offset,
        search: search || null,
      });

      if (isSearch) {
        setDoctors(response.data);
      } else {
        setDoctors((prev) => [...(prev ?? []), ...response.data]);
        setLastItem(response.data.length <= 0);
      }
    } catch (e) {
      toast.error("Failed to fetch doctors");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors(debouncedSearchTerm);
  }, [debouncedSearchTerm, limit, offset]);

  const handlePagination = () => {
    setIsSearch(false);
    setOffset((prevOffset) => prevOffset + 10);
  };

  const handleSearch = (query: string) => {
    if (query === "") {
      setIsSearch(false);
    } else {
      setIsSearch(true);
    }
    setSearchTerm(query);
    setOffset(0);
  };

  useIntersectionObserver({ containerRef: loader, onView: handlePagination }, [
    doctors,
  ]);

  return {
    doctors,
    setOffset,
    setLimit,
    setDoctors,
    loader,
    handleSearch,
    searchTerm,
    isLoading,
    isSearch,
    setSearchTerm,
    setIsSearch,
    isLastItem,
  };
};
