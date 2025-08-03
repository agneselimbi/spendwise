import { useQuery } from "@tanstack/react-query";
import { dataService } from "../data";

export default function useAccountById(id) {
  return useQuery({
    queryKey: ["account", id],
    queryFn: () => dataService.getAccountById(id),
  });
}
