import path from "node:path";
import { createDatabase } from "./db.js";
import { assetsFetcher } from "./static.js";
import { appRoot, schemaPath } from "./paths.js";
import type { Env } from "../src/types.ts";

export function createEnv(): Env {
  const dataDir = path.resolve(process.env.DATA_DIR || "./data");
  const db = createDatabase(dataDir, schemaPath());

  return {
    DB: db as unknown as D1Database,
    LOGS: undefined,
    ASSETS: assetsFetcher,
    ADMIN_TOKEN: process.env.ADMIN_TOKEN || "",
    NOTIFY_WEBHOOK: process.env.NOTIFY_WEBHOOK,
    OFFLINE_AFTER_SECONDS: process.env.OFFLINE_AFTER_SECONDS,
    LICENSE_ENFORCE: process.env.LICENSE_ENFORCE,
    LICENSE_DOMAIN: process.env.LICENSE_DOMAIN,
    LICENSE_SECRET: process.env.LICENSE_SECRET,
    // undefined = 用代码默认主站；显式空串 = 关闭远程广告
    PROMO_AD_SOURCE:
      process.env.PROMO_AD_SOURCE !== undefined ? process.env.PROMO_AD_SOURCE : undefined,
  };
}

// 便于日志
export const APP_ROOT = appRoot();

