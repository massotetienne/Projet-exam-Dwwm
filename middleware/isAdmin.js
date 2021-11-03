module.export = (req,res,next)=>{
    if (req.session.isAdmin){
        next()
    
    }else{
        return res.redirect('/')
    }
}