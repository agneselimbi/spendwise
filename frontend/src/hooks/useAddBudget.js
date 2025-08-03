import { useMutation, useQueryClient } from "@tanstack/react-query";
import { dataService } from "../data";
export default function useAddBudget() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (newBudget) => dataService.addBudget(newBudget),
    onSuccess: () => {
      qc.invalidateQueries(["budget"]);
    },
    onError: (error) =>
      alert(`Unable to add new budget category : ${error.message}`),
  });
}
