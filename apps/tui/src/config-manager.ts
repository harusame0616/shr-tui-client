import { Account } from "./use-account";

export type Config = {
  accounts: Account[];
  lastActiveAccountId: string | null;
};

export interface ConfigManager {
  load(): Promise<Config>;
  save(config: Config): Promise<void>;
}