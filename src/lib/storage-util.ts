// eslint-disable-next-line node/no-unpublished-import
import browser from "webextension-polyfill";

export type Options = {
  enableAutoRead: boolean;
  autoReadInterval: number;
};

export const SyncStorage = {
  getOptions: async (): Promise<Options> => {
    const record = await browser.storage.sync.get([
      "enableAutoRead",
      "autoReadInterval",
    ]);
    return {
      enableAutoRead: record.enableAutoRead ?? false,
      autoReadInterval: record.autoReadInterval ?? 5,
    };
  },

  setOptions: async (options: Partial<Options>): Promise<void> => {
    await browser.storage.sync.set(options);
  },
};

export const LocalStorage = {
  getLastAutoReadTimestamp: async (): Promise<number> => {
    const record = await browser.storage.local.get(["lastAutoReadTimestamp"]);
    return record.lastAutoReadTimestamp ?? 0;
  },

  setLastAutoReadTimestamp: async (
    lastAutoReadTimestamp: number,
  ): Promise<void> => {
    await browser.storage.local.set({
      lastAutoReadTimestamp,
    });
  },
};
