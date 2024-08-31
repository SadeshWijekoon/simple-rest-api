const express = require('express');
const router = express.Router();
const uuid = require('uuid');
let users = require('../../users');

// get all users 
router.get('/',(req,res)=>{
   res.json(users);
})
// get users by id 
router.get('/:id',(req,res)=>{
   // const found = users.some(users=>users.id === parseInt(req.params.id))
   const found = users.find(users=>users.id === parseInt(req.params.id))
   if (found){
      // res.json(users.find(user=>user.id===parseInt(req.params.id)))
      res.json(found);
   } else{
      res.sendStatus(400);
   }
})
// create a new user 
router.post('/',(req,res)=>{
  const newUser = {
   id:uuid.v4(),
   name:req.body.name,
   email:req.body.email,
  }

  if(! newUser.name || ! newUser.email){
   return res.sendStatus(400)
  }else{
   users.push(newUser)
   res.json(users)
  }

  // update a user
  router.put('/:id', (req, res) => {
   const userId = parseInt(req.params.id); // Parse the ID from URL
   const user = users.find(user => user.id === userId); // Find the user by ID

   if (user) {
       // Update user properties if they are provided in req.body
       if (req.body.name) user.name = req.body.name;
       if (req.body.email) user.email = req.body.email;

       // Send the updated user data as a response
       res.json(user);
   } else {
       // Send a 404 status code if user is not found
       res.sendStatus(404);
   }
});

 // delect a user

 router.delete('/:id',(req,res)=>{
   const found = users.findIndex(user=>user.id===parseInt(req.params.id))
   if (found){
      users.splice(found,1)
      res.json(users)
   }else {
      res.sendStatus(404)
   }
 })
})

module.exports =router;