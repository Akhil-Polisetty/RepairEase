
const verifyUser = async (req,res,next)=>
    {
      try
      {
        const token = req.cookies.token;
        if(!token)
        {
          return res.json({status:false,message:"no token"})
        }
        const decoded=jwt.verify(token,"hellosuck");
        next();
      }
      catch(e)
      {
        return res.json(e);
      }
    }
    
    app.get('/auth/verify',verifyUser,(req,res)=>
    {
      return res.json({status:true,message:"authorized"});
    })