import { Box, Text } from "ink";
import React from "react";
import { AccountSelect } from "../account-select";
import { ApiSelect } from "../api-select";
import { Crews } from "../crews";
import { CrewDetail } from "../crew-detail";
import { useAccounts } from "../use-account";
import { useApi } from "../use-api";
import { useSelectedCrew } from "../use-selected-crew";

export function Main() {
  return (
    <Box>
      <Box flexDirection="column">
        <AccountSelect />
        <ApiSelect />
      </Box>
      <Box flexGrow={1}>
        <Content />
      </Box>
    </Box>
  );
}

function Content() {
  const { activeAccount } = useAccounts();
  const { activeApi } = useApi();
  const { selectedCrewId } = useSelectedCrew();

  if (!activeAccount) {
    return <Text>アカウントを選択してください</Text>;
  }

  if (!activeApi) {
    return <Text>API を選択してください</Text>;
  }

  if (activeApi.apiId === "crews") {
    return (
      <Box width="100%">
        <Box width={40}>
          <Crews account={activeAccount} />
        </Box>
        <Box flexGrow={1}>
          {selectedCrewId && <CrewDetail account={activeAccount} />}
        </Box>
      </Box>
    );
  }

  return (
    <Box>
      <Text>{JSON.stringify(activeApi)}</Text>
    </Box>
  );
}
