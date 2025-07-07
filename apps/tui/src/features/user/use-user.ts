import useSWR from "swr";
import * as v from "valibot";
import { Account } from "../account/use-account";
import { SmartHrUser } from "./smart-hr-user";

const userDetailSchema = v.object({
  userId: v.string(),
  email: v.optional(v.string()),
  admin: v.optional(v.boolean()),
  role: v.nullable(
    v.object({
      id: v.string(),
      name: v.string(),
      description: v.nullable(v.string()),
      crewsScope: v.string(),
      crewsScopeQuery: v.nullable(v.record(v.string(), v.any())),
      sessionTimeoutIn: v.nullable(v.number()),
      presetType: v.nullable(v.string()),
    })
  ),
  agreementForElectronicDelivery: v.nullable(v.boolean()),
  crewId: v.nullable(v.string()),
  invitationCreatedAt: v.nullable(v.string()),
  invitationOpenedAt: v.nullable(v.string()),
  invitationAcceptedAt: v.nullable(v.string()),
  invitationAnsweredAt: v.nullable(v.string()),
  suppressedEmailLogs: v.nullable(
    v.array(
      v.object({
        id: v.string(),
        suppressionType: v.nullable(v.number()),
        updatedAt: v.nullable(v.string()),
        createdAt: v.nullable(v.string()),
      })
    )
  ),
  hasPassword: v.nullable(v.boolean()),
  createdAt: v.nullable(v.string()),
  updatedAt: v.nullable(v.string()),
});

export type User = v.InferOutput<typeof userDetailSchema>;

function toUserDetail(smartHrUser: SmartHrUser) {
  return parseUserDetail({
    userId: smartHrUser.id,
    email: smartHrUser.email || undefined,
    role: smartHrUser.role
      ? {
          id: smartHrUser.role.id,
          crewsScope: smartHrUser.role.crews_scope,
          presetType: smartHrUser.role.preset_type || null,
          name: smartHrUser.role.name,
          crewsScopeQuery: smartHrUser.role.crews_scope_query || null,
          description: smartHrUser.role.description || null,
          sessionTimeoutIn: smartHrUser.role.session_timeout_in || null,
        }
      : null,
    agreementForElectronicDelivery:
      smartHrUser.agreement_for_electronic_delivery,
    crewId: smartHrUser.crew_id,
    invitationCreatedAt: smartHrUser.invitation_created_at,
    invitationOpenedAt: smartHrUser.invitation_opened_at,
    invitationAcceptedAt: smartHrUser.invitation_accepted_at,
    invitationAnsweredAt: smartHrUser.invitation_answered_at,
    suppressedEmailLogs: smartHrUser.suppressed_email_logs
      ? smartHrUser.suppressed_email_logs.map((log) => ({
          id: log.id,
          suppressionType: log.suppression_type || null,
          updatedAt: log.updated_at || null,
          createdAt: log.created_at || null,
        }))
      : null,
    hasPassword: smartHrUser.has_password,
    createdAt: smartHrUser.created_at || null,
    updatedAt: smartHrUser.updated_at || null,
  } satisfies v.InferInput<typeof userDetailSchema>);
}

function parseUserDetail(userDetail: unknown) {
  return v.parse(userDetailSchema, userDetail);
}

const fetcher = async (userId: string | null, account: Account) => {
  if (!userId) {
    return null;
  }

  const url = new URL(`users/${userId}`, account.endpoint);
  const result = await fetch(url, {
    headers: {
      Authorization: `Bearer ${account.token}`,
    },
  });

  return toUserDetail((await result.json()) as SmartHrUser);
};

export function useUser(account: Account, userId: string | null) {
  const { data, error, isLoading } = useSWR(
    [userId, account],
    ([userId, account]) => fetcher(userId, account),
    {
      refreshInterval: 30000,
    }
  );

  if (error) {
    return { data: null, error: error as Error, isLoading: false } as const;
  }

  if (isLoading) {
    return { data: null, error: null, isLoading: true } as const;
  }

  return { data: data ? data : null, error: null, isLoading: false } as const;
}
