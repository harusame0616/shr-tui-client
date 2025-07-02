import { atom, useAtom } from "jotai";
import { uuidv7 } from "uuidv7";

type Account = {
  accountId: string;
  name: string;
  endpoint: string;
  token: string;
};

const accountsAtom = atom<Account[]>([]);
const activeAccountIdAtom = atom<string | null>(null);
export function useAccounts() {
  const [accounts, setAccounts] = useAtom(accountsAtom);
  const [activeAccountId, setActiveAccountId] = useAtom(activeAccountIdAtom);

  function addAccount(newAccount: Omit<Account, "accountId">) {
    const exists = accounts.some((account) => account.name === newAccount.name);
    if (exists) {
      throw new Error("登録済みの名前です");
    }

    setAccounts((prevAccounts) => {
      return [...prevAccounts, { accountId: uuidv7(), ...newAccount }];
    });
  }

  function activateAccount(accountId: string) {
    setActiveAccountId(accountId);
  }

  const activeAccount = activeAccountId
    ? accounts.find(({ accountId }) => accountId === activeAccountId)
    : null;

  return { addAccount, accounts, activeAccount, activateAccount };
}
