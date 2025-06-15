import { Notification } from '../../../DB/models/notification.schema.js'
import { catchError } from '../../middlewares/catchError.js'
import { AppError } from '../../utils/appError.js'

const getUserNotifications = catchError(async (req, res) => {
  const { userId } = req.params
  const notifications = await Notification.find({ user: userId })
    .sort({ createdAt: -1 })
    .limit(10)
  
  res.status(200).json({ 
    message: "Notifications retrieved successfully", 
    notifications,
    unreadCount: notifications.filter(n => !n.isRead).length
  })
})

const markAsRead = catchError(async (req, res, next) => {
  const { notificationId } = req.params
  
  const notification = await Notification.findByIdAndUpdate(
    notificationId, 
    { isRead: true }, 
    { new: true }
  )
  
  if (!notification) {
    return next(new AppError('Notification not found', 404))
  }
  
  res.status(200).json({ message: "Notification marked as read", notification })
})

const markAllAsRead = catchError(async (req, res) => {
  const { userId } = req.params
  
  await Notification.updateMany(
    { user: userId, isRead: false }, 
    { isRead: true }
  )
  
  res.status(200).json({ message: "All notifications marked as read" })
})

const createNotification = catchError(async (req, res) => {
  const notification = new Notification(req.body)
  await notification.save()
  
  res.status(201).json({ 
    message: "Notification created successfully", 
    notification 
  })
})

export {
  getUserNotifications,
  markAsRead,
  markAllAsRead,
  createNotification
} 