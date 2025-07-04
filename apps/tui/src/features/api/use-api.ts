import { atom, useAtom } from "jotai";

const apiList = [
  { apiId: "crews", name: "従業員", path: "crews" },
  { apiId: "users", name: "ユーザー", path: "users" },
  { apiId: "departments", name: "部署", path: "departments" },
] as const;

export type SmartHrApi = (typeof apiList)[number];

const activeApiIdAtom = atom<string | null>(null);

export function useApi() {
  const [activeApiId, setActiveApiId] = useAtom(activeApiIdAtom);

  function selectApi(apiId: string) {
    setActiveApiId(apiId);
  }

  const activeApi = activeApiId
    ? apiList.find(({ apiId }) => apiId === activeApiId)
    : null;

  return { selectApi, activeApi };
}
