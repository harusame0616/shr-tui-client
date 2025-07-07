import { Box, Text } from "ink";
import React from "react";
import { Account } from "../account/use-account";
import { useCrew } from "./use-crew";
import { useSelectedCrew } from "./use-selected-crew";
import { useUser } from "../user/use-user";

type Props = {
  account: Account;
};

export function CrewDetail({ account }: Props) {
  return (
    <Box borderStyle="round" flexDirection="column" minHeight={20}>
      <Text bold>従業員詳細</Text>
      <Box
        width="100%"
        borderStyle={"single"}
        borderTop={false}
        borderLeft={false}
        borderRight={false}
      />
      <Box paddingTop={1}>
        <CrewDetailContent account={account} />
      </Box>
    </Box>
  );
}

function CrewDetailContent({ account }: { account: Account }) {
  const { selectedCrewId } = useSelectedCrew();
  const crew = useCrew(account, selectedCrewId || "");
  const user = useUser(account, crew.data?.userId || null);

  if (crew.isLoading || user.isLoading) {
    return <Text color="gray">読み込み中...</Text>;
  }

  if (crew.error || user.error) {
    return <Text color="red">エラー: {(crew.error || user.error)?.message}</Text>;
  }

  if ( !crew.data) {
    return (
      <Box
        borderStyle="round"
        flexDirection="column"
        padding={1}
        minHeight={20}
      >
        <Text dimColor>従業員を選択してください</Text>
      </Box>
    );
  }

  return (
    <Box flexDirection="column" gap={1} width="100%">
      <Box flexDirection="column">
        <Text bold underline>
          基本情報
        </Text>
        <Text>
          氏名: {crew.data.lastName} {crew.data.firstName}
        </Text>
        <Text>
          氏名（かな）: {crew.data.lastNameYomi} {crew.data.firstNameYomi}
        </Text>
        {(crew.data.businessLastName || crew.data.businessFirstName) && (
          <Text>
            ビジネスネーム: {crew.data.businessLastName || ""}{" "}
            {crew.data.businessFirstName || ""}
          </Text>
        )}
        <Text>社員番号: {crew.data.employeeCode}</Text>
        <Text>Crew ID: {crew.data.crewId}</Text>
      </Box>

      <Box flexDirection="column">
        <Text bold underline>
          ユーザー情報
        </Text>
        {crew.data.userId ? (
          <>
            <Text>User ID: {crew.data.userId}</Text>
            {user.data?.email && <Text>メールアドレス: {user.data?.email}</Text>}
            {user.data?.role && (
              <>
                <Text>ロール: {user.data.role.name}</Text>
                {user.data.role.id && <Text>ロールID: {user.data.role.id}</Text>}
              </>
            )}
          </>
        ) : (
          <Text>ユーザー紐づけなし</Text>
        )}
      </Box>

      <Box flexDirection="column">
        <Text bold underline>
          所属情報
        </Text>
        {crew.data.department && <Text>部署: {crew.data.department}</Text>}
        {crew.data.position && <Text>役職: {crew.data.position}</Text>}
        {crew.data.employmentType && <Text>雇用形態: {crew.data.employmentType}</Text>}
      </Box>

      <Box flexDirection="column">
        <Text bold underline>
          在籍情報
        </Text>
        {crew.data.employmentStatus && (
          <Text>
            在籍状況:{" "}
            {crew.data.employmentStatus === "employed"
              ? "在籍中"
              : crew.data.employmentStatus === "resigned"
              ? "退職済み"
              : crew.data.employmentStatus}
          </Text>
        )}
        {crew.data.enteredAt && <Text>入社日: {crew.data.enteredAt}</Text>}
        {crew.data.resignedAt && <Text>退職日: {crew.data.resignedAt}</Text>}
      </Box>

      <Box flexDirection="column">
        <Text bold underline>
          個人情報
        </Text>
        {crew.data.birthAt && <Text>生年月日: {crew.data.birthAt}</Text>}
        {crew.data.gender && (
          <Text>性別: {crew.data.gender === "male" ? "男性" : "女性"}</Text>
        )}
        {crew.data.telNumber && <Text>電話番号: {crew.data.telNumber}</Text>}
      </Box>

      {crew.data.address && (
        <Box flexDirection="column">
          <Text bold underline>
            住所
          </Text>
          <Text>
            〒{crew.data.address.zipCode} {crew.data.address.pref}
            {crew.data.address.city}
            {crew.data.address.street} {crew.data.address.building}
          </Text>
        </Box>
      )}
    </Box>
  );
}
