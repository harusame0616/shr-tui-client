import { atom, useAtom } from "jotai";

export const Api = {
  Crews: { apiId: "Crews", name: "従業員", path: "crews" },
  Users: { apiId: "Users", name: "ユーザー", path: "users" },
  Departments: { apiId: "Departments", name: "部署", path: "departments" },
} as const;
export type Api = (typeof Api)[keyof typeof Api];

const activeApiIdAtom = atom<Api["apiId"]>(Api.Crews.apiId);

export function useApi() {
  const [activeApiId, setActiveApiId] = useAtom(activeApiIdAtom);

  function selectApi(apiId: Api["apiId"]) {
    setActiveApiId(apiId);
  }

  const activeApi = Api[activeApiId];

  return { selectApi, activeApi };
}
