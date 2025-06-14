
import mongoose, { Schema, model } from 'mongoose'


const schema = new Schema ({
sign_Url:String,
text:String
},{
    timestamps:true,
    versionKey:false
})

// Images are served from React public folder, so we just return the filename
schema.post('init',function(doc){
    // No URL transformation needed - frontend will handle public folder access
})

export const Sign = model('Sign',schema)

