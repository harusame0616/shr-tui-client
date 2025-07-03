import { Box, Text } from "ink";
import React from "react";
import { AccountSelect } from "../account-select";
import { ApiSelect } from "../api-select";
import { Crews } from "../crews";
import { useAccounts } from "../use-account";
import { useApi } from "../use-api";

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

  if (!activeAccount) {
    return <Text>アカウントを選択してください</Text>;
  }

  if (!activeApi) {
    return <Text>API を選択してください</Text>;
  }

  if (activeApi.apiId === "crews") {
    return <Crews account={activeAccount} />;
  }

  return (
    <Box>
      <Text>{JSON.stringify(activeApi)}</Text>
    </Box>
  );
}
