import useSWR from "swr";
import { Account } from "./use-account";
import { SmartHrCrew } from "./smart-hr-crew";
import * as v from "valibot";
import { atom, useAtom } from "jotai";

export interface CrewSearchCondition {
  emp_code?: string;
  user_id?: string;
  dept_id?: string;
  q?: string;
  id?: string;
}

const crewSearchConditionAtom = atom<CrewSearchCondition | undefined>(
  undefined
);

const crewSchema = v.object({
  crewId: v.string(),
  firstName: v.string(),
  lastName: v.string(),
  employeeCode: v.string(),
});

function toCrew(smartHrCrew: SmartHrCrew) {
  return parseCrew({
    crewId: smartHrCrew.id,
    firstName: smartHrCrew.first_name || "",
    lastName: smartHrCrew.last_name || "",
    employeeCode: smartHrCrew.emp_code || "",
  } satisfies v.InferInput<typeof crewSchema>);
}

function parseCrew(crew: unknown) {
  return v.parse(crewSchema, crew);
}

const fetcher = (url: string, token: string) =>
  fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json().then((v) => (v as SmartHrCrew[]).map(toCrew)));

export function useCrews(account: Account) {
  const [searchCondition, setSearchCondition] = useAtom(
    crewSearchConditionAtom
  );
  const url = new URL("crews", account.endpoint);

  // 検索パラメータをURLに追加
  if (searchCondition) {
    if (searchCondition.emp_code) {
      url.searchParams.append("emp_code", searchCondition.emp_code);
    }
    if (searchCondition.user_id) {
      url.searchParams.append("user_id", searchCondition.user_id);
    }
    if (searchCondition.dept_id) {
      url.searchParams.append("dept_id", searchCondition.dept_id);
    }
    if (searchCondition.q) {
      url.searchParams.append("q", searchCondition.q);
    }
    if (searchCondition.id) {
      url.searchParams.append("id", searchCondition.id);
    }
  }

  const { data, error, isLoading } = useSWR(
    [url.href, searchCondition],
    () => fetcher(url.href, account.token),
    {
      refreshInterval: 30000,
    }
  );

  return {
    crews: data || [],
    error,
    isLoading,
    searchCondition,
    setSearchCondition,
  };
}
