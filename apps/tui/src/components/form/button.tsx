import React, { PropsWithChildren } from "react";
import { ButtonPresenter } from "./button-presenter";
import { SubmitButton } from "./submit-button";

type Props = {
  type?: "button" | "submit";
  id?: string
};
export function Button({
  type = "submit",
  children,
  id
}: PropsWithChildren<Props>) {
  switch (type) {
    case "button":
      return <ButtonPresenter id={id}>{children}</ButtonPresenter>;
    case "submit":
      return <SubmitButton id={id}>{children}</SubmitButton>;
    default:
      throw new Error(`Unexpected type: ${type satisfies never}`);
  }
}
