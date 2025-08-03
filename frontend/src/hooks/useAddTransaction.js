import { useMutation, useQueryClient } from "@tanstack/react-query";
import { dataService } from "../data";

export default function useAddTransaction() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (tx) => dataService.addTransaction(tx),
    onSuccess: () => qc.invalidateQueries(["transactions"]),
    onError: (error) => {
      alert(`Error adding Transaction: ${error.message}`);
    },
  });
}
