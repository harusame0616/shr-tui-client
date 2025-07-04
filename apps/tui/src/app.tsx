import React from "react";
import { AccountAdditionForm } from "./features/account/accont-addition-form";
import { Display, useDisplay } from "./use-display";
import { Main } from "./main";

export function App() {
  const { display } = useDisplay();

  switch (display) {
    case Display.Main:
      return <Main />;
    case Display.AccountAddition:
      return <AccountAdditionForm />;
    default:
      return display satisfies never;
  }
}
