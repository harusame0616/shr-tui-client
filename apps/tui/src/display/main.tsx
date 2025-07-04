import { Box, Text } from "ink";
import React, { useState } from "react";
import { AccountSelect } from "../account-select";
import { ApiSelect } from "../api-select";
import { Crews } from "../crews";
import { CrewDetail } from "../crew-detail";
import { CrewSearchForm } from "../crew-search-form";
import { useAccounts } from "../use-account";
import { useApi } from "../use-api";
import { useSelectedCrew } from "../use-selected-crew";

export function Main() {
  return (
    <Box>
      <Box flexDirection="column" width={24}>
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
  const [showSearchForm, setShowSearchForm] = useState(false);

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
      <Text>{JSON.stringify(activeApi)}</Text>
    </Box>
  );
}
