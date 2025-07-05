import { Alert } from "@inkjs/ui";
import { Box, Text } from "ink";
import React, { useState } from "react";
import * as v from "valibot";
import { Button } from "../../components/form/button";
import { Form } from "../../components/form/form";
import { Input } from "../../components/form/input";
import { Display, useDisplay } from "../../use-display";
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
  const { addAccount } = useAccounts();
  const { setDisplay } = useDisplay();
  const [issue, setIssue] = useState<
    Record<string, string[] | undefined> | undefined
  >({});
  const nameError = issue?.["name"]?.[0];
  const endpointError = issue?.["endpoint"]?.[0];
  const tokenError = issue?.["token"]?.[0];

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

    setDisplay(Display.Main);
  }

  return (
    <Box flexDirection="column" width="100%">
      <Form onSubmit={handleSubmit}>
        <Box flexDirection="column">
          <Text>アカウント名</Text>
          <Input name="name" />
        </Box>
        {nameError ? <Alert variant="error">{tokenError}</Alert> : null}
        <Box flexDirection="column">
          <Text>エンドポイント</Text>
          <Input name="endpoint" />
        </Box>
        {endpointError ? <Alert variant="error">{endpointError}</Alert> : null}
        <Box flexDirection="column">
          <Text>トークン</Text>
          <Input name="token" type="password" />
        </Box>

        {nameError ? <Alert variant="error">{tokenError}</Alert> : null}
        <Box width={40}>
        <Button>登録する</Button>
        </Box>
      </Form>
    </Box>
  );
}
