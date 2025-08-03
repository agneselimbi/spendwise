import { useQuery } from "@tanstack/react-query";
import { dataService } from "../data";

export default function useGetBudgetProgress() {
  return useQuery({
    queryKey: ["budgetProgress"],
    queryFn: () => dataService.getBudgetProgress(),
  });
}
