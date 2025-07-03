#!/bin/bash

# Read JSON from stdin
json=$(cat)

# Extract file path using jq
file_path=$(echo "$json" | jq -r '.tool_input.file_path | select(endswith(".ts") or endswith(".tsx"))')

# If file_path is empty or null, exit successfully
if [ -z "$file_path" ]; then
    exit 0
fi

# Flag to track if any check failed
any_failed=0

# Run TypeScript type check
echo "Running TypeScript type check..." >&2
tsc_output=$(pnpm tsc --noEmit 2>&1)
tsc_exit_code=$?

if [ $tsc_exit_code -ne 0 ]; then
    echo "型エラーです。修正してください:" >&2
    echo "$tsc_output" >&2
    any_failed=1
fi

# # Run ESLint
# echo "Running ESLint..." >&2
# eslint_output=$(pnpm eslint . 2>&1)
# eslint_exit_code=$?

# if [ $eslint_exit_code -ne 0 ]; then
#     echo "静的解析エラーです。修正してください:" >&2
#     echo "$eslint_output" >&2
#     any_failed=1
# fi

# Run Knip for unused code detection
echo "Running Knip..." >&2
knip_output=$(pnpm knip 2>&1)
knip_exit_code=$?

if [ $knip_exit_code -ne 0 ]; then
    echo "未使用のコードがあります。削除してください:" >&2
    echo "$knip_output" >&2
    any_failed=1
fi

# If any check failed, exit with code 2
if [ $any_failed -eq 1 ]; then
    exit 2
fi

# All checks passed
echo "全てのチェックが成功しました！" >&2
exit 0
