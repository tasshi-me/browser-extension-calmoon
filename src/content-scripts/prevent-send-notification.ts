import "../manifest.json";

(async () => {
  const isNotifyEl = document.getElementById("is_notify") as
    | HTMLInputElement
    | undefined;

  if (isNotifyEl != null) {
    isNotifyEl.checked = false;
  }
})();
