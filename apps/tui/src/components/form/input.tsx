import { PasswordInput, TextInput } from "@inkjs/ui";
import { Box } from "ink";
import React, { PropsWithChildren } from "react";
import { useFormData, useFormItem, useFormOnSubmit } from "./use-form";

type Props = {
  name: string;
  type?: "text" | "password";
  isDisabled?: boolean;
};
export function Input({ name, type = "text", isDisabled = false }: Props) {
  const { updateItem } = useFormItem(name);
  const { onSubmit } = useFormOnSubmit();
  const { formData } = useFormData();

  function handleSubmit() {
    if (isDisabled) {
      return;
    }

    onSubmit?.(formData);
  }
  switch (type) {
    case "text":
      return (
        <Layout active={!isDisabled}>
          <TextInput
            isDisabled={isDisabled}
            onChange={updateItem}
            onSubmit={handleSubmit}
          />
        </Layout>
      );
    case "password":
      return (
        <Layout active={!isDisabled}>
          <PasswordInput
            isDisabled={isDisabled}
            onChange={updateItem}
            onSubmit={handleSubmit}
          />
        </Layout>
      );
    default:
      throw new Error(`Unexpected type: ${type satisfies never}`);
  }
}

type LayoutProps = {
  active: boolean;
};
function Layout({ children, active }: PropsWithChildren<LayoutProps>) {
  return (
    <Box height={3} borderStyle="round" borderDimColor={!active}>
      {children}
    </Box>
  );
}
