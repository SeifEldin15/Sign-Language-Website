import bcrypt from "bcrypt"
import { User } from "../../DB/models/user.schema.js"
import { AppError } from '../utils/appError.js'
import { catchError } from './catchError.js'

export const checkEmail = catchError(async (req, res, next) => {
    const { email } = req.body
    
    if (!email) {
        return next(new AppError('Email is required', 400))
    }
    
    const existingUser = await User.findOne({ email })
    
    if (existingUser) {
        return next(new AppError('Email already exists', 400))
    }
    
    next()
}) 