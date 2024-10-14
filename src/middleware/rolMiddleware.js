const rolMiddleware = (roles) => {
    return (req, res, next) => {
        if(!req.user){
            return res.status(401).json({message: 'No Autenticado'})
        }

        if(!roles.includes(req.user.rol)){
            return res.status(403).json({message: 'No Autorizado'})
        }

        next()
    }
}

export default rolMiddleware;