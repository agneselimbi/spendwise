import { useQuery } from "@tanstack/react-query";
import { dataService } from "../data";

export default function useGetTransactionsByCategory() {
  return useQuery({
    queryKey: ["spendByCat"],
    queryFn: () => dataService.getSpendByCategory(),
  });
}
