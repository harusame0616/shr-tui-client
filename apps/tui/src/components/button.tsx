import { Box, Text, useFocus, useInput } from "ink";
import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
}) => {
  const { isFocused } = useFocus({
    autoFocus:false,
  });

  useInput(
    (_, key) => {
      if (!key.return || !isFocused) {
        return;
      }

      onClick?.();
    },
    { isActive: isFocused, }
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
