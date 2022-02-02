const authPage = (permissions) => {
    return(req, res, next) => {
        const userRole = req.body.role
        if (permissions.includes(userRole)) {
            next()
        } else {
            return res.status(401).json("You can't access this")
        }
    }
}

const authinfo = (req, res, next) => {
    
}


module.exports = { authPage, authinfo}