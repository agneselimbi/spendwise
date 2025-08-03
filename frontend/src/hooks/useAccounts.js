import { useQuery } from "@tanstack/react-query";
import { dataService } from "../data";

export default function useAccounts() {
  return useQuery({
    queryKey: ["account"],
    queryFn: () => dataService.getAccounts(),
  });
}
