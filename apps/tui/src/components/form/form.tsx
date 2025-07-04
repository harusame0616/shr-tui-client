import { Provider } from "jotai";
import React, { PropsWithChildren } from "react";
import { useFormOnSubmitProvider } from "./use-form";

interface Props {
  onSubmit: () => void;
}

export function Form({ children, onSubmit }: PropsWithChildren<Props>) {
  return (
    <Provider>
      <FormOnSubmitProvider onSubmit={onSubmit} />
      {children}
    </Provider>
  );
}

function FormOnSubmitProvider({ onSubmit, }: { onSubmit: () => void }) {
  useFormOnSubmitProvider(onSubmit);

  return null;
}
