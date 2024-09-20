import { useRef, useState } from "react";

const useHandleModalDetails = <T,>() => {
  const [itemDetails, setItemDetails] = useState<T>();

  const modalDetailsRef = useRef<IHandleModal>(null);

  const openModalDetails = (e: { stopPropagation: () => void }, item: T) => {
    e.stopPropagation();
    setItemDetails(item);
    modalDetailsRef.current?.handleOpen();
  };
  return {
    itemDetails,
    modalDetailsRef,
    openModalDetails,
  };
};

export default useHandleModalDetails;
