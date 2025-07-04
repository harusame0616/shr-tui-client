import React from "react";
import { Button } from "../button";
import { useFormOnSubmit } from "./use-form";

interface SubmitButtonProps {
  children: React.ReactNode;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({
  children,
}) => {
  const { onSubmit } = useFormOnSubmit();


  return (
    <Button onClick={onSubmit}>
      {children}
    </Button>
  );
};
