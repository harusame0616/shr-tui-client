import { Box, Text, useFocus, useInput } from "ink";
import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  id?: string;
  autoFocus?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  id,
  autoFocus = false,
}) => {
  const { isFocused } = useFocus({
    id,
    autoFocus,
  });

  useInput(
    (_, key) => {
      if (!key.return) {
        return;
      }

      onClick?.();
    },
    {
      isActive: isFocused,
    }
  );

  return (
    <Box
      borderStyle="round"
      borderColor={isFocused ? "cyan" : undefined}
      paddingX={2}
      paddingY={0}
      borderDimColor={!isFocused}
      justifyContent="center"
    >
      <Text bold={isFocused}>{children}</Text>
    </Box>
  );
};
