import { Box, Text, useFocus, useInput } from "ink";
import React, { useEffect } from "react";
import * as v from "valibot";
import { Button } from "../../components/form/button";
import { Form } from "../../components/form/form";
import { Input } from "../../components/form/input";
import { useAccounts } from "../account/use-account";
import { CrewSearchCondition, useCrews } from "./use-crews";
import { Route, useRouter } from "../router/use-router";

const formSchema = v.object({
  emp_code: v.optional(v.string()),
  user_id: v.optional(v.string()),
  dept_id: v.optional(v.string()),
  q: v.optional(v.string()),
  id: v.optional(v.string()),
});

export function CrewSearchForm() {
  const router = useRouter();
  const { activeAccount } = useAccounts();
  const { setSearchCondition } = useCrews(activeAccount!);
  const { focus, isFocused: isEmpCodeFocused } = useFocus({
    // 外部から指定する際にわかりやすいように crew-search-form にしている。フォーカスの対象は emp_code
    id: "crew-search-form",
  });
  const { isFocused: isUserIdFocused } = useFocus({
    id: "crew-search-form-user-id",
  });
  const { isFocused: isDepartmentIdFocused } = useFocus({
    id: "crew-search-form-department-id",
  });
  const { isFocused: isKeywordFocused } = useFocus({
    id: "crew-search-form-keyword",
  });
  const { isFocused: isCrewIdFocused } = useFocus({
    id: "crew-search-form-crew-id",
  });
  const { isFocused: isButtonFocused } = useFocus({
    id: "crew-search-form-button",
  });
  const isFocused =
    isEmpCodeFocused ||
    isDepartmentIdFocused ||
    isKeywordFocused ||
    isUserIdFocused ||
    isCrewIdFocused ||
    isButtonFocused;

  useInput(
    (_, key) => {
      if (key.escape) {
        focus("crews");
        router.push(Route.Crews);
      }
    },
    {
      isActive: isFocused,
    }
  );

  useEffect(() => {
    focus("crew-search-form")
  },[])

  function handleSubmit(formData: Record<string, string>) {
    const parseResult = v.safeParse(formSchema, formData);
    if (!parseResult.success) {
      return;
    }

    const params: CrewSearchCondition = {};

    // 空でない値のみパラメータに追加
    if (parseResult.output.emp_code)
      params.emp_code = parseResult.output.emp_code;
    if (parseResult.output.user_id) params.user_id = parseResult.output.user_id;
    if (parseResult.output.dept_id) params.dept_id = parseResult.output.dept_id;
    if (parseResult.output.q) params.q = parseResult.output.q;
    if (parseResult.output.id) params.id = parseResult.output.id;

    setSearchCondition(params);
    focus('crews')
  }

  return (
    <Box flexDirection="column" width="100%" borderStyle="round">
      <Text bold>従業員検索</Text>
      <Box
        width="100%"
        borderStyle={"single"}
        borderTop={false}
        borderLeft={false}
        borderRight={false}
      />

      <Form onSubmit={handleSubmit}>
        <Box flexDirection="column">
          <Text>従業員コード</Text>
          <Input name="emp_code" isDisabled={!isEmpCodeFocused} />
        </Box>

        <Box flexDirection="column">
          <Text>ユーザーID（カンマ区切り）</Text>
          <Input name="user_id" isDisabled={!isUserIdFocused} />
        </Box>

        <Box flexDirection="column">
          <Text>部署ID（カンマ区切り）</Text>
          <Input name="dept_id" isDisabled={!isDepartmentIdFocused} />
        </Box>

        <Box flexDirection="column">
          <Text>フリーワード（氏名・ビジネスネーム・部署・役職）</Text>
          <Input name="q" isDisabled={!isKeywordFocused} />
        </Box>

        <Box flexDirection="column">
          <Text>Crew ID（カンマ区切り）</Text>
          <Input name="id" isDisabled={!isCrewIdFocused} />
        </Box>

        <Box marginTop={1} width={40}>
          <Button id="crew-search-form-button">検索する</Button>
        </Box>
      </Form>

      <Box marginTop={1}>
        <Text dimColor>※ Escキーでキャンセル</Text>
      </Box>
    </Box>
  );
}
