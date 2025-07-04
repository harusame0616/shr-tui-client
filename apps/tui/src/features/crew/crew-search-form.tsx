import { Box, Text, useInput, useFocus } from "ink";
import { Form, FormProps } from "ink-form";
import React from "react";
import { CrewSearchCondition, useCrews } from "./use-crews";
import { useAccounts } from "../account/use-account";

type Props = {
  onSubmit: () => void;
  onCancel: () => void;
};

export function CrewSearchForm({ onSubmit, onCancel }: Props) {
  const { activeAccount } = useAccounts();
  const { searchCondition, setSearchCondition } = useCrews(activeAccount!);
  const { focus } = useFocus();

  // Escキーでキャンセル
  useInput((input, key) => {
    if (key.escape) {
      focus("crews");
      onCancel();
    }
  });

  const form: FormProps = {
    form: {
      title: "従業員検索",
      sections: [
        {
          title: "検索条件",
          fields: [
            {
              type: "string",
              name: "emp_code",
              label: "従業員コード",
              initialValue: searchCondition?.emp_code || "",
            },
            {
              type: "string",
              name: "user_id",
              label: "ユーザーID（カンマ区切り）",
              initialValue: searchCondition?.user_id || "",
            },
            {
              type: "string",
              name: "dept_id",
              label: "部署ID（カンマ区切り）",
              initialValue: searchCondition?.dept_id || "",
            },
            {
              type: "string",
              name: "q",
              label: "フリーワード（氏名・ビジネスネーム・部署・役職）",
              initialValue: searchCondition?.q || "",
            },
            {
              type: "string",
              name: "id",
              label: "Crew ID（カンマ区切り）",
              initialValue: searchCondition?.id || "",
            },
          ],
        },
      ],
    },
    onSubmit(formData) {
      const params: CrewSearchCondition = {};
      const data = formData as Record<string, unknown>;

      // 空でない値のみパラメータに追加
      if (data.emp_code) params.emp_code = data.emp_code as string;
      if (data.user_id) params.user_id = data.user_id as string;
      if (data.dept_id) params.dept_id = data.dept_id as string;
      if (data.q) params.q = data.q as string;
      if (data.id) params.id = data.id as string;

      setSearchCondition(params);
      focus("crews");
      onSubmit();
    },
  };

  return (
    <Box flexDirection="column" width="100%">
      <Form {...form} />
      <Box marginTop={1}>
        <Text dimColor>※ Escキーでキャンセル</Text>
      </Box>
    </Box>
  );
}
