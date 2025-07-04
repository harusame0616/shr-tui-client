import { Box, Text } from "ink";
import React from "react";
import { Account } from "./use-account";
import { useCrew } from "./use-crew";
import { useSelectedCrew } from "./use-selected-crew";

type Props = {
  account: Account;
};

export function CrewDetail({ account }: Props) {
  const { selectedCrewId } = useSelectedCrew();
  const { crew, error, isLoading } = useCrew(account, selectedCrewId || "");

  if (!selectedCrewId) {
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

  const renderContent = () => {
    if (isLoading) {
      return <Text color="gray">読み込み中...</Text>;
    }

    if (error) {
      return <Text color="red">エラー: {error.message}</Text>;
    }

    if (!crew) {
      return <Text color="gray">従業員データが見つかりません</Text>;
    }

    return (
      <Box flexDirection="column" gap={1} width="100%">
        <Box flexDirection="column">
          <Text bold underline>
            基本情報
          </Text>
          <Text>
            氏名: {crew.lastName} {crew.firstName}
          </Text>
          <Text>
            氏名（かな）: {crew.lastNameYomi} {crew.firstNameYomi}
          </Text>
          {(crew.businessLastName || crew.businessFirstName) && (
            <Text>
              ビジネスネーム: {crew.businessLastName || ""}{" "}
              {crew.businessFirstName || ""}
            </Text>
          )}
          <Text>社員番号: {crew.employeeCode}</Text>
          <Text>Crew ID: {crew.crewId}</Text>
        </Box>

        <Box flexDirection="column">
          <Text bold underline>
            ユーザー情報
          </Text>
          {crew.userId ? (
            <>
              <Text>User ID: {crew.userId}</Text>
              {crew.email && <Text>メールアドレス: {crew.email}</Text>}
              {crew.role && (
                <>
                  <Text>ロール: {crew.role.name}</Text>
                  {crew.activated !== undefined && (
                    <Text>
                      アクティベート状態: {crew.activated ? "有効" : "無効"}
                    </Text>
                  )}
                  {crew.suspended !== undefined && (
                    <Text>
                      サスペンド状態: {crew.suspended ? "停止中" : "正常"}
                    </Text>
                  )}
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
          {crew.department && <Text>部署: {crew.department}</Text>}
          {crew.position && <Text>役職: {crew.position}</Text>}
          {crew.employmentType && <Text>雇用形態: {crew.employmentType}</Text>}
        </Box>

        <Box flexDirection="column">
          <Text bold underline>
            在籍情報
          </Text>
          {crew.employmentStatus && (
            <Text>
              在籍状況:{" "}
              {crew.employmentStatus === "employed"
                ? "在籍中"
                : crew.employmentStatus === "resigned"
                ? "退職済み"
                : crew.employmentStatus}
            </Text>
          )}
          {crew.enteredAt && <Text>入社日: {crew.enteredAt}</Text>}
          {crew.resignedAt && <Text>退職日: {crew.resignedAt}</Text>}
        </Box>

        <Box flexDirection="column">
          <Text bold underline>
            個人情報
          </Text>
          {crew.birthAt && <Text>生年月日: {crew.birthAt}</Text>}
          {crew.gender && (
            <Text>性別: {crew.gender === "male" ? "男性" : "女性"}</Text>
          )}
          {crew.telNumber && <Text>電話番号: {crew.telNumber}</Text>}
        </Box>

        {crew.address && (
          <Box flexDirection="column">
            <Text bold underline>
              住所
            </Text>
            <Text>
              〒{crew.address.zipCode} {crew.address.pref}
              {crew.address.city}
              {crew.address.street} {crew.address.building}
            </Text>
          </Box>
        )}
      </Box>
    );
  };

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
      <Box paddingTop={1}>{renderContent()}</Box>
    </Box>
  );
}
