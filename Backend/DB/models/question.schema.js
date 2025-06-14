import mongoose, { Schema, Types, model } from 'mongoose'


const schema = new Schema ({
    level:{type:Types.ObjectId, ref:"Level"},
    sign_Url:String,
    sign_Text:String, 
    type: { // Question types
        type: String,
        required: true,
        enum: ['MCQ', 'True or False']},
question:{type:String, required:true},
options:[
    {
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            default: () => new mongoose.Types.ObjectId()
        },
        text:String,
        score:{type:Number, min:0, max:10, default:0}
    }
],
correctOption:{ type: mongoose.Schema.Types.Mixed}
},{
    timestamps:true,
    versionKey:false
})

// Images are served from React public folder, so we just return the filename
schema.post('init',function(doc){
    // No URL transformation needed - frontend will handle public folder access
})


export const Question = model('Question',schema)

