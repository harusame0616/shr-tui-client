import { Box, Text } from "ink";
import React from "react";
import { AccountSelect } from "../account-select";

export function Main() {
  return (
    <Box flexDirection="column">
        <AccountSelect />
    </Box>
  );
}
