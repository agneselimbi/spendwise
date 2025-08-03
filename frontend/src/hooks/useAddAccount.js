import { useMutation, useQueryClient } from "@tanstack/react-query";
import { dataService } from "../data";

export default function useAddAccount() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (newAcct) => dataService.addAccount(newAcct),
    onSuccess: () => qc.invalidateQueries(["account"]),
    onError: (error) => {
      alert(`Error adding Account : ${error.message}`);
    },
  });
}
