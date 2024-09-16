"use client";

import { useEffect, useState } from "react";

const useSelectDelete = (data: IIdData[]) => {
  const [checkAll, setCheckAll] = useState(false);
  const [idDelete, setIdDelete] = useState<string[]>([]);

  useEffect(() => {
    setCheckAll(idDelete.length > 0);
  }, [idDelete.length]);

  const onClickDeleteAll = () => {
    const newCheckAll = !checkAll;
    setCheckAll(newCheckAll);
    setIdDelete(newCheckAll ? data.map((item) => item.id) : []);
  };

  const onClickSelectDelete = (item: IIdData) => {
    setIdDelete((prevId) => {
      const newIdDelete = prevId.includes(item.id)
        ? prevId.filter((id) => id !== item.id)
        : [...prevId, item.id];
      return newIdDelete;
    });
  };

  return {
    checkAll,
    idDelete,
    setCheckAll,
    setIdDelete,
    onClickDeleteAll,
    onClickSelectDelete,
  };
};

export default useSelectDelete;
