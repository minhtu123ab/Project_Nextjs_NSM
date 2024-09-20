import { usePathname, useRouter, useSearchParams } from "next/navigation";

const useNavigateAction = (action: string) => {
  const router = useRouter();

  const query = useSearchParams().toString();

  const pathname = usePathname();

  const navigateCreate = () => {
    router.push(`${pathname}/${action}?${query}`);
  };

  const navigateUpdate = (e: { stopPropagation: () => void }, id: string) => {
    e.stopPropagation();
    router.push(`${pathname}/${action}/${id}?${query}`);
  };
  return { navigateCreate, navigateUpdate };
};

export default useNavigateAction;
