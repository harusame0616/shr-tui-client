import React, { PropsWithChildren } from "react";
import { ButtonPresenter } from "./button-presenter";
import { SubmitButton } from "./submit-button";

type Props = {
  type?: "button" | "submit";
};
export function Button({
  type = "submit",
  children,
}: PropsWithChildren<Props>) {
  switch (type) {
    case "button":
      return <ButtonPresenter>{children}</ButtonPresenter>;
    case "submit":
      return <SubmitButton>{children}</SubmitButton>;
    default:
      return type satisfies never;
  }
}
