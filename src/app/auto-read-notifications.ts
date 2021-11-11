import "../manifest.json";
import { GaroonRestAPIClient } from "@miyajan/garoon-rest";
import GaroonSoapAPIClient from "garoon-soap";
import { NotificationIdType } from "garoon-soap/dist/type/notification";

const garoonRestApiClient = new GaroonRestAPIClient();
const garoonSoapAPIClient = new GaroonSoapAPIClient(
  garoonRestApiClient.getBaseUrl()
);

type BaseNotificationItems = ReturnType<
  GaroonRestAPIClient["notification"]["getItems"]
> extends Promise<infer T>
  ? T
  : unknown;
type NotificationItems = Omit<BaseNotificationItems, "items"> & {
  items: Array<
    (BaseNotificationItems["items"] extends Array<infer U> ? U : unknown) & {
      notificationKey: string;
    }
  >;
};

(async () => {
  const requestToken = await garoonSoapAPIClient.util.getRequestToken();
  garoonSoapAPIClient.setRequestToken(requestToken);

  const notifications =
    (await garoonRestApiClient.notification.getItems()) as NotificationItems;
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
})();
