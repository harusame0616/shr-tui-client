import { atom, useAtom } from "jotai";
import { uuidv7 } from "uuidv7";
import { FileConfigManager } from "./file-config-manager";
import { useEffect } from "react";

export type Account = {
  accountId: string;
  name: string;
  endpoint: string;
  token: string;
};

const configManager = new FileConfigManager();


const accountsAtom = atom<Account[]>([]);
const activeAccountIdAtom = atom<string | null>(null);
const isInitializedAtom = atom(false);
export function useAccounts() {
  const [accounts, setAccounts] = useAtom(accountsAtom);
  const [activeAccountId, setActiveAccountId] = useAtom(activeAccountIdAtom);
  const [isInitialized, setIsInitialized] = useAtom(isInitializedAtom);

  // 初期化処理
  useEffect(() => {
    if (!isInitialized) {
      configManager.load().then((config) => {
        setAccounts(config.accounts);
        setActiveAccountId(config.lastActiveAccountId);
        setIsInitialized(true);
      }).catch((error) => {
        console.error("設定ファイルの読み込みに失敗しました:", error);
        setIsInitialized(true);
      });
    }
  }, [isInitialized, setAccounts, setActiveAccountId, setIsInitialized]);

  async function addAccount(newAccount: Omit<Account, "accountId">) {
    const exists = accounts.some((account) => account.name === newAccount.name);
    if (exists) {
      throw new Error("登録済みの名前です");
    }

    const newAccountWithId = { accountId: uuidv7(), ...newAccount };
    const updatedAccounts = [...accounts, newAccountWithId];
    
    setAccounts(updatedAccounts);
    
    // 設定ファイルに保存
    await configManager.save({
      accounts: updatedAccounts,
      lastActiveAccountId: activeAccountId,
    });
  }

  async function activateAccount(accountId: string) {
    setActiveAccountId(accountId);
    
    // 設定ファイルに保存
    await configManager.save({
      accounts,
      lastActiveAccountId: accountId,
    });
  }

  const activeAccount = activeAccountId
    ? accounts.find(({ accountId }) => accountId === activeAccountId)
    : null;

  return { addAccount, accounts, activeAccount, activateAccount };
}
