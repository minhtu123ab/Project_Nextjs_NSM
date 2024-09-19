import { usePathname, useRouter, useSearchParams } from "next/navigation";

const useNavigateAction = (urlAction: string) => {
  const router = useRouter();

  const query = useSearchParams().toString();

  const pathname = usePathname();

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
