import { Box, Text } from "ink";
import React from "react";
import { AccountAdditionForm } from "./accont-addition-form";
import { AccountSelect } from "./account-select";
import { Display, useDisplay } from "./use-display";
import { Main } from "./display/main";

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
