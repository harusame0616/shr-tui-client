import { Box, Text } from "ink";
import React from "react";
import { AccountSelect } from "../account-select";
import { ApiSelect } from "../api-select";

export function Main() {
  return (
    <Box flexDirection="column">
        <AccountSelect />
        <ApiSelect />
    </Box>
  );
}
