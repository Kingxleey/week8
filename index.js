const express = require ("express")
const PORT = 2000;
const user = require ("./USer.js");
const app = express ();
const mongoose = require ("mongoose");
const Database = "mongodb+srv://admin:admin@cluster0.fflhve9.mongodb.net/TestTD?retryWrites=true&w=majority"
app.use(express.json());
app.post('/signup', async(req, res) =>
{
    const reqBody = req.body;
    console.log(reqBody, req.body);
    const user = new User (reqBody);
    console.log (user);
    await user.save();
    return res.status(200).send(user);
})
app.put ('/update', async (req, res) =>
{
const findUser = await user. findById(req.body.id);
findUser.name = req.body.name;
findUser.email = req.body.email;
findUser.password = req.body.password;
await findUser.save ();

return res.status(201).send(findUser);
})
app.post("/login", async(req,res) =>
{
const {email, password} = req.body;
const user = await User.findOne ({email, password});
if (!user) return res.status (404).send("user not found");
return res.status (200).send(user);
})

const startServer = async() =>
{
try {
    mongoose.connect(Database)
    console.log ("connected to the database")
    
app.listen(PORT,() => 
{
    console.log (`server is running on port ${PORT}`);
})
}


   catch(error) {
    console.log("error")
   }
}

startServer();


