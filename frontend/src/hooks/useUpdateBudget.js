import { useMutation, useQueryClient } from "@tanstack/react-query";
import { dataService } from "../data";
export default function useUpdateBudget() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (newBudget) => dataService.updateBudget(newBudget),
    onSuccess: () => {
      qc.invalidateQueries(["budget"]);
    },
    onError: (error) => alert(`Unable to update Budget : ${error.message}`),
  });
}
