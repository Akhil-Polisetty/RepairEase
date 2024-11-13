// app.get('/getactiverep',(req,res)=>{
//     ActiveRepairModel.find({
//       $or: [
//         { user: email_glob },
//         { technician: email_glob }
//       ]
//     }).then(actives => {
//       if(actives){
//         console.log("responses are ",actives)
//         res.json(actives);
//       }
//       else
//       {
//         res.status(404).json("responses not found");
//       }
//     })
//     .catch(err => res.status(500).json({error:err.message}));
//   });