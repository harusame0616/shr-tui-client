import { Select } from "@inkjs/ui";
import { Box, Text, useFocus } from "ink";
import React from "react";
import { Route, useRouter } from "../../features/router/use-router";
import { Api, useApi } from "./use-api";

export function ApiSelect() {
  const { isFocused } = useFocus({ id: "api-select", autoFocus: false });
  const { selectApi, activeApi } = useApi();
  const router = useRouter();

  const apiList = Object.values(Api);

  return (
    <Box borderStyle="round" flexDirection="column" height={9}>
      <Text>API</Text>
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
          if (!isFocused) {
            return;
          }
          const apiId = newValue as Api["apiId"];

          selectApi(apiId);
          switch (apiId) {
            case Api.Crews.apiId:
              router.push(Route.Crews);
              return;
            case Api.Departments.apiId:
              router.push(Route.Departments);
              return;
            case Api.Users.apiId:
              router.push(Route.Users);
              return;
            default:
              throw new Error(`Unexpected apiId: ${apiId satisfies never}`);
          }
        }}
      />
    </Box>
  );
}
