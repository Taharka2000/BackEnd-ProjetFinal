const User = require("../Models/User")
const jwt = require("jsonwebtoken")
const maxAge = 2 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, process.env.SECRET, {
        expiresIn: maxAge,
    })
}
const handleErrors = (err) => {
    let errors = { email: "", password: "" ,};
    if (err.message === "incorrect Email"){
        errors.email = "That Email is not registered";
    }
        
    if (err.message === "incorrect password"){
        errors.password = "That password is incorrect";
    }
        
    if (err.code === 11000) {
        errors.email = "Email already registered";
        return errors;
    }
    if (err.message.includes("Users validation failed")) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }
    return errors;
};

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


module.exports.loginUser=async(req,res)=>{
    const {email,password,name}=req.body
    try{
        const user=await User.login(email,password,name);
        const token=createToken(user._id)
        res.status(200).json({email,token})
        } catch(error){
            res.status(400).json({error:error.message})
        }
}
