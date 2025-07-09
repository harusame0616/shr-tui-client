import { Alert } from "@inkjs/ui";
import { Box, Text, useFocus, useInput } from "ink";
import React, { useCallback, useEffect, useState } from "react";
import * as v from "valibot";
import { Button } from "../../components/form/button";
import { Form } from "../../components/form/form";
import { Input } from "../../components/form/input";
import { Api, useApi } from "../api/use-api";
import { Route, useRouter } from "../router/use-router";
import { useAccounts } from "./use-account";

const formSchema = v.object({
  name: v.pipe(
    v.string(),
    v.minLength(1, "アカウント名は必須です")
  ),
  endpoint: v.pipe(
    v.string(),
    v.minLength(1, "エンドポイントは必須です"),
    v.url("エンドポイントには URL を入力してください")
  ),
  token: v.pipe(
    v.string(),
    v.minLength(1, "トークンは必須です")
  ),
});

const FocusId = {
  Name: "add-account-form-name",
  Endpoint: "add-account-form-endpoint",
  Token: "add-account-form-token",
  Button: "add-account-form-button",
};

export function AddAccountForm() {
  const [errorMessage, setErrorMessage] = useState("");
  const { isFocused: isNameFocused, focus } = useFocus({
    id: FocusId.Name,
  });
  const { isFocused: isEndpointFocused } = useFocus({
    id: FocusId.Endpoint,
  });
  const { isFocused: isTokenFocused } = useFocus({
    id: FocusId.Token,
  });
  const { isFocused: isButtonFocused } = useFocus({
    id: FocusId.Button,
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

  function goToActiveApiList() {
    switch (apiId) {
      case Api.Crews.apiId:
        router.push(Route.Crews);
        return;
      case Api.Users.apiId:
        router.push(Route.Users);
        return;
      case Api.Departments.apiId:
        router.push(Route.Departments);
        return;
      default:
        throw new Error(`選択 api が不正です。 ${apiId satisfies never}`);
    }
  }

  useInput(
    (_, key) => {
      if (key.escape) {
        focus("account-select");
        goToActiveApiList();
      }
    },
    {
      isActive: isFocused,
    }
  );

  useEffect(() => {
    focus(FocusId.Name);
  }, []);

  const handleSubmit = useCallback(async (formData: Record<string, string>) => {
    const parseResult = v.safeParse(formSchema, formData);
    if (!parseResult.success) {
      setIssue(v.flatten(parseResult.issues).nested);
      return;
    }

    const result = await addAccount({
      name: parseResult.output.name,
      endpoint: parseResult.output.endpoint,
      token: parseResult.output.token,
    });

    if (!result.success) {
      setErrorMessage(result.message);
      return;
    }

    focus("account-select");

    goToActiveApiList();
  }, []);

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
      <Form
        onSubmit={handleSubmit}
        initialValues={{ token: "", endpoint: "", name: "" }}
      >
        <Box flexDirection="column">
          <Text>{isNameFocused && "★ "}アカウント名（必須）</Text>
          <Text dimColor={true}>
            アカウントを識別する任意の名前を入力してください。
          </Text>
          <Input name="name" isDisabled={!isNameFocused} />
        </Box>
        {nameError ? <Alert variant="error">{nameError}</Alert> : null}
        <Box flexDirection="column">
          <Text>{isEndpointFocused && "★ "}エンドポイント名（必須）</Text>
          <Text dimColor>
            アカウントの API のエンドポイントを入力してください
          </Text>
          <Text dimColor>https://アカウントID.smarthr.jp/api/v1</Text>
          <Input name="endpoint" isDisabled={!isEndpointFocused} />
        </Box>
        {endpointError ? <Alert variant="error">{endpointError}</Alert> : null}
        <Box flexDirection="column">
          <Text>アクセストークン（必須）</Text>
          <Text dimColor>
            API に接続するためのアクセストークンを入力してください
          </Text>
          <Text dimColor>shr_******</Text>
          <Input name="token" type="password" isDisabled={!isTokenFocused} />
        </Box>
        {tokenError ? <Alert variant="error">{tokenError}</Alert> : null}
        <Box width={40}>
          <Button id={FocusId.Button}>登録する</Button>
        </Box>

        {errorMessage ? <Alert variant="error">{errorMessage}</Alert> : null}
      </Form>
    </Box>
  );
}
