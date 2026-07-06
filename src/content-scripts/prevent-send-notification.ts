import "../manifest.json";

(async () => {
  const isNotifyEl = document.getElementById("is_notify") as
    | HTMLInputElement
    | undefined;

  const shouldNotifyAttendeesEl = document.getElementById(
    "should_notify_attendees",
  ) as HTMLInputElement | undefined;

  if (isNotifyEl != null) {
    isNotifyEl.checked = false;
  }

  if (shouldNotifyAttendeesEl != null) {
    shouldNotifyAttendeesEl.checked = false;
  }
})();
