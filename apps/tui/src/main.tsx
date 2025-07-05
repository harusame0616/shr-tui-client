import { Box, Text } from "ink";
import React, { useState } from "react";
import { AccountSelect } from "./features/account/account-select";
import { ApiSelect } from "./features/api/api-select";
import { CrewDetail } from "./features/crew/crew-detail";
import { CrewSearchForm } from "./features/crew/crew-search-form";
import { useAccounts } from "./features/account/use-account";
import { Api, useApi } from "./features/api/use-api";
import { useSelectedCrew } from "./features/crew/use-selected-crew";
import { Crews } from "./features/crew/crews";

export function Main() {
  return (
    <Box gap={1}>
      <Box flexDirection="column" width={24}>
        <AccountSelect />
        <ApiSelect />
      </Box>
      <Content />
    </Box>
  );
}

function Content() {
  const { activeAccount } = useAccounts();
  const { activeApi } = useApi();
  const { selectedCrewId } = useSelectedCrew();
  const [showSearchForm, setShowSearchForm] = useState(false);

  if (!activeAccount) {
    return <Text>アカウントを選択してください</Text>;
  }

  if (!activeApi) {
    return <Text>API を選択してください</Text>;
  }

  if (activeApi.apiId === Api.Crews.apiId) {
    return (
      <Box width="100%">
        <Box width={40}>
          <Crews
            account={activeAccount}
            onSearchKeyPress={() => setShowSearchForm(true)}
          />
        </Box>
        <Box flexGrow={1}>
          {showSearchForm ? (
            <CrewSearchForm
              onSubmit={() => {
                setShowSearchForm(false);
              }}
              onCancel={() => {
                setShowSearchForm(false);
              }}
            />
          ) : (
            selectedCrewId && <CrewDetail account={activeAccount} />
          )}
        </Box>
      </Box>
    );
  }

  return (
    <Box>
      <Text>Not implemented</Text>
    </Box>
  );
}
