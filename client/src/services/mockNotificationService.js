const mockNotificationService = {
  subscribe: (callback) => {
    console.log("MockNotificationService: Subscribed");
    const interval = setInterval(() => {
      // callback({ id: Date.now(), title: "Live Mock", description: "Notifikasi mock dari client", time: "Baru saja" });
    }, 10000);

    return () => {
      console.log("MockNotificationService: Unsubscribed");
      clearInterval(interval);
    };
  },
};

export default mockNotificationService;
