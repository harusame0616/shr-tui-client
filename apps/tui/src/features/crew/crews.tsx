import { Select } from "@inkjs/ui";
import { Box, Text, useFocus, useInput } from "ink";
import React, { useCallback, useEffect } from "react";
import { Account } from "../account/use-account";
import { useCrews } from "./use-crews";
import { useSelectedCrew } from "./use-selected-crew";
import { Route, useRouter } from "../router/use-router";

type Props = {
  account: Account;
};

export function Crews({ account }: Props) {
  const router = useRouter();
  const { crews, error, isLoading, searchCondition, setSearchCondition } =
  useCrews(account);

  const { focus, isFocused } = useFocus({ id: "crews" });
  // ショートカットキーの処理
  useInput(
    (input) => {
      if (input.toLowerCase() === "f") {
        router.push(Route.CrewsWithSearch);
        focus("crew-search-form");
      }
      if (input.toLowerCase() === "c" && searchCondition) {
        setSearchCondition(undefined);
      }
    },
    {
      isActive: isFocused,
    }
  );

  return (
    <Box borderStyle="round" flexDirection="column" minHeight={15} width="100%">
      <Text>従業員一覧</Text>
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
      <Box>
        <CrewsContent
          crews={crews}
          error={error}
          isLoading={isLoading}
          isFocused={isFocused}
        />
      </Box>
    </Box>
  );
}

function CrewsContent({
  crews,
  error,
  isLoading,
  isFocused,
}: Pick<ReturnType<typeof useCrews>, "crews" | "error" | "isLoading"> & {
  isFocused: boolean;
}) {
  const router = useRouter();
  const { setSelectedCrewId, selectedCrewId } = useSelectedCrew();

  const handleChange = useCallback(
    (value: string) => {
      if (!isFocused) {
        return;
      }
      setSelectedCrewId(value);
    },
    [isFocused, router, setSelectedCrewId]
  );

  // handleChange が意図しないタイミングで実行されるため useEffect で対応
  useEffect(() => {
    router.push(Route.Crews);
  }, [selectedCrewId]);

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
        onChange={handleChange}
      />
    </Box>
  );
}
