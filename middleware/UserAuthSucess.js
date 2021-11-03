module.exports= (req, res,next) => {
 
  if ( req.session.userId){
      return res.redirect('/')
  }else{
    res.render('log', {
      error: "mdp ou iD incorrect"
  })
  }
  next()
}