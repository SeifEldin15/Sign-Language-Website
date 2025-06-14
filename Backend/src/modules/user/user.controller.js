import { User } from '../../../DB/models/user.schema.js'
import { catchError } from '../../middlewares/catchError.js'
import { AppError } from '../../utils/appError.js'
import { ApiFeatures } from '../../utils/apiFeature.js'
import bcrypt from 'bcrypt'

const getallUsers =catchError( async(req,res)=>{
    let apiFeatures =new ApiFeatures(User.find(),req.query)
            let users =await apiFeatures.mongooseQuery
    res.status(201).json({message:"User Created .." , users})
})

const getUser =catchError( async(req,res)=>{
let user = await User.findById(req.params.id)
    res.status(201).json({message:"User ---->" , user})
})

const getCurrentUser = catchError(async(req, res, next) => {
    const userId = req.headers.userid || req.query.userId
    if (!userId) {
        return next(new AppError('User ID is required', 400))
    }
    
    const user = await User.findById(userId).select('name email role user_points level')
    if (!user) {
        return next(new AppError('User not found', 404))
    }
    
    res.status(200).json({message: "Current user retrieved successfully", user})
})

const updateUser =catchError( async (req,res,next)=>{
    // if(req.body.profile_Picture) req.body.profile_Picture=req.file.filename
    
    // Check if user exists first
    const existingUser = await User.findById(req.params.id)
    if (!existingUser) {
        return next(new AppError('User Not found', 404))
    }
    
    // Hash password if it's being updated
    if (req.body.password) {
        req.body.password = bcrypt.hashSync(req.body.password, 10)
    }
    
    // If email is being updated, check if it's already taken by another user
    if (req.body.email && req.body.email !== existingUser.email) {
        const emailExists = await User.findOne({ 
            email: req.body.email, 
            _id: { $ne: req.params.id } 
        })
        if (emailExists) {
            return next(new AppError('Email already exists', 400))
        }
    }
    
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true})
    
    // Don't return the password in the response
    const { password, ...userResponse } = user.toObject()
    
    res.json({message: "User updated successfully", user: userResponse})
})

const deleteUser =catchError( async (req,res,next)=>{
    let user = await User.findByIdAndDelete(req.params.id)
    user || next(new AppError('User Not found',404))
    !user || res.json({message:"Success ..", user})
})

// Get user progress
const getUserProgress = catchError(async(req, res, next) => {
    const userId = req.headers.userid || req.query.userId
    console.log('Backend - getUserProgress called with userId:', userId); // Debug log
    
    if (!userId) {
        console.log('Backend - No userId provided'); // Debug log
        return next(new AppError('User ID is required', 400))
    }
    
    const user = await User.findById(userId)
        .select('progress user_points')
        .populate('progress.currentLevel', 'name')
        .populate('progress.completedLevels.levelId', 'name')
    
    console.log('Backend - Found user:', user ? 'Yes' : 'No'); // Debug log
    console.log('Backend - User progress:', user?.progress); // Debug log
    
    if (!user) {
        console.log('Backend - User not found for ID:', userId); // Debug log
        return next(new AppError('User not found', 404))
    }
    
    // If user has no progress object, initialize it
    if (!user.progress) {
        console.log('Backend - Initializing empty progress for user'); // Debug log
        user.progress = {
            currentLevel: null,
            questionsCompleted: 0,
            totalQuestions: 0,
            correctAnswers: 0,
            completedLevels: []
        };
        await user.save();
    }
    
    res.status(200).json({
        message: "User progress retrieved successfully", 
        progress: user.progress,
        user_points: user.user_points
    })
})

// Update user progress when starting a level
const updateUserProgress = catchError(async(req, res, next) => {
    const userId = req.headers.userid || req.query.userId
    const { currentLevel, totalQuestions } = req.body
    
    console.log('Backend - updateUserProgress Debug:'); // Debug log
    console.log('- Request headers:', req.headers); // Debug log
    console.log('- Request body:', req.body); // Debug log
    console.log('- Parsed data:', { userId, currentLevel, totalQuestions }); // Debug log
    
    if (!userId) {
        return next(new AppError('User ID is required', 400))
    }
    
    if (!currentLevel) {
        console.log('Backend - No currentLevel provided'); // Debug log
        return next(new AppError('Current level is required', 400))
    }
    
    if (totalQuestions === undefined) {
        console.log('Backend - No totalQuestions provided'); // Debug log
        return next(new AppError('Total questions is required', 400))
    }
    
    const user = await User.findByIdAndUpdate(
        userId,
        {
            'progress.currentLevel': currentLevel,
            'progress.totalQuestions': totalQuestions,
            'progress.questionsCompleted': 0 // Reset when starting new level
        },
        { new: true }
    ).populate('progress.currentLevel', 'name')
    
    console.log('Backend - Progress updated for new level:', user?.progress); // Debug log
    
    if (!user) {
        return next(new AppError('User not found', 404))
    }
    
    res.status(200).json({
        message: "User progress updated successfully",
        progress: user.progress
    })
})

// Update question progress (when user answers a question)
const updateQuestionProgress = catchError(async(req, res, next) => {
    const userId = req.headers.userid || req.query.userId
    console.log('Backend - updateQuestionProgress called with userId:', userId); // Debug log
    
    if (!userId) {
        console.log('Backend - No userId provided for question progress'); // Debug log
        return next(new AppError('User ID is required', 400))
    }
    
    // Just increment questions completed
    const updateData = {
        $inc: { 
            'progress.questionsCompleted': 1
        }
    }
    
    console.log('Backend - Update data:', updateData); // Debug log
    
    const user = await User.findByIdAndUpdate(
        userId,
        updateData,
        { new: true }
    ).populate('progress.currentLevel', 'name')
    
    console.log('Backend - Updated user progress:', user?.progress); // Debug log
    
    if (!user) {
        console.log('Backend - User not found for question progress update:', userId); // Debug log
        return next(new AppError('User not found', 404))
    }
    
    res.status(200).json({
        message: "Question progress updated successfully",
        progress: user.progress
    })
})

// Complete a level
const completeLevel = catchError(async(req, res, next) => {
    const userId = req.headers.userid || req.query.userId
    console.log('Backend - completeLevel called with userId:', userId); // Debug log
    
    if (!userId) {
        return next(new AppError('User ID is required', 400))
    }
    
    const user = await User.findById(userId)
    if (!user) {
        return next(new AppError('User not found', 404))
    }
    
    // Add completed level to history
    const completedLevel = {
        levelId: user.progress.currentLevel,
        completedAt: new Date(),
        questionsCompleted: user.progress.questionsCompleted,
        totalQuestions: user.progress.totalQuestions
    }
    
    console.log('Backend - Adding completed level:', completedLevel); // Debug log
    
    const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
            $push: { 'progress.completedLevels': completedLevel },
            // Reset current level progress
            'progress.questionsCompleted': 0,
            'progress.totalQuestions': 0
        },
        { new: true }
    ).populate('progress.currentLevel', 'name')
    .populate('progress.completedLevels.levelId', 'name')
    
    console.log('Backend - Level completed, updated progress:', updatedUser?.progress); // Debug log
    
    res.status(200).json({
        message: "Level completed successfully",
        progress: updatedUser.progress
    })
})

// Add bookmark
const addBookmark = catchError(async(req, res, next) => {
    const userId = req.headers.userid || req.query.userId
    const { word, image, category } = req.body
    
    if (!userId) {
        return next(new AppError('User ID is required', 400))
    }
    
    if (!word || !image || !category) {
        return next(new AppError('Word, image, and category are required', 400))
    }
    
    const user = await User.findById(userId)
    if (!user) {
        return next(new AppError('User not found', 404))
    }
    
    // Check if already bookmarked
    const existingBookmark = user.bookmarks.find(bookmark => bookmark.word === word)
    if (existingBookmark) {
        return next(new AppError('Word already bookmarked', 400))
    }
    
    // Add bookmark
    user.bookmarks.push({ word, image, category })
    await user.save()
    
    res.status(200).json({
        message: "Bookmark added successfully",
        bookmarks: user.bookmarks
    })
})

// Remove bookmark
const removeBookmark = catchError(async(req, res, next) => {
    const userId = req.headers.userid || req.query.userId
    const { word } = req.body
    
    if (!userId) {
        return next(new AppError('User ID is required', 400))
    }
    
    if (!word) {
        return next(new AppError('Word is required', 400))
    }
    
    const user = await User.findById(userId)
    if (!user) {
        return next(new AppError('User not found', 404))
    }
    
    // Remove bookmark
    user.bookmarks = user.bookmarks.filter(bookmark => bookmark.word !== word)
    await user.save()
    
    res.status(200).json({
        message: "Bookmark removed successfully",
        bookmarks: user.bookmarks
    })
})

// Get user bookmarks
const getUserBookmarks = catchError(async(req, res, next) => {
    const userId = req.headers.userid || req.query.userId
    
    if (!userId) {
        return next(new AppError('User ID is required', 400))
    }
    
    const user = await User.findById(userId).select('bookmarks')
    if (!user) {
        return next(new AppError('User not found', 404))
    }
    
    res.status(200).json({
        message: "Bookmarks retrieved successfully",
        bookmarks: user.bookmarks
    })
})

export {
    getallUsers,
    getUser,
    getCurrentUser,
    updateUser,
    deleteUser,
    getUserProgress,
    updateUserProgress,
    updateQuestionProgress,
    completeLevel,
    addBookmark,
    removeBookmark,
    getUserBookmarks
}