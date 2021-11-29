import "../manifest.json";
// eslint-disable-next-line node/no-unpublished-import
import { GaroonRestAPIClient } from "@miyajan/garoon-rest";
import GaroonSoapAPIClient from "garoon-soap";
import { NotificationIdType } from "garoon-soap/dist/type/notification";
import { SyncStorage, LocalStorage } from "../lib/storage-util";

type NotificationItems = ReturnType<
  GaroonRestAPIClient["notification"]["getItems"]
> extends Promise<infer T>
  ? T
  : unknown;
type NotificationItemsWithNotificationKey = Omit<NotificationItems, "items"> & {
  items: Array<
    (NotificationItems["items"] extends Array<infer U> ? U : unknown) & {
      notificationKey: string;
    }
  >;
};

(async () => {
  const garoonRestApiClient = new GaroonRestAPIClient();
  const garoonSoapAPIClient = new GaroonSoapAPIClient(
    garoonRestApiClient.getBaseUrl()
  );

  const { enableAutoRead, autoReadInterval } = await SyncStorage.getOptions();
  const lastAutoReadTimestamp = await LocalStorage.getLastAutoReadTimestamp();
  // console.log(enableAutoRead);
  // console.log(autoReadInterval);
  // console.log(lastAutoReadTimestamp);

  if (!enableAutoRead) {
    return;
  }
  const currentTimeStamp = Date.now();
  if (lastAutoReadTimestamp + autoReadInterval * 1000 * 60 > currentTimeStamp) {
    // console.log("auto read skipped");
    return;
  }

  const requestToken = await garoonSoapAPIClient.util.getRequestToken();
  garoonSoapAPIClient.setRequestToken(requestToken);

  const notifications =
    (await garoonRestApiClient.notification.getItems()) as NotificationItemsWithNotificationKey;
  const filteredNotifications = notifications.items.filter((notification) => {
    // Notification of schedule modification with empty body
    if (
      notification.moduleId === "grn.schedule" &&
      notification.operation === "modify" &&
      notification.body.length === 0
    ) {
      return true;
    }
    return false;
  });
  const notificationIds = filteredNotifications.map(
    (notification): NotificationIdType => {
      return {
        moduleId: notification.moduleId,
        item: notification.notificationKey,
      };
    }
  );
  if (notificationIds.length > 0) {
    await garoonSoapAPIClient.notification.confirmNotifications(
      notificationIds
    );
  }

  await LocalStorage.setLastAutoReadTimestamp(Date.now());
})();
