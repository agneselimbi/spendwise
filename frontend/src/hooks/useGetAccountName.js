import { useQuery } from "@tanstack/react-query";
import { dataService } from "../data";
export default function useGetAccountName() {
  return useQuery({
    queryKey: ["accountName"],
    queryFn: () => dataService.getAccountName(),
  });
}
