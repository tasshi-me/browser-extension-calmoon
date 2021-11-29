import { SyncStorage } from "../lib/storage-util";
import "./options.css";

console.log("options.js loaded!!!");

const main = async () => {
  await restoreOptions();
  const enableAutoReadEl = document.querySelector<HTMLInputElement>(
    "input#enable-auto-read"
  );
  const autoReadIntervalEl = document.querySelector<HTMLInputElement>(
    "input#auto-read-interval"
  );
  if (autoReadIntervalEl && enableAutoReadEl) {
    autoReadIntervalEl.disabled = !enableAutoReadEl.checked;
  }
  enableAutoReadEl?.addEventListener("change", () => {
    if (autoReadIntervalEl && enableAutoReadEl) {
      autoReadIntervalEl.disabled = !enableAutoReadEl.checked;
    }
  });
  enableAutoReadEl?.addEventListener("change", () => {
    const optionSavedTextEl =
      document.querySelector<HTMLParagraphElement>("#options-saved");
    if (optionSavedTextEl) {
      optionSavedTextEl.style.visibility = "hidden";
    }
  });
  autoReadIntervalEl?.addEventListener("change", () => {
    const optionSavedTextEl =
      document.querySelector<HTMLParagraphElement>("#options-saved");
    if (optionSavedTextEl) {
      optionSavedTextEl.style.visibility = "hidden";
    }
  });
};

const saveOptions = async () => {
  console.log("Save options!!");
  const enableAutoReadEl = document.querySelector<HTMLInputElement>(
    "input#enable-auto-read"
  );
  const autoReadIntervalEl = document.querySelector<HTMLInputElement>(
    "input#auto-read-interval"
  );
  const enableAutoRead = enableAutoReadEl ? enableAutoReadEl.checked : false;
  const autoReadInterval = autoReadIntervalEl ? autoReadIntervalEl.value : "5";
  // console.log(enableAutoRead);
  // console.log(autoReadInterval);
  await SyncStorage.setOptions({
    enableAutoRead: enableAutoRead,
    autoReadInterval: parseInt(autoReadInterval, 10),
  });
  const optionSavedTextEl =
    document.querySelector<HTMLParagraphElement>("#options-saved");
  if (optionSavedTextEl) {
    optionSavedTextEl.style.visibility = "visible";
  }
};

const restoreOptions = async () => {
  console.log("Restore options!!");

  const { enableAutoRead, autoReadInterval } = await SyncStorage.getOptions();
  const enableAutoReadEl = document.querySelector<HTMLInputElement>(
    "input#enable-auto-read"
  );
  const autoReadIntervalEl = document.querySelector<HTMLInputElement>(
    "input#auto-read-interval"
  );
  if (enableAutoReadEl) {
    enableAutoReadEl.checked = enableAutoRead;
  }
  if (autoReadIntervalEl) {
    autoReadIntervalEl.value = autoReadInterval.toString();
  }
};

document.addEventListener("DOMContentLoaded", main);
document.querySelector("form")?.addEventListener("submit", (e) => {
  e.preventDefault();
  return saveOptions();
});
