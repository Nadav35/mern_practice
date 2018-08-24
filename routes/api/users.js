const express = require("express");
const bcrypt = require('bcryptjs');
const User = require('../../models/User');


const router = express.Router();


router.get("/test", (req, res) => res.json({
    msg: "This is the users route"
}));

router.post('/register', (req, res) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        return res.status(400).json({ email: "Gotta choose a unique email" });
      } else {
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password
        });
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
              
          }
        });
      }
    });
});

module.exports = router;