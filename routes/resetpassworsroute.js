const express = require("express");
const app = express();
const router = express.Router();
const bodyparser = require("body-parser"); 
const User = require("../schemas/userSchema");
const bcrypt = require("bcrypt"); 

app.set("view engine","pug");
app.set("views","views");

app.use(bodyparser.urlencoded({extended:false}));

router.get("/reset-password",(req,res,next) =>{
    res.status(200);
} )


router.post('/reset-password', async (req, res) => {
    console.log('Received a reset password request:', req.body);
    const { username, securityQuestion, securityAnswer, newPassword } = req.body;
    try {
      // Find the user based on the provided username and security question
      const user = await User.findOne({ username, securityQuestion, securityAnswer });
  
      if (!user) {
        return res.status(404).send('User not found or security question/answer incorrect');
      }
  
      // Update the user's password with the new password
      user.password = newPassword;
      await user.save();
  
      res.send('Password reset successful.');
    } catch (err) {
      console.error('Error resetting password', err);
      res.status(500).send('An error occurred while resetting the password.');
    }
  });

module.exports = router;