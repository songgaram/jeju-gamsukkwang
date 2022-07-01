import { useQuery } from "react-query";

import http from "libs/apiController";

export const useGetList = (isSelected) => {
  return useQuery(["useGetList", isSelected], async () => {
    const res = await http.get(`/recommend/${isSelected}`);
    const data = res.data;
    return data;
  });
};
