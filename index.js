import express from 'express';
import 'dotenv/config';     


const app = express();
const port  = process.env.PORT || 3000;



app.use(express.json());


let teaData = []
let nextID = 1;
app.post('/teas',(req,res)=>{
    const {name, price} = req.body // req.body is the object sent by the client in the request body
    const newTea = {id: nextID++, name, price}
    teaData.push(newTea)// push the new tea object to the teaData array
    // res.status(201).json(newTea) // send the new tea object as a response with status code 201 (Created) in JSON format
    res.status(201).send(newTea) // send the new tea object as a response with status code 201 (Created) in JSON format

})

app.get('/teas',(req,res)=>{
    res.status(200).send(teaData) // send the teaData array as a response in JSON format
})

app.get('/teas/:id',(req,res)=>{
    const tea = teaData.find(t => t.id === parseInt(req.params.id)) // find the tea object in the teaData array that matches the id parameter in the request URL

    //parseInt used to convert the id parameter from a string to an integer, since req.params.id is a string by default and we need to compare it with the id property of the tea objects which are integers
    if (!tea) {
        res.status(404).send({error: 'Tea not found'})
    } else {
        res.status(200).send(tea) // send the found tea object as a response in JSON format
    }
})

//update a tea by id
app.put('/teas/:id',(req,res)=>{
   
    const tea = teaData.find(t => t.id === parseInt(req.params.id)) // find the tea object in the teaData array that matches the id parameter in the request URL

    if (!tea) {
        res.status(404).send({error: 'Tea not found'})
    } 
    const {name, price} = req.body // req.body is the object sent by the client in the request body
    tea.name = name;
    tea.price = price;
    res.status(200).send(tea) // send the updated tea object as a response in JSON format
})

// delete a tea by id
app.delete('/teas/:id',(req,res)=>{
    const tea = teaData.findIndex(t => t.id === parseInt(req.params.id)) // find the index of the tea object in the teaData array that matches the id parameter in the request URL
    if (tea === -1) {
        res.status(404).send({error: 'Tea not found'})
    }
    teaData.splice(tea,1) // remove the tea object from the teaData array using the splice method
    res.status(204).send('deleted') // send a response with status code 204 (No Content) to indicate that the tea has been successfully deleted
})




app.listen(port,()=>{
    console.log(`Server is running on port ${port}...`);
});