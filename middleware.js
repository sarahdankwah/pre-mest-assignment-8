module.exports = function checkUser(req,res,next){
    const { email } = req.body

    if(email === 'allen'){
        res.status(400).send({message: "You are a robot so no payment action for you"})
    }
    next()
}