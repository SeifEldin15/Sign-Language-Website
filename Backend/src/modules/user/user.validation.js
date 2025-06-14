import joi from 'joi'

const signupVal= joi.object({
    name:joi.string().min(2).max(30).required(),
    email:joi.string().email().required(),
    password:joi.string().min(6).max(40).required(),
    repassword:joi.valid(joi.ref('password')).required(),
    role:joi.string()
})



const signinVal= joi.object({
    email:joi.string().email().required(),
    password:joi.string().min(6).max(40).required().messages({
        'string.min': 'Password must be at least 6 characters long',
        'string.max': 'Password must be no longer than 40 characters',
        'string.empty': 'Password is required'})
})



const changePasswordVal= joi.object({
    email:joi.string().email().required(),
    oldPassword:joi.string().min(6).max(40).required().messages({
        'string.min': 'oldPassword must be at least 6 characters long',
        'string.max': 'oldPassword must be no longer than 40 characters',
        'string.empty': 'oldPassword is required'}),
        newPassword:joi.string().min(6).max(40).required().messages({
            'string.min': 'newPassword must be at least 6 characters long',
            'string.max': 'newPassword must be no longer than 40 characters',
            'string.empty': 'newPassword is required'})
})

// Progress validation schemas
const updateProgressVal = joi.object({
    currentLevel: joi.string().required(),
    totalQuestions: joi.number().min(0).required()
})

const updateQuestionProgressVal = joi.object({
    isCorrect: joi.boolean().required()
})

export{
    signupVal,
    signinVal ,
    changePasswordVal,
    updateProgressVal,
    updateQuestionProgressVal
}