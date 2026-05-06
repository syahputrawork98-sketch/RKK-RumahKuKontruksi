const NotificationService = {
  subscribe: (callback) => {
    console.log("NotificationService: Subscribed");
    // Mocking an occasional notification
    const interval = setInterval(() => {
      // callback({ id: Date.now(), title: "Live Notification", description: "This is a live mock notification", time: "Baru saja" });
    }, 10000);

    return () => {
      console.log("NotificationService: Unsubscribed");
      clearInterval(interval);
    };
  },
};

export default NotificationService;
