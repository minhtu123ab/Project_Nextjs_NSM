interface IDataLogin {
  email: string;
  password: string;
}

interface IToken {
  access: string;
  refresh: string;
}

interface IDataCategory {
  id: string;
  name: string;
  image: string;
  price_type: string;
}

interface IStateCategory {
  count: number;
  results: IDataCategory[];
  loading: boolean;
  error: boolean;
}

interface IIdData {
  id: string;
}

interface IModalDeleteRef {
  current: {
    handleClose: () => void;
    handleOpen: () => void;
  } | null;
}

interface IHandleModal {
  handleClose: () => void;
  handleOpen: () => void;
}

interface IItemToDelete {
  id: string;
  name: string;
}

interface IDataEditCategory {
  id: string;
  name: string;
  image: string;
  price_type: string;
}

interface IDataAddCategory {
  name: string;
  image: File | null;
  price_type: string;
}

interface IModalDelete {
  itemDelete: string[] | IItemToDelete;
  setCheckCallApi: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IDataSubmitCategory {
  name: string;
  price_type: string;
  image?: File[] | string;
}

interface IPropFormActionCategory {
  onSubmit: (data: IDataSubmitCategory) => Promise<void>;
  setValue: UseFormSetValue<FieldValues>;
  control: Control<{
    image: NonNullable<string | File[] | undefined>;
    name: string;
    price_type: string;
  }>;
  errors: FieldErrors<{
    price_type: string;
    name: string;
    image: NonNullable<string | File[] | undefined>;
  }>;
  handleSubmit: UseFormHandleSubmit<
    {
      price_type: string;
      name: string;
      image: NonNullable<string | File[] | undefined>;
    },
    undefined
  >;
}
