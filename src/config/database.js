import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        console.log("Conectado")
    } catch (e) {
        console.error('Error al conectar a MongoDB:', e.message)
        process.exit(1)
    }
}

export default connectDB;