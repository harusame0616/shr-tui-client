import { Provider } from "jotai";
import React, { PropsWithChildren } from "react";
import { useFormOnSubmitProvider } from "./use-form";

interface Props {
  onSubmit: (formData: Record<string,string>) => void;
  initialValues: Record<string, string>
}

export function Form({ children, onSubmit, initialValues }: PropsWithChildren<Props>) {
  return (
    <Provider>
      <FormOnSubmitProvider onSubmit={onSubmit} initialValues={ initialValues} />
      {children}
    </Provider>
  );
}

function FormOnSubmitProvider({ onSubmit, initialValues }: { onSubmit: (formData: Record<string, string> ) => void, initialValues: Record<string, string>}) {
  useFormOnSubmitProvider(onSubmit, initialValues);

  return null;
}
