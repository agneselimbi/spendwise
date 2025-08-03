import { useQuery } from "@tanstack/react-query";
import { dataService } from "../data";

export default function useGetBudgets() {
  return useQuery({
    queryKey: ["budgets"],
    queryFn: () => dataService.getBudgets(),
  });
}
