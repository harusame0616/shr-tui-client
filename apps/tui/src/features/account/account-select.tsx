import { Box, Text, useFocus, useInput } from "ink";
import { useAccounts } from "./use-account";
import { Select } from "@inkjs/ui";
import React from "react";
import { Route, useRouter } from "../router/use-router";

export function AccountSelect() {
  const router = useRouter();
  const { isFocused } = useFocus({
    id: "account-select",
    autoFocus: false,
  });
  const { activateAccount, accounts, activeAccount } = useAccounts();

  useInput(
    (input) => {
      if (input === "a") {
        router.push(Route.AccountAddition);
      }
    },
    { isActive: isFocused }
  );

  return (
    <Box borderStyle="round" flexDirection="column" height={9}>
      <Text>アカウント</Text>
      {isFocused && <Text dimColor>※ Aキーで追加</Text>}
      <Box
        width="100%"
        borderStyle={"single"}
        borderTop={false}
        borderLeft={false}
        borderRight={false}
      />
      <Select
        isDisabled={!isFocused}
        defaultValue={activeAccount?.accountId}
        visibleOptionCount={4}
        options={accounts.map((account) => ({
          label: account.name,
          value: account.accountId,
        }))}
        onChange={(newValue) => {
          activateAccount(newValue);
        }}
      />
    </Box>
  );
}
