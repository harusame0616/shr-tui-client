import { Box, Text } from "ink";
import React, { PropsWithChildren } from "react";
import { AccountAdditionForm } from "./features/account/accont-addition-form";
import { AccountSelect } from "./features/account/account-select";
import { useAccounts } from "./features/account/use-account";
import { ApiSelect } from "./features/api/api-select";
import { CrewDetail } from "./features/crew/crew-detail";
import { CrewSearchForm } from "./features/crew/crew-search-form";
import { Crews } from "./features/crew/crews";
import { useSelectedCrew } from "./features/crew/use-selected-crew";
import { Route, useRouter } from "./features/router/use-router";
import { Users } from "./features/user/users";
import { UserDetail } from "./features/user/user-detail";
import { useSelectedUser } from "./features/user/use-selected-user";

export function App() {
  return (
    <AppLayout>
      <Page />
    </AppLayout>
  );
}

function AppLayout({ children }: PropsWithChildren) {
  return (
    <Box width="100%">
      <Menu />
      {children}
    </Box>
  );
}

function Menu() {
  return (
    <Box flexDirection="column" width={24}>
      <AccountSelect />
      <ApiSelect />
    </Box>
  );
}

function Page() {
  const { activeAccount } = useAccounts();
  const router = useRouter();
  const { selectedCrewId } = useSelectedCrew();
  const { selectedUserId } = useSelectedUser();

  if (!activeAccount) {
    return (
      <Box flexDirection="column" width="100%">
        <Text>最初に Smart HR のアカウントを登録してください</Text>
        <AccountAdditionForm />
      </Box>
    );
  }

  switch (router.route) {
    case Route.Crews:
      return (
        <Box>
          <Box width={40}>
            <Crews account={activeAccount} />
          </Box>
          <Box flexGrow={1}>
            {selectedCrewId && <CrewDetail account={activeAccount} />}
          </Box>
        </Box>
      );
    case Route.CrewsWithSearch:
      return (
        <Box>
          <Box width={40}>
            <Crews account={activeAccount} />
          </Box>
          <Box flexGrow={1}>
            <CrewSearchForm />
          </Box>
        </Box>
      );
    case Route.AccountAddition:
      return (
        <Box>
          <AccountAdditionForm />
        </Box>
      );
    case Route.Departments:
      return (
        <Box>
          <Text>not implemented</Text>
        </Box>
      );
    case Route.Users:
      return (
        <Box>
          <Box width={40}>
            <Users account={activeAccount} />
          </Box>
          <Box flexGrow={1}>
            {selectedUserId && <UserDetail account={activeAccount} />}
          </Box>
        </Box>
      );
    default:
      throw new Error(`Unexpected route: ${router.route satisfies never}`);
  }
}
