import jsonwebtoken from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '')

    if(!token){
        return res.status(401).json({ message: 'No se proporcionó token de autenticación' })
    }

    try {
        const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET)
        req.company = decoded;
        next();
    } catch (error) {
        res.status(401).json({message: 'Token Invalido'})
    }
}

export default authMiddleware;