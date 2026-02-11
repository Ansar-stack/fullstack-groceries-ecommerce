import mongoose from 'mongoose';

export const ConnectDB = async ()=>{
    try {
        const db = await mongoose.connect(process.env.MONGO_URI);
        if(db.connections[0].readyState === 1){
            console.log(`DB Connected Successfully`);
        }
    } catch (error) {
        console.log(`DB Connection Failed: ${error.message}`)
    }
}