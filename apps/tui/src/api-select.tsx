import { Box, Text, useFocus } from "ink";
import { useApi } from "./use-api";
import { Select } from "@inkjs/ui";
import React from "react";

export function ApiSelect() {
  const { isFocused } = useFocus({
    id: "api-select",
  });
  const { selectApi, activeApi } = useApi();

  const apiList = [
    { apiId: "crews", name: "従業員", path: "crews" },
    { apiId: "users", name: "ユーザー", path: "users" },
    { apiId: "departments", name: "部署", path: "departments" },
  ];

  return (
    <Box borderStyle="round" flexDirection="column" height={9}>
      <Text bold={isFocused}>{isFocused && "▶  "}API</Text>
      <Text>------------------------</Text>
      <Select
        isDisabled={!isFocused}
        defaultValue={activeApi?.apiId}
        visibleOptionCount={5}
        options={apiList.map((api) => ({
          label: api.name,
          value: api.apiId,
        }))}
        onChange={(newValue) => {
          selectApi(newValue);
        }}
      />
    </Box>
  );
}