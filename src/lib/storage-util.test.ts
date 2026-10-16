import { describe, expect, it, vi } from "vitest";

const { syncGet, localGet } = vi.hoisted(() => ({
  syncGet: vi.fn(),
  localGet: vi.fn(),
}));

vi.mock("webextension-polyfill", () => ({
  default: {
    storage: {
      sync: { get: syncGet, set: vi.fn() },
      local: { get: localGet, set: vi.fn() },
    },
  },
}));

import { LocalStorage, SyncStorage } from "./storage-util";

describe("SyncStorage.getOptions", () => {
  it("returns stored values", async () => {
    syncGet.mockResolvedValueOnce({
      enableAutoRead: true,
      autoReadInterval: 10,
    });
    expect(await SyncStorage.getOptions()).toEqual({
      enableAutoRead: true,
      autoReadInterval: 10,
    });
  });

  it("falls back to defaults when nothing is stored", async () => {
    syncGet.mockResolvedValueOnce({});
    expect(await SyncStorage.getOptions()).toEqual({
      enableAutoRead: false,
      autoReadInterval: 5,
    });
  });
});

describe("LocalStorage.getLastAutoReadTimestamp", () => {
  it("returns the stored timestamp", async () => {
    localGet.mockResolvedValueOnce({ lastAutoReadTimestamp: 1234 });
    expect(await LocalStorage.getLastAutoReadTimestamp()).toBe(1234);
  });

  it("falls back to 0 when nothing is stored", async () => {
    localGet.mockResolvedValueOnce({});
    expect(await LocalStorage.getLastAutoReadTimestamp()).toBe(0);
  });
});
