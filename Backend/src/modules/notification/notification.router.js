import { Router } from 'express'
import { 
  getUserNotifications, 
  markAsRead, 
  markAllAsRead, 
  createNotification 
} from './notification.controller.js'

const notificationRouter = Router()

notificationRouter.get('/user/:userId', getUserNotifications)
notificationRouter.put('/:notificationId/read', markAsRead)
notificationRouter.put('/user/:userId/read-all', markAllAsRead)
notificationRouter.post('/', createNotification)

export default notificationRouter 