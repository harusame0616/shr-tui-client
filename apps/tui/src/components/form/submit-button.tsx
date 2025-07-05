import React, { ComponentProps, PropsWithChildren } from "react";
import { ButtonPresenter } from "./button-presenter";
import { useFormData, useFormOnSubmit } from "./use-form";

export function SubmitButton({
  children,
  onClick,
}: PropsWithChildren<ComponentProps<typeof ButtonPresenter>>) {
  const { onSubmit } = useFormOnSubmit();
  const { formData } = useFormData();

  function handleClick() {
    onClick?.();
    onSubmit?.(formData);
  }

  return <ButtonPresenter onClick={handleClick}>{children}</ButtonPresenter>;
}
