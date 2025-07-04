import { Select } from "@inkjs/ui";
import { Box, Text, useFocus, useInput } from "ink";
import React from "react";
import { Account } from "../account/use-account";
import { useCrews } from "./use-crews";
import { useSelectedCrew } from "./use-selected-crew";

type Props = {
  account: Account;
  onSearchKeyPress?: () => void;
};

export function Crews({ account, onSearchKeyPress }: Props) {
  const { crews, error, isLoading, searchCondition, setSearchCondition } =
    useCrews(account);
  const { isFocused } = useFocus({
    id: "crews",
  });
  // ショートカットキーの処理
  useInput((input) => {
    if (isFocused) {
      // Fキーで検索フォーム表示
      if (input.toLowerCase() === "f" && onSearchKeyPress) {
        onSearchKeyPress();
      }
      // Cキーで検索条件クリア
      if (input.toLowerCase() === "c" && searchCondition) {
        setSearchCondition(undefined);
      }
    }
  });

  return (
    <Box borderStyle="round" flexDirection="column" minHeight={15} width="100%">
      <Text bold={isFocused}>{isFocused && "▶  "}従業員一覧</Text>
      {isFocused && (
        <Box flexDirection="column">
          <Text dimColor>※ Fキーで検索</Text>
          {searchCondition && <Text dimColor>※ Cキーで検索条件クリア</Text>}
        </Box>
      )}
      <Box
        width="100%"
        borderStyle={"single"}
        borderTop={false}
        borderLeft={false}
        borderRight={false}
      />
      <Box paddingTop={1}>
        <CrewsContent crews={crews} error={error} isLoading={isLoading} isFocused={isFocused} />
      </Box>
    </Box>
  );
}

function CrewsContent({
  crews,
  error,
  isLoading,
  isFocused,
}: Pick<ReturnType<typeof useCrews>, "crews" | "error" | "isLoading"> & {isFocused:boolean}) {
  const { setSelectedCrewId } = useSelectedCrew();

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
          value: crew.crewId,
        }))}
        onChange={(value) => {
          setSelectedCrewId(value);
        }}
      />
    </Box>
  );
}
