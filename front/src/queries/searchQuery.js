import { useQuery } from "react-query";

import http from "libs/apiController";

export const useGetTourList = () => {
  return useQuery(["useGetTourList"], async () => {
    const res = await http.get("/tour");
    const data = res.data;
    return data;
  });
};

export const useGetTourSearch = (name) => {
  return useQuery(["useGetTourSearch"], async () => {
    const res = await http.get(`/tour/search?name=${name}`);
    const data = res.data;
    return data;
  });
};
