const planMiddleware = (planes) => {
    return (req, res, next) => {
        if(!req.company){
            return res.status(401).json({message: 'No Utenitcado'})
        }

        if(!planes.includes(req.company.plan)){
            return res.status(403).json({message: 'No Autorizado'})
        }

        next()
    }
}

export default planMiddleware;