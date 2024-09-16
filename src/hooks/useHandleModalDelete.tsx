import { useRef, useState } from "react";

const useHandleModalDelete = () => {
  const [itemToDelete, setItemToDelete] = useState<IItemToDelete>();

  const modalDeleteAllRef = useRef<IHandleModal>(null);
  const modalDeleteRef = useRef<IHandleModal>(null);

  const openModalDeleteAll = () => {
    modalDeleteAllRef.current?.handleOpen();
  };

  const openModalDelete = (
    e: { stopPropagation: () => void },
    item: IItemToDelete
  ) => {
    e.stopPropagation();
    setItemToDelete(item);
    modalDeleteRef.current?.handleOpen();
  };
  return {
    itemToDelete,
    modalDeleteAllRef,
    modalDeleteRef,
    openModalDeleteAll,
    openModalDelete,
  };
};

export default useHandleModalDelete;
