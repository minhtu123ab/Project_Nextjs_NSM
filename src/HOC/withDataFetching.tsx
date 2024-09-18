"use client";

import { useEffect, useState, ComponentType } from "react";
import axiosInstance from "@/axios/axiosInstance";

function withDataFetching<T>(
  WrappedComponent: ComponentType<T>,
  urls: string[]
) {
  return function WithDataFetchingComponent(props: T) {
    const [state, setState] = useState<IHocDataFetchingState>({
      data: {},
      loadingHoc: true,
      error: null,
    });

    const fetchData = async () => {
      try {
        setState((prevState) => ({ ...prevState, loadingHoc: true }));

        // Fetch the count first with limit=1
        const countResponses = await Promise.all(
          urls.map((url) => axiosInstance.get(url, { params: { limit: 1 } }))
        );

        // Extract count from the first API call
        const counts = countResponses.map((response) => response.data.count);

        // Now fetch all data with limit=count
        const fetchedData = await Promise.all(
          urls.map((url, index) =>
            axiosInstance.get(url, { params: { limit: counts[index] } })
          )
        );

        const dataMap = urls.reduce((acc, url, index) => {
          acc[url] = fetchedData[index].data.results;
          return acc;
        }, {} as { [key: string]: IDataNameID[] });

        setState({ data: dataMap, loadingHoc: false, error: null });
        // if (parseInt((Math.random() * 100).toString()) % 5 !== 0)
        //   throw new Error();
      } catch (e) {
        console.error(e);
        setState({ data: {}, loadingHoc: false, error: e as Error });
      }
    };

    useEffect(() => {
      fetchData();
    }, []);

    return <WrappedComponent state={state} fetchData={fetchData} {...props} />;
  };
}

export default withDataFetching;
