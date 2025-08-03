import { useQuery } from "@tanstack/react-query";
import { dataService } from "../data";

export default function useGetBudgetById(id) {
  return useQuery({
    queryKey: ["budget", id],
    queryFn: () => dataService.getBudgetById(id),
  });
}
