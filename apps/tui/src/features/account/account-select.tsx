import { Box, Text, useFocus, useInput } from "ink";
import { useAccounts } from "./use-account";
import { Select } from "@inkjs/ui";
import React from "react";
import { Display, useDisplay } from "../../use-display";

export function AccountSelect() {
  const { isFocused, focus } = useFocus({
    id: "account-select",
    autoFocus: true,
  });
  const { setDisplay } = useDisplay();
  const { activateAccount, accounts, activeAccount } = useAccounts();

  useInput(
    (input, key) => {
      if (input === "a") {
        focus("none");
        setDisplay(Display.AccountAddition);
      }
    },
    {
      isActive: isFocused,
    }
  );

  return (
    <Box borderStyle="round" flexDirection="column" height={9}>
      <Text bold={isFocused}>{isFocused && "▶  "}アカウント</Text>
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
        visibleOptionCount={5}
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
