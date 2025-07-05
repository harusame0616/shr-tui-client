import { atom, useAtom } from "jotai";

export const Route = {
  Crews: "crews",
  CrewsWithSearch: "crewsWithSearch",
  AccountAddition: "accountAddition",
  Departments: "departments",
  Users: "users",
} as const;
type Route = (typeof Route)[keyof typeof Route];

const routeAtom = atom<Route>(Route.Crews);
export function useRouter(): { route: Route; push(route: Route): void } {
  const [route, setRoute] = useAtom(routeAtom);

  function push(route: Route) {
    setRoute(route);
  }

  return {
    route,
    push,
  };
}
