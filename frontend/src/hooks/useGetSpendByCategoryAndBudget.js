import { dataService } from "../data";
import { useQuery } from "@tanstack/react-query";

export default function useGetTransactionsbyMonth() {
  return useQuery({
    queryKey: ["monthlyTransactions"],
    queryFn: () => dataService.getSpendByCategoryAndBudget(),
  });
}
