import app from "../src/index.js"

// Exporta la app como manejador de funciones serverless
export default(req, res) =>{
    app(req,res)
}