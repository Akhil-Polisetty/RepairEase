// app.post('/getprofile', (req, res) => {
//     // const email_cookie = Cookies.get("email");
//     // if (!email_cookie) {
//     //   console.log("cookie not found");
//     //   return res.status(400).json("Email cookie not found");
//     // }
//       // const email_cookie = Cookies.get('email')
//       // console.log("the cookie is ",email_cookie)
//       // console.log("email at getusering is ",email_glob)
//       const {email_id}=req.body;
//       console.log("entered server usering")
//       console.log("email is ",email_id);
  
//       RuserModel.findOne({ email_id:email_id})
//       .then(usering => {
//         if (usering) {
//           console.log(usering)
//           res.json(usering);
//         } else {
//           res.status(404).json("User not found");
//         }
//       })
//       .catch(err => res.status(500).json({ error: err.message }));
//   });