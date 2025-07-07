import { Box, Text } from "ink";
import React, { useMemo } from "react";
import { Select } from "@inkjs/ui";
import { useFocus } from "ink";
import { Account } from "../account/use-account";
import { useUsers } from "./use-users";
import { useSelectedUser } from "./use-selected-user";

type Props = {
  account: Account;
};

export function Users({ account }: Props) {
  const { isFocused } = useFocus({ id: "users" });

  return (
    <Box
      borderStyle={isFocused ? "round" : "single"}
      borderColor={isFocused ? "green" : undefined}
      flexDirection="column"
      minHeight={15}
      width="100%"
    >
      <Box
        flexDirection="column"
        alignItems="center"
        paddingLeft={1}
        paddingRight={1}
      >
        <Text bold underline>
          ユーザー一覧
        </Text>
        <Box
          width="100%"
          borderStyle={"single"}
          borderTop={false}
          borderLeft={false}
          borderRight={false}
        />
      </Box>
      <UsersContent account={account} />
    </Box>
  );
}

function UsersContent({ account }: Props) {
  const { users, error, isLoading } = useUsers(account);
  const { setSelectedUserId } = useSelectedUser();
  const { isFocused } = useFocus({ id: "users" });

  const options = useMemo(() => {
    return users.map((user) => ({
      label: `${user.lastName || ""} ${user.firstName || ""}（${
        user.email || "メールなし"
      }）`,
      value: user.userId,
    }));
  }, [users]);

  if (error) {
    return (
      <Box paddingLeft={1}>
        <Text color="red">エラー: {error.message}</Text>
      </Box>
    );
  }

  if (isLoading) {
    return (
      <Box paddingLeft={1}>
        <Text>読み込み中...</Text>
      </Box>
    );
  }

  if (users.length === 0) {
    return (
      <Box paddingLeft={1}>
        <Text>ユーザーが見つかりません</Text>
      </Box>
    );
  }

  const handleChange = (value: string) => {
    setSelectedUserId(value);
  };

  return (
    <Box flexDirection="column" paddingTop={1}>
      <Select
        visibleOptionCount={100}
        isDisabled={!isFocused}
        options={options}
        onChange={handleChange}
      />
    </Box>
  );
}
