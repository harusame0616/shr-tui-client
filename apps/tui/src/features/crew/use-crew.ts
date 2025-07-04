import useSWR from "swr";
import { Account } from "../account/use-account";
import { SmartHrCrew } from "./smart-hr-crew";
import { SmartHrUser } from "./smart-hr-user";
import * as v from "valibot";

const crewDetailSchema = v.object({
  crewId: v.string(),
  userId: v.optional(v.nullable(v.string())),
  firstName: v.string(),
  lastName: v.string(),
  firstNameYomi: v.string(),
  lastNameYomi: v.string(),
  businessFirstName: v.optional(v.nullable(v.string())),
  businessLastName: v.optional(v.nullable(v.string())),
  employeeCode: v.string(),
  employmentStatus: v.optional(v.nullable(v.string())),
  resignedAt: v.optional(v.nullable(v.string())),
  email: v.optional(v.nullable(v.string())),
  employmentType: v.optional(v.nullable(v.string())),
  position: v.optional(v.nullable(v.string())),
  department: v.optional(v.nullable(v.string())),
  enteredAt: v.optional(v.nullable(v.string())),
  birthAt: v.optional(v.nullable(v.string())),
  gender: v.optional(v.nullable(v.string())),
  telNumber: v.optional(v.nullable(v.string())),
  address: v.optional(
    v.object({
      zipCode: v.optional(v.string()),
      pref: v.optional(v.string()),
      city: v.optional(v.string()),
      street: v.optional(v.string()),
      building: v.optional(v.string()),
    })
  ),
  role: v.optional(
    v.object({
      id: v.optional(v.string()),
      name: v.optional(v.string()),
    })
  ),
  activated: v.optional(v.boolean()),
  suspended: v.optional(v.boolean()),
});

type CrewDetail = v.InferOutput<typeof crewDetailSchema>;

function toCrewDetail(
  crew: SmartHrCrew,
  user?: SmartHrUser | null
): CrewDetail {
  return parseCrewDetail({
    crewId: crew.id,
    userId: crew.user_id,
    firstName: crew.first_name || "",
    lastName: crew.last_name || "",
    firstNameYomi: crew.first_name_yomi || "",
    lastNameYomi: crew.last_name_yomi || "",
    businessFirstName: crew.business_first_name,
    businessLastName: crew.business_last_name,
    employeeCode: crew.emp_code || "",
    employmentStatus: crew.emp_status,
    resignedAt: crew.resigned_at,
    email: user?.email,
    employmentType: crew.employment_type?.name,
    position: crew.position || crew.positions?.[0]?.name,
    department: crew.department || crew.departments?.[0]?.name,
    enteredAt: crew.entered_at,
    birthAt: crew.birth_at,
    gender: crew.gender,
    telNumber: crew.tel_number,
    address: crew.address
      ? {
          zipCode: crew.address.zip_code,
          pref: crew.address.pref,
          city: crew.address.city,
          street: crew.address.street,
          building: crew.address.building,
        }
      : undefined,
    role: user?.role
      ? {
          id: user.role.id,
          name: user.role.name,
        }
      : undefined,
    activated: user?.activated,
    suspended: user?.suspended,
  } satisfies v.InferInput<typeof crewDetailSchema>);
}

function parseCrewDetail(crewDetail: unknown) {
  return v.parse(crewDetailSchema, crewDetail);
}

const crewFetcher = async (
  url: string,
  token: string
): Promise<SmartHrCrew> => {
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch crew: ${response.statusText}`);
  }
  return response.json() as Promise<SmartHrCrew>;
};

const userFetcher = async (
  url: string | null,
  token: string
): Promise<SmartHrUser | null> => {
  if (!url) {
    return null;
  }

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch user: ${response.statusText}`);
  }
  return response.json() as Promise<SmartHrUser | null>;
};

export function useCrew(account: Account, crewId: string) {
  const crewUrl = new URL(`crews/${crewId}`, account.endpoint);

  const {
    data: crewData,
    error: crewError,
    isLoading: crewLoading,
  } = useSWR(
    [crewUrl.href, account.token],
    ([url, token]) => crewFetcher(url, token),
    {
      refreshInterval: 30000,
    }
  );

  const {
    data: userData,
    error: userError,
    isLoading: userLoading,
  } = useSWR(
    [
      crewData?.user_id
        ? new URL(`users/${crewData.user_id}`, account.endpoint).href
        : null,
      account.token,
    ],
    ([url, token]) => userFetcher(url, token),
    {
      refreshInterval: 30000,
    }
  );

  const isLoading = crewLoading || (crewData?.user_id && userLoading);
  const error = crewError || userError;
  const crew = crewData && !isLoading ? toCrewDetail(crewData, userData) : null;

  return {
    crew,
    error,
    isLoading,
  };
}
