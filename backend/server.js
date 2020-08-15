const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const todoRoutes = express.Router();
const cors = require('cors')
const path = require('path')

let Todo = require('./model');

const PORT = 4000;

const app = express();

app.use(cors());

app.use(bodyParser.json());

// DB Connection
mongoose.connect('mongodb+srv://sam:sam123@cluster0.l4ojj.mongodb.net/merntodo?retryWrites=true&w=majority', () => {
    console.log('Connected to DB')
});

// MiddleWare

app.use('/todos', todoRoutes);


if(process.env.NODE_ENV === 'production') {

    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile()path.resolve
    })

}


//END POINTS

todoRoutes.route('/').get(function(req, res) {
    Todo.find(function(err, todos) {
        if(err)
            console.log(err);
        else
            res.json(todos);
    })
})

todoRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Todo.findById(id, function(err, todo) {
        res.json(todo);
    });
})

todoRoutes.route('/add').post(function(req, res){
    let todo = new Todo(req.body);
    todo.save()
        .then(todo => {
            res.status(200).json({'todo' : 'Todo added'});
        })
        .catch(err => {
            res.status(400).send('adding failed');
        })
})

todoRoutes.route('/update/:id').post(function(req, res) {
    Todo.findById(req.params.id, function(err, todo) {
        if(!todo)
            res.status(404).send('data is not found');
        else
            todo.todo_description = req.body.todo_description;
            todo.todo_responsible = req.body.todo_responsible;
            todo.todo_prirority = req.body.todo_prirority;
            todo.todo_completed = req.body.todo_completed;

        todo.save().then(todo => {
            res.json('Todo updated');
        })
        .catch(err => {
            res.status(400).send('Update Not Possible');
        })
    })
})

app.use('/todos', todoRoutes);

app.listen(PORT,  function() {
    console.log(`Server Running at : ${PORT}`)
})