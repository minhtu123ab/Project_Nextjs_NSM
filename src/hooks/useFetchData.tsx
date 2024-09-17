import axiosInstance from "@/axios/axiosInstance";
import { useEffect, useState } from "react";
import useGetQueryParams from "./useGetQueryParams";

const useFetchData = <T,>(url: string) => {
  const [state, setState] = useState<IState<T>>({
    count: 0,
    results: [],
    loading: true,
    error: false,
  });
  const [checkCallApi, setCheckCallApi] = useState(false);

  const queryParams = useGetQueryParams();

  useEffect(() => {
    try {
      setState((prev) => ({ ...prev, loading: true }));
      const fetchData = async () => {
        const response = await axiosInstance.get(url, {
          params: {
            limit: process.env.NEXT_PUBLIC_COUNT,
            offset: (Number(queryParams.page || 1) - 1) * 5,
            name: queryParams.name,
            category: queryParams.category,
          },
        });
        setState((prev) => ({
          ...prev,
          count: response.data.count,
          results: response.data.results,
        }));
      };
      fetchData();
    } catch (err) {
      console.log(err);
      setState((prev) => ({ ...prev, error: true }));
    } finally {
      setState((prev) => ({ ...prev, loading: false }));
    }
  }, [
    queryParams.name,
    queryParams.page,
    checkCallApi,
    url,
    queryParams.category,
  ]);

  const reloadState = () => {
    setCheckCallApi((prev) => !prev);
  };
  return { state, reloadState };
};

export default useFetchData;
