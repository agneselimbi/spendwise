import { useMutation, useQueryClient } from "@tanstack/react-query";
import { dataService } from "../data";

export default function useDeleteBudget() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (budget_id) => dataService.deleteBudget(budget_id),
    onSuccess: () => qc.invalidateQueries(["budget"]),
    onError: (error) => {
      alert(`Error deleting budget category : ${error.message}`);
    },
  });
}
