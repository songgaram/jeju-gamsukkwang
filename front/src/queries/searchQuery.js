import { useQuery } from "react-query";

import http from "libs/apiController";

export const useGetTourList = () => {
  return useQuery(["useGetTourList"], async () => {
    const res = await http.get("/tour");
    const data = res.data;
    return data;
  });
};
