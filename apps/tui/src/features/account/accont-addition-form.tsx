import { Alert } from "@inkjs/ui";
import { Box, Text, useFocus, useInput } from "ink";
import React, { useEffect, useState } from "react";
import * as v from "valibot";
import { Button } from "../../components/form/button";
import { Form } from "../../components/form/form";
import { Input } from "../../components/form/input";
import { useApi } from "../api/use-api";
import { Route, useRouter } from "../router/use-router";
import { useAccounts } from "./use-account";

const formSchema = v.object({
  name: v.pipe(v.string(), v.minLength(1, "アカウント名は必須です")),
  endpoint: v.pipe(
    v.string(),
    v.minLength(1, "エンドポイントは必須です"),
    v.url("エンドポイントには URL を入力してください")
  ),
  token: v.pipe(v.string(), v.minLength(1, "トークンは必須です")),
});

export function AccountAdditionForm() {
  const { isFocused: isNameFocused, focus } = useFocus({
    id: "account-addition-form-name",
  });
  const { isFocused: isEndpointFocused } = useFocus({
    id: "account-addition-form-endpoint",
  });
  const { isFocused: isTokenFocused } = useFocus({
    id: "account-addition-form-token",
  });
  const { isFocused: isButtonFocused } = useFocus({
    id: "account-addition-form-button",
  });
  const isFocused =
    isNameFocused || isEndpointFocused || isTokenFocused || isButtonFocused;

  const {
    activeApi: { apiId },
  } = useApi();
  const router = useRouter();

  const { addAccount } = useAccounts();
  const [issue, setIssue] = useState<
    Record<string, string[] | undefined> | undefined
  >({});
  const nameError = issue?.["name"]?.[0];
  const endpointError = issue?.["endpoint"]?.[0];
  const tokenError = issue?.["token"]?.[0];

  useInput(
    (_, key) => {
      if (key.escape) {
        focus("account-select");
        switch (apiId) {
          case "Crews":
            router.push(Route.Crews);
            return;
          case "Departments":
            router.push(Route.Departments);
            return;
          case "Users":
            router.push(Route.Users);
            return;
        }
      }
    },
    {
      isActive: isFocused,
    }
  );

  useEffect(() => {
    focus("account-addition-form-name");
  }, []);

  function handleSubmit(formData: Record<string, string>) {
    const parseResult = v.safeParse(formSchema, formData);
    if (!parseResult.success) {
      setIssue(v.flatten(parseResult.issues).nested);
      return;
    }

    addAccount({
      name: parseResult.output.name,
      endpoint: parseResult.output.endpoint,
      token: parseResult.output.token,
    });

    focus("account-select");

    switch (apiId) {
      case "Crews":
        router.push(Route.Crews);
        return;
      case "Departments":
        router.push(Route.Departments);
        return;
      case "Users":
        router.push(Route.Users);
        return;
    }
  }

  return (
    <Box flexDirection="column" width="100%" borderStyle="round">
      <Text>アカウント登録</Text>
      <Box
        width="100%"
        borderStyle={"single"}
        borderTop={false}
        borderLeft={false}
        borderRight={false}
      />
      <Form onSubmit={handleSubmit}>
        <Box flexDirection="column">
          <Text>アカウント名（必須）</Text>
          <Text dimColor={true}>アカウントを識別する任意の名前を入力してください。</Text>
          <Input name="name" isDisabled={!isNameFocused} />
        </Box>
        {nameError ? <Alert variant="error">{tokenError}</Alert> : null}
        <Box flexDirection="column">
          <Text>エンドポイント名（必須）</Text>
          <Text dimColor>アカウントの API のエンドポイントを入力してください</Text>
          <Text dimColor>https://アカウントID.smarthr.jp/api/v1</Text>
          <Input name="endpoint" isDisabled={!isEndpointFocused} />
        </Box>
        {endpointError ? <Alert variant="error">{endpointError}</Alert> : null}
        <Box flexDirection="column">
          <Text>アクセストークン（必須）</Text>
          <Text dimColor>API に接続するためのアクセストークンを入力してください</Text>
          <Text dimColor>shr_******</Text>
          <Input name="token" type="password" isDisabled={!isTokenFocused} />
        </Box>

        {nameError ? <Alert variant="error">{tokenError}</Alert> : null}
        <Box width={40}>
          <Button id="account-addition-form-button">登録する</Button>
        </Box>
      </Form>
    </Box>
  );
}
