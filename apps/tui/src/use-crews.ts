import useSWR from "swr";
import { Account } from "./use-account";
import { SmartHrCrew } from "./smart-hr-crew";
import * as v from "valibot";

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
  const url = new URL("crews", account.endpoint);

  const { data, error, isLoading } = useSWR(
    url.href,
    () => fetcher(url.href, account.token),
    {
      refreshInterval: 30000,
    }
  );

  return {
    crews: data || [],
    error,
    isLoading,
  };
}
