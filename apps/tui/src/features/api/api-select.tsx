import { Box, Text, useFocus } from "ink";
import { Api, useApi } from "./use-api";
import { Select } from "@inkjs/ui";
import React from "react";

export function ApiSelect() {
  const { isFocused } = useFocus({ id: "api-select", autoFocus: false });
  const { selectApi, activeApi } = useApi();

  const apiList = Object.values(Api);

  return (
    <Box borderStyle="round" flexDirection="column" height={9}>
      <Text bold={isFocused}>{isFocused && "▶  "}API</Text>
      <Box
        width="100%"
        borderStyle={"single"}
        borderTop={false}
        borderLeft={false}
        borderRight={false}
      />
      <Select
        isDisabled={!isFocused}
        defaultValue={activeApi.apiId}
        visibleOptionCount={5}
        options={apiList.map((api) => ({
          label: api.name,
          value: api.apiId,
        }))}
        onChange={(newValue) => {
          selectApi(newValue as Api["apiId"]);
        }}
      />
    </Box>
  );
}
