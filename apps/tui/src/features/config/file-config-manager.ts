import { promises as fs } from "fs";
import { homedir } from "os";
import path from "path";
import { Config, ConfigManager } from "./config-manager";

export class FileConfigManager implements ConfigManager {
  private readonly configPath: string;

  constructor() {
    this.configPath = path.join(homedir(), ".u_shr_tui_client.json");
  }

  async load(): Promise<Config> {
    try {
      const data = await fs.readFile(this.configPath, "utf-8");
      return JSON.parse(data) as Config;
    } catch (error) {
      // ファイルが存在しない場合は初期設定を返す
      if ((error as NodeJS.ErrnoException).code === "ENOENT") {
        return {
          accounts: [],
          lastActiveAccountId: null,
        };
      }
      throw error;
    }
  }

  async save(config: Config): Promise<void> {
    const data = JSON.stringify(config, null, 2);
    await fs.writeFile(this.configPath, data, "utf-8");
  }
}
