import { PasswordInput, TextInput } from "@inkjs/ui";
import { Box, useFocus } from "ink";
import React, { PropsWithChildren, useEffect } from "react";
import { useFormData, useFormItem, useFormOnSubmit } from "./use-form";

type Props = {
  name: string;
  type?: "text" | "password";
};
export function Input({ name, type = "text" }: Props) {
  const { updateItem } = useFormItem(name);
  const { isFocused } = useFocus({ autoFocus: false });
  const { onSubmit } = useFormOnSubmit();
  const { formData } = useFormData();

  useEffect(() => {
    updateItem("");
  }, []);

  function handleSubmit() {
    if (!isFocused) {
      return;
    }

    onSubmit?.(formData);
  }
  switch (type) {
    case "text":
      return (
        <Layout active={isFocused}>
          <TextInput
            isDisabled={!isFocused}
            onChange={updateItem}
            onSubmit={handleSubmit}
          />
        </Layout>
      );
    case "password":
      return (
        <Layout active={isFocused}>
          <PasswordInput isDisabled={!isFocused} onChange={updateItem} onSubmit={handleSubmit}/>
        </Layout>
      );
    default:
      return type satisfies never;
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
