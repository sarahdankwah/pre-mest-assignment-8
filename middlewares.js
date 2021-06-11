module.exports = {
    checkUser: (req,res,next) => {
        const { email } = req.body

        if(email === "allenn") {
            next()
            res.status(400).send({message:"You are not allowed to use the system"})
        }
    
        next();
    },

    checkName: (req,res,next) => {
        const { email } = req.body
        
    
        if(email === "allen") return res.status(400).send({message:"You are not ahuman"})
    
        next();
    }
    
}
    
