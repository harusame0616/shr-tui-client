import { Box, Text, useFocus } from "ink";
import { Account } from "./use-account";
import React from "react";
import { useCrews } from "./use-crews";
import { Select } from "@inkjs/ui";

type Props = {
  account: Account;
};
export function Crews({ account }: Props) {
  const { isFocused } = useFocus({
    id: "crews",
  });
  const { crews, error, isLoading } = useCrews(account);

  const renderContent = () => {
    if (isLoading) {
      return <Text color="gray">読み込み中...</Text>;
    }

    if (error) {
      return <Text color="red">エラー: {error.message}</Text>;
    }

    if (!crews || crews.length === 0) {
      return <Text color="gray">従業員データがありません</Text>;
    }

    return (
      <Box flexDirection="column" width="100%">
        <Select
        visibleOptionCount={100}
        isDisabled={!isFocused}
          options={crews.map((crew) => ({
            label: `${crew.lastName} ${crew.firstName}（${crew.employeeCode}）`,
            value: crew.crewId
          }))}
        />
      </Box>
    );
  };

  return (
    <Box borderStyle="round" flexDirection="column" minHeight={15}>
      <Text bold={isFocused}>{isFocused && "▶  "}従業員一覧</Text>
      <Text>------------------------</Text>
      <Box paddingTop={1}>{renderContent()}</Box>
    </Box>
  );
}
