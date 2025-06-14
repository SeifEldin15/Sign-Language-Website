import { Question } from "../../../DB/models/question.schema.js";
import { catchError } from "../../middlewares/catchError.js";
import mongoose from "mongoose";



const AddQuestions =catchError(async(req,res,next)=>{
 req.body.sign_Url=req.file.filename
let question = await Question.insertMany(req.body)
res.status(200).json({message:"Created .. ", question})
})


const getAllQuestions =catchError(async(req,res,next)=>{
    let questions = await Question.find()
    res.status(200).json({message:"all .. ", questions})
    })


    const getoneQuestions =catchError(async(req,res,next)=>{
        let question = await Question.findById(req.params.id)
        res.status(200).json({message:"all .. ", question})
        })


    const updateQuestions =catchError(async(req,res,next)=>{
        req.body.sign_Url=req.file.filename
        let question = await Question.findByIdAndUpdate(req.params.id,req.body,{new:true})
        res.status(200).json({message:"all .. ", question})
        })


    const deleteQuestions =catchError(async(req,res,next)=>{
        let questions = await Question.findByIdAndDelete(req.params.id)
        res.status(200).json({message:"all .. ", questions})
        })
    

const getQuestionsByLevel = catchError(async (req, res, next) => {
    const { levelId } = req.params;
    
    let questions;
    try {
        console.log('Looking for questions with levelId:', levelId);
        
        // If levelId is a valid ObjectId format, use it directly
        if (levelId.match(/^[0-9a-fA-F]{24}$/)) {
            questions = await Question.find({ level: levelId });
            console.log('Found questions by ObjectId:', questions.length);
        } else {
            // If levelId is a number like "1", "2", etc., find the corresponding level
            const { Level } = await import("../../../DB/models/levels.schema.js");
            const levels = await Level.find().sort({ _id: 1 }); // Sort by creation order
            const levelIndex = parseInt(levelId) - 1; // Convert to 0-based index
            
            console.log('Available levels:', levels.map(l => ({ id: l._id, name: l.name })));
            
            if (levelIndex >= 0 && levelIndex < levels.length) {
                const actualLevel = levels[levelIndex];
                questions = await Question.find({ level: actualLevel._id });
                console.log(`Found questions for level ${levelIndex + 1}:`, questions.length);
            } else {
                questions = [];
                console.log('Level index out of bounds:', levelIndex);
            }
        }
        
        // Ensure each option has an _id if it doesn't exist
        questions = questions.map(question => {
            const questionObj = question.toObject();
            questionObj.options = questionObj.options.map(option => ({
                ...option,
                _id: option._id || new mongoose.Types.ObjectId()
            }));
            return questionObj;
        });
        
        console.log('Final questions to return:', questions.length);
        
    } catch (error) {
        console.error('Error in getQuestionsByLevel:', error);
        questions = [];
    }
    
    res.status(200).json({ message: "Questions for level", questions });
});

const getAllLevelsWithQuestionCount = catchError(async (req, res, next) => {
    const { Level } = await import("../../../DB/models/levels.schema.js");
    const levels = await Level.find().sort({ _id: 1 });
    
    // Get question count for each level
    const levelsWithQuestionCount = await Promise.all(
        levels.map(async (level, index) => {
            const questionCount = await Question.countDocuments({ level: level._id });
            return {
                id: level._id,
                numericId: index + 1, // Add numeric ID for easy frontend use
                name: level.name,
                questionCount,
                category: level.category
            };
        })
    );
    
    res.status(200).json({ message: "All levels with question counts", levels: levelsWithQuestionCount });
});

export {
    AddQuestions,
    getAllQuestions,
    deleteQuestions,
    updateQuestions,
    getoneQuestions,
    getQuestionsByLevel,
    getAllLevelsWithQuestionCount
}