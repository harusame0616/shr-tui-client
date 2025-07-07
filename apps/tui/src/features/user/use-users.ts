import useSWR from "swr";
import { Account } from "../account/use-account";
import { SmartHrUser } from "./smart-hr-user";
import * as v from "valibot";

const userSchema = v.object({
  userId: v.string(),
  email: v.optional(v.string()),
  firstName: v.optional(v.string()),
  lastName: v.optional(v.string()),
  name: v.optional(v.string()),
});

function toUser(smartHrUser: SmartHrUser) {
  return parseUser({
    userId: smartHrUser.id,
    email: smartHrUser.email || undefined,
    firstName: smartHrUser.first_name || undefined,
    lastName: smartHrUser.last_name || undefined,
    name: smartHrUser.name || undefined,
  } satisfies v.InferInput<typeof userSchema>);
}

function parseUser(user: unknown) {
  return v.parse(userSchema, user);
}

const fetcher = (url: string, token: string) =>
  fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json().then((v) => (v as SmartHrUser[]).map(toUser)));

export function useUsers(account: Account) {
  const url = new URL("users", account.endpoint);

  const { data, error, isLoading } = useSWR(
    url.href,
    () => fetcher(url.href, account.token),
    {
      refreshInterval: 30000,
    }
  );

  return {
    users: data || [],
    error,
    isLoading,
  };
}
