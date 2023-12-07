const User = require("../Models/User")
const jwt = require("jsonwebtoken")
const nodemailer = require("nodemailer");
const maxAge = 2 * 24 * 60 * 60;
const createToken = (id,role) => {
    return jwt.sign({data:{id,role}}, "sammba yero taharka sow", {
        expiresIn: maxAge,
    })
}
//creation de compte
module.exports.signupUser = async (req, res, next) => {
    const { email, password,name,role } = req.body;
    try {
          const user = await User.signup( email, password, name, role );
          const token = createToken(user._id)
          res.status(200).json({email,token,name})
  }catch(error){
    res.status(400).json({error:error.message})
  }
};
module.exports.loginUser = async (req, res) => {
    const { email, password, role, name } = req.body;
    try {
        const user = await User.login(email, password, name);
        const token = createToken(user._id, user.role);
        res.status(200).json({ email, token, role, name: user.name });
        
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
module.exports.sendmail=async(req,res,next)=>{
    const { email,firstname,lastname, pays} = req.body;
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });
        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: "Sending Email With React And Nodejs",
            html: `
            <!DOCTYPE html>
<html lang="en" >
<head>
  <meta charset="UTF-8">
  <title>CodePen - OTP Email Template</title>
  <style>
  tfoot {
    background-color: #3f87a6;
    color: #fff;
  }
  
  tbody {
    background-color: #e4f0f5;
  }
  
  caption {
    padding: 10px;
    caption-side: bottom;
  }
  
  table {
    border-collapse: collapse;
    border: 2px solid rgb(200, 200, 200);
    letter-spacing: 1px;
    font-family: sans-serif;
    font-size: 0.8rem;
  }
  
  td,
  th {
    border: 1px solid rgb(190, 190, 190);
    padding: 5px 10px;
  }
  
  td {
    text-align: center;
  }
  
  </style>
</head>
<body>
<table>
  <tbody>
  <tr>
  <th scope="row">Email</th>
  <td>${email}</td>
</tr>
    <tr>
      <th scope="row">Firstname</th>
      <td>${firstname}</td>
    </tr>
    <tr>
      <th scope="row">LastName</th>
      <td>${lastname}</td>
    </tr>
    <tr>
    <th scope="row">Regions</th>
    <td>${pays}</td>
  </tr>
  </tbody>
</table>
</body>
</html>`,
 
  
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log("Error" + error)
            } else {
                console.log("Email sent:" + info.response);
                res.status(201).json({status:201,info})
            }
        })
    } catch (error) {
        console.log("Error" + error);
        res.status(401).json({status:401,error})
    }
};


