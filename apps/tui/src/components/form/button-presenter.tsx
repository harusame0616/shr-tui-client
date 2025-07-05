import { Box, Text, useFocus, useInput } from "ink";
import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  id?: string;
}

export const ButtonPresenter: React.FC<ButtonProps> = ({
  children,
  onClick,
  id,
}) => {
  const { isFocused } = useFocus({ autoFocus: false, id });

  useInput(
    (_, key) => {
      if (!key.return || !isFocused) {
        return;
      }

      onClick?.();
    },
    { isActive: isFocused }
  );

  return (
    <Box
      borderStyle="round"
      borderColor={isFocused ? "cyan" : undefined}
      paddingX={2}
      paddingY={0}
      justifyContent="center"
    >
      <Text bold={isFocused}>{children}</Text>
    </Box>
  );
};
