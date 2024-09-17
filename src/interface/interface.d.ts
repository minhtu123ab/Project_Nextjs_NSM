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

interface IState {
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

interface ISetValueFormCategory {
  price_type: string;
  name: string;
  image: NonNullable<string | File[] | undefined>;
}

interface IDataAddCategory {
  name: string;
  image: File | null;
  price_type: string;
}

interface IModalDelete {
  itemDelete: string[] | IItemToDelete;
  reloadState: () => void;
  cleanItemToDelete: () => void;
}

interface IDataSubmitCategory {
  name: string;
  price_type: string;
  image?: File[] | string;
}

interface PaginationTableProps {
  count: number;
  cleanItemToDelete: () => void;
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
  action: string;
  urlImageEdit?: string;
}

interface IPropControllerImage {
  setValue: UseFormSetValue<ISetValueFormCategory>;
  control: Control<TFieldValues, TestContext>;
  urlImageEdit?: string;
  errors: FieldErrors<TFieldValues>;
}

interface IPropControllerInput {
  control: Control<TFieldValues, TestContext>;
  errors: FieldErrors<TFieldValues>;
  name: string;
  label: string;
  required: boolean;
  type: string;
}

interface IDataControllerSelect {
  value: string;
  name: string;
}

interface IPropControllerSelect extends IPropControllerInput {
  data: IDataControllerSelect[];
}
