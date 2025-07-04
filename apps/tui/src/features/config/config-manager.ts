import { Account } from "../account/use-account";

export type Config = {
  accounts: Account[];
  lastActiveAccountId: string | null;
};

export interface ConfigManager {
  load(): Promise<Config>;
  save(config: Config): Promise<void>;
}
