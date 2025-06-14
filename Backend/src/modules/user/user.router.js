import { Router } from 'express'
import { deleteUser, getallUsers, getUser, getCurrentUser, updateUser, getUserProgress, updateUserProgress, updateQuestionProgress, completeLevel, addBookmark, removeBookmark, getUserBookmarks } from './user.controller.js'

const userRouter=Router()

userRouter.get('/',getallUsers)
userRouter.get('/current',getCurrentUser)
userRouter.get('/progress',getUserProgress)
userRouter.get('/bookmarks',getUserBookmarks)
userRouter.post('/bookmarks',addBookmark)
userRouter.delete('/bookmarks',removeBookmark)
userRouter.get('/:id',getUser)
userRouter.put('/:id',updateUser)
userRouter.put('/progress/update',updateUserProgress)
userRouter.put('/progress/question',updateQuestionProgress)
userRouter.put('/progress/complete',completeLevel)
userRouter.delete('/:id',deleteUser)

export default userRouter 