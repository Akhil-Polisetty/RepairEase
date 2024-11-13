app.get('/auth/logout',(req,res)=>
    {
      res.clearCookie('token')
      res.clearCookie('email')
      return res.json({status:true})
    })