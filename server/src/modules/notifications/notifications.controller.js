import * as Service from './notifications.service.js';

export const list = async (req, res) => {
  try {
    const { role, id, unreadOnly } = req.query;
    if (!role || !id) {
      return res.status(400).json({ success: false, message: 'Role and ID are required' });
    }
    const notifications = await Service.getNotifications({ recipientRole: role, recipientId: id, unreadOnly });
    res.json({ success: true, data: notifications });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const unreadCount = async (req, res) => {
  try {
    const { role, id } = req.query;
    if (!role || !id) {
      return res.status(400).json({ success: false, message: 'Role and ID are required' });
    }
    const count = await Service.getUnreadCount(role, id);
    res.json({ success: true, data: { count } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const markRead = async (req, res) => {
  try {
    const notification = await Service.markRead(req.params.id);
    res.json({ success: true, data: notification });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const markAllRead = async (req, res) => {
  try {
    const { role, id } = req.body;
    if (!role || !id) {
      return res.status(400).json({ success: false, message: 'Role and ID are required' });
    }
    await Service.markAllRead(role, id);
    res.json({ success: true, message: 'All notifications marked as read' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
