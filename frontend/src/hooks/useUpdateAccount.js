import { useMutation, useQueryClient } from "@tanstack/react-query";
import { dataService } from "../data";

export default function useUpdateAccount() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (newAcct) => dataService.updateAccount(newAcct),
    onSuccess: () => qc.invalidateQueries(["account"]),
    onError: (error) => {
      alert(`Error updating Transaction: ${error.message}`);
    },
  });
}
