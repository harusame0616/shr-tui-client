import { Box, Text } from "ink";
import { Form, FormProps } from "ink-form";
import React, { useState } from "react";
import * as v from "valibot";
import { useAccounts } from "./use-account";
import { Display, useDisplay } from "./use-display";

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
  const [messages, setMessages] = useState<string[]>([]);
  const form: FormProps = {
    form: {
      title: "アカウント登録",
      sections: [
        {
          title: "アカウント情報",
          fields: [
            {
              type: "string",
              name: "name",
              description:"tesdf",
              label: "アカウント名（必須）",
              initialValue:""
            },
            {
              type: "string",
              name: "endpoint",
              label: "エンドポイント（必須）",
              initialValue:""
            },
            {
              type: "string",
              name: "token",
              label: "トークン（必須）",
              mask: "*",
              initialValue:""
            },
          ],
        },
      ],
    },
    onSubmit(formData) {
      const parseResult = v.safeParse(formSchema, formData);
      if (!parseResult.success) {
        setMessages(parseResult.issues.map((issue) => issue.message));
        return;
      }

      try {
        addAccount({
          name: parseResult.output.name,
          endpoint: parseResult.output.endpoint,
          token: parseResult.output.token,
        });
        setDisplay(Display.Main);
      } catch (error: unknown) {
        setMessages([(error as Error).message])
      }
    },
  };

  return (
    <Box flexDirection="column" width="100%">
      <Form {...form} />
      <Box flexDirection="column">
        {messages.map((message) => (
          <Text color="red" key={message}>※ {message}</Text>
        ))}
      </Box>
    </Box>
  );
}
