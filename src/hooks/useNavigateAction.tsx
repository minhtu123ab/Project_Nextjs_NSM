import { usePathname, useSearchParams, useRouter } from "next/navigation";

const useNavigateAction = (urlAction: string) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const query = searchParams.toString();

  const navigateCreate = () => {
    router.push(`${pathname}/${urlAction}?${query}`);
  };

  const navigateUpdate = (e: { stopPropagation: () => void }, id: string) => {
    e.stopPropagation();
    router.push(`${pathname}/formActions/update/${id}?${query}`);
  };
  return { navigateCreate, navigateUpdate };
};

export default useNavigateAction;
