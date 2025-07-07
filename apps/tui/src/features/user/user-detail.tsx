import { Box, Text } from "ink";
import React from "react";
import { Account } from "../account/use-account";
import { useUser } from "./use-user";
import { useSelectedUser } from "./use-selected-user";

type Props = {
  account: Account;
};

export function UserDetail({ account }: Props) {
  const { selectedUserId } = useSelectedUser()

  return (
    <Box borderStyle="round" flexDirection="column" minHeight={15} width="100%">
      <Box
        flexDirection="column"
        alignItems="center"
        paddingLeft={1}
        paddingRight={1}
      >
        <Text bold underline>
          ユーザー詳細
        </Text>
        <Box
          width="100%"
          borderStyle={"single"}
          borderTop={false}
          borderLeft={false}
          borderRight={false}
        />
      </Box>
      <UserDetailContent account={account} userId={selectedUserId} />
    </Box>
  );
}

function UserDetailContent({ account, userId }: {account: Account, userId: string | null}) {
  const user = useUser(account, userId);

  if (user.isLoading) {
    return (
      <Box paddingLeft={1}>
        <Text>読み込み中...</Text>
      </Box>
    );
  }

  if (user.error) {
    return (
      <Box paddingLeft={1}>
        <Text>{user.error.message}</Text>
      </Box>
    );
  }

  if (!user.data) {
    return (
      <Box paddingLeft={1}>
        <Text>ユーザーが選択されていません</Text>
      </Box>
    );
  }

  return (
    <Box flexDirection="column" paddingLeft={1} paddingTop={1}>
      <Text bold underline>
        基本情報
      </Text>
      <Text>ID: {user.data.userId}</Text>
      <Text>メール: {user.data.email || "未設定"}</Text>
      <Text>管理者: {user.data.admin === true ? "はい" : "いいえ"}</Text>
      <Text>クルーID: {user.data.crewId || "未設定"}</Text>
      <Text>
        パスワード設定済み: {user.data.hasPassword === true ? "はい" : "いいえ"}
      </Text>
      <Text>
        電子配信同意:{" "}
        {user.data.agreementForElectronicDelivery === true ? "はい" : "いいえ"}
      </Text>

      {user.data.role && (
        <>
          <Box marginTop={1}>
            <Text bold underline>
              ロール情報
            </Text>
          </Box>
          <Text>ロールID: {user.data.role.id || '-'}</Text>
          <Text>ロール名: {user.data.role.name || "-"}</Text>
          {user.data.role.description && <Text>説明: {user.data.role.description}</Text>}
          <Text>クルースコープ: {user.data.role.crewsScope || "-"}</Text>
          {user.data.role.presetType && (
            <Text>プリセットタイプ: {user.data.role.presetType}</Text>
          )}
          {user.data.role.sessionTimeoutIn && (
            <Text>セッションタイムアウト: {user.data.role.sessionTimeoutIn}分</Text>
          )}
        </>
      )}

      {(user.data.invitationCreatedAt ||
        user.data.invitationOpenedAt ||
        user.data.invitationAcceptedAt ||
        user.data.invitationAnsweredAt) && (
        <>
          <Box marginTop={1}>
            <Text bold underline>
              招待情報
            </Text>
          </Box>
          {user.data.invitationCreatedAt && (
            <Text>招待作成日時: {user.data.invitationCreatedAt}</Text>
          )}
          {user.data.invitationOpenedAt && (
            <Text>招待開封日時: {user.data.invitationOpenedAt}</Text>
          )}
          {user.data.invitationAcceptedAt && (
            <Text>招待承認日時: {user.data.invitationAcceptedAt}</Text>
          )}
          {user.data.invitationAnsweredAt && (
            <Text>招待回答日時: {user.data.invitationAnsweredAt}</Text>
          )}
        </>
      )}

      {user.data.suppressedEmailLogs && user.data.suppressedEmailLogs.length > 0 && (
        <>
          <Box marginTop={1}>
            <Text bold underline>
              メール配信情報
            </Text>
          </Box>
          {user.data.suppressedEmailLogs.map((log, index) => (
            <Text key={index}>
              - ID: {log.id}, タイプ: {log.suppressionType || "-"}
            </Text>
          ))}
        </>
      )}

      <Box marginTop={1}>
        <Text bold underline>
          作成・更新日時
        </Text>
      </Box>
      <Text>作成日時: {user.data.createdAt}</Text>
      <Text>更新日時: {user.data.updatedAt}</Text>
    </Box>
  );
}
