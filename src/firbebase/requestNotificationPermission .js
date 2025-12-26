import { getToken } from "firebase/messaging";
import { messaging } from "../firebase";

const requestNotificationPermission = async () => {
  try {
    // 1️⃣ Notification permission
    const permission = await Notification.requestPermission();

    if (permission !== "granted") {
      console.log("❌ Notification permission denied");
      return null;
    }

    // 2️⃣ FCM Token generate
    const token = await getToken(messaging, {
      vapidKey: "YOUR_VAPID_KEY_HERE",
    });

    if (token) {
      console.log("✅ FCM Token:", token);
      return token;
    } else {
      console.log("❌ Token not generated");
      return null;
    }
  } catch (error) {
    console.error("FCM error:", error);
    return null;
  }
};

export default requestNotificationPermission;
