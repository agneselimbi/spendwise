import { useQuery } from "@tanstack/react-query";
import { dataService } from "../data";

export function useTransactions() {
  return useQuery({
    queryKey: ["transactions"],
    queryFn: dataService.getTransaction,
  });
}

export function useTransactionsByAccount(accountName) {
  return useQuery(
    {
      queryKey: ["transactions", accountName],
      queryFn: () => dataService.getTransactionsByAccount(accountName),
    }
    // {
    //   enabled: Boolean(accountName), // only run once `account` is non-null
    //   keepPreviousData: true, // optional: avoids emptying `data` during refetch
    // }
  );
}
