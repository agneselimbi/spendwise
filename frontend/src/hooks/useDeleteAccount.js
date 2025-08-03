import { useMutation, useQueryClient } from "@tanstack/react-query";
import { dataService } from "../data";

export default function useDeleteAccount() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (acct_id) => dataService.deleteAccount(acct_id),
    onSuccess: () => qc.invalidateQueries(["account"]),
    onError: (error) => {
      alert(`Error deleting account : ${error.message}`);
    },
  });
}
