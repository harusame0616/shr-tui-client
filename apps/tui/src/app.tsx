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

  if (!activeAccount) {
    return (
      <Box>
        <Text>アカウントを作成して選択してください</Text>
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
          <Text>not implemented</Text>
        </Box>
      );
    default:
        throw new Error(`Unexpected route: ${router.route satisfies never}`);
  }
}
