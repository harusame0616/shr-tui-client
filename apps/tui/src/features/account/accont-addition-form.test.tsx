import { render } from "ink-testing-library";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import * as React from "react";
import { AddAccountForm } from "./accont-addition-form";
import { TextInput } from "@inkjs/ui";
import { setTimeout } from "timers/promises";
import { Account } from "./use-account";

async function delay() {
  await setTimeout(50);
}
const mockPush = vi.fn();
const mockAddAccount = vi.fn();

// TODO カスタムフック単位のモックは辞める

vi.mock("../router/use-router", () => ({
  useRouter: () => ({ push: mockPush }),
  Route: {
    Crews: "crews",
    Users: "users",
    Departments: "departments",
  },
}));

vi.mock("./use-account", () => ({
  useAccounts: () => ({
    addAccount: mockAddAccount,
    accounts: [
      {
        accountId: "id1",
        endpoint: "https://example.com",
        name: "account1",
        token: "token1",
      },
    ] satisfies Account[],
  }),
}));

beforeEach(() => {
  vi.clearAllMocks();
});

afterEach(() => {
  vi.restoreAllMocks();
});

test("すべてのフィールドが正しく入力されていて「登録する」を押すと登録できる", async () => {
  mockAddAccount.mockResolvedValueOnce({ success: true });

  const { stdin } = render(<AddAccountForm />);

  await delay();
  stdin.write("test-account");

  await delay();
  stdin.write("\t");

  await delay();
  stdin.write("https://example.smarthr.jp/api/v1");

  await delay();
  stdin.write("\t");

  await delay();
  stdin.write("shr_test_token");

  await delay();
  stdin.write("\t");

  await delay();
  stdin.write("\r");

  await delay();
  expect(mockAddAccount).toHaveBeenCalledWith({
    name: "test-account",
    endpoint: "https://example.smarthr.jp/api/v1",
    token: "shr_test_token",
  });
  expect(mockPush).toHaveBeenCalledWith("crews");
});

test("「アカウント名」が入力されていない状態で「登録する」を押すとエラーメッセージが表示される", async () => {
  const { lastFrame, stdin } = render(React.createElement(AddAccountForm));

  await delay();
  stdin.write("\t");

  await delay();
  stdin.write("https://example.smarthr.jp/api/v1");

  await delay();
  stdin.write("\t");

  await delay();
  stdin.write("shr_test_token");

  await delay();
  stdin.write("\t");

  await delay();
  stdin.write("\r");

  await delay();
  expect(lastFrame()).toContain("アカウント名は必須です");
  expect(mockAddAccount).not.toHaveBeenCalled();
});

test("「エンドポイント」が入力されていない状態で「登録する」を押すとエラーメッセージが表示される", async () => {
  const { lastFrame, stdin } = render(<AddAccountForm />);

  await delay();
  stdin.write("test-account");

  await delay();
  stdin.write("\t");

  await delay();
  stdin.write("\t");

  await delay();
  stdin.write("shr_test_token");

  await delay();
  stdin.write("\t");

  await delay();
  stdin.write("\r");

  await delay();
  expect(lastFrame()).toContain("エンドポイントは必須です");
  expect(mockAddAccount).not.toHaveBeenCalled();
});

test("「エンドポイント」に URL 以外を入力して「登録する」を押すとエラーメッセージが表示される", async () => {
  const { lastFrame, stdin } = render(React.createElement(AddAccountForm));

  await delay();
  stdin.write("test-account");

  await delay();
  stdin.write("\t");

  await delay();
  stdin.write("not-a-url");

  await delay();
  stdin.write("\t");

  await delay();
  stdin.write("shr_test_token");

  await delay();
  stdin.write("\t");

  await delay();
  stdin.write("\r");

  await delay();
  expect(lastFrame()).toContain("エンドポイントには URL を入力してください");
  expect(mockAddAccount).not.toHaveBeenCalled();
});

test("「アクセストークン」が入力されていない状態で「登録する」を押すとエラーメッセージが表示される", async () => {
  const { lastFrame, stdin } = render(<AddAccountForm />);

  await delay();
  stdin.write("test-account");

  await delay();
  stdin.write("\t");

  await delay();
  stdin.write("https://example.smarthr.jp/api/v1");

  await delay();
  stdin.write("\t");

  await delay();
  stdin.write("\t");

  await delay();
  stdin.write("\r");

  await delay();
  expect(lastFrame()).toContain("トークンは必須です");
  expect(mockAddAccount).not.toHaveBeenCalled();
});

test("すでに登録済みのアカウント名を「アカウント名」に入力して「登録する」を押すとエラーメッセージが表示される", async () => {
  mockAddAccount.mockImplementation(() => {
    return {
      success: false,
      message: "登録済みのアカウント名です",
    } as const;
  });

  const { lastFrame, stdin } = render(React.createElement(AddAccountForm));

  await delay();
  stdin.write("existing-account");

  await delay();
  stdin.write("\t");

  await delay();
  stdin.write("https://example.smarthr.jp/api/v1");

  await delay();
  stdin.write("\t");

  await delay();
  stdin.write("shr_test_token");

  await delay();
  stdin.write("\t");

  await delay();
  stdin.write("\r");

  await delay();
  expect(lastFrame()).toContain("登録済みのアカウント名です");
});
