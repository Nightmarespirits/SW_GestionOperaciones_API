const validationMiddleware = (validationObj) => {
    return (req, res, next) => {
        if(!validationObj){
            return res.status(403).json({message: 'No Autorizado'})
        }

        next()
    }

}

export default validationMiddleware