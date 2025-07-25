// neccessory imports for the app 
require("dotenv").config()
const express = require("express")
const cors = require("cors")
const bcrypt = require("bcrypt")
const router = require("./routes/index")

// declaring port and configuring backend service

const PORT = process.env.PORT || 5000
const app = express()
const uri = process.env.MONGODB_URL;

// initializing mongodb database
const mongoose = require("mongoose")
mongoose.connect(uri)
    .then(() => console.log("your connection with database successful"))
    .catch(err => console.log("An occured while connecting with database ", err))



// using express services 

app.use(cors())
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }));
  app.use(router)



//   initiating admin account 

const createAdmin  = async ( ) => {

  const User = require('./models/UserSchema');
  // const bcrypt = require("bcrypt");
  // const checkUser = await User.findOne({ email: "admin@example.com" });
  try{
    const checkUser = await User.findOne( {role: "admin"} )
    const hashPassword = await bcrypt.hash(process.env.ADMIN_ACCESS, 10);
    
    if(!checkUser) {
      const user = new User({
        name: "Admin",
        email: "admin@admin.com",
        password: hashPassword,
        role: "admin"
      });

      await user.save();
      console.log("admin created succesfully ", user.name, user.email)

    }else{
      console.log("admin already exists", checkUser);
    }
  }catch(err) {
    console.log("error", err);
  }
}




//   getting the app run 

  app.get("/", (req, res) => {
    res.status(200).send("you are currenlty at the backend service for beneficiary web app made by Abdul Hannan")
})
  app.listen(PORT, () => {
    createAdmin()
    console.log(`server is running on pot ${PORT}`)
  })