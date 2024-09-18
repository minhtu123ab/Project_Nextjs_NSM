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

interface IState<T> {
  count: number;
  results: T[];
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
  url: string;
}

interface IDataSubmitCategory {
  name: string;
  price_type: string;
  image?: File[] | string;
}

interface IDataSubmitMaterial {
  name?: string;
  part_number: string;
  image?: File[] | string;
  category: string;
  supplier: string;
  small_title: string;
  basic_price: number;
  type?: number;
  large_title: string;
  basic_price: number;
}
interface ISetValueMaterial {
  name?: string;
  part_number: string;
  image: NonNullable<string | File[] | undefined>;
  category: string;
  supplier: string;
  small_title: string;
  basic_price: number;
  type?: number;
  large_title: string;
  basic_price: number;
}

interface PaginationTableProps {
  count: number;
  cleanItemToDelete: () => void;
}

interface IPropFormAction<T> {
  onSubmit: (data: T) => Promise<void>;
  setValue: UseFormSetValue<FieldValues>;
  control: Control<TFieldValues, TContext>;
  errors: FieldErrors<TFieldValues>;
  handleSubmit: UseFormHandleSubmit<TFieldValues, TTransformedValues>;
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

interface IDataNameID {
  id: string;
  name: string;
  [key: string]: unknown;
}

interface IPropControllerSelect extends IPropControllerInput {
  data: IDataNameID[];
}

interface IDataSupplier {
  id: string;
  name: string;
  phone_number: string;
  address: string;
  phone: string;
}

interface IDataMaterial {
  id: string;
  name: string;
  image: string;
  part_number: string;
  category: IDataCategory;
  supplier: IDataSupplier;
  small_title: string;
  basic_price: number;
  type: number;
  large_title: string;
}

interface IHocDataFetchingState {
  data: { [key: string]: IDataNameID[] };
  loadingHoc: boolean;
  error: Error | null;
}

interface IPropFormActionMaterial<T> extends IPropFormAction<T> {
  state?: IHocDataFetchingState;
  fetchData?: () => void;
}
