import React, {Component} from 'react';
import axios from 'axios';

export default class CreateTodo extends Component {

    constructor(props) {
        super(props);

        this.onChangetodoDescription = this.onChangetodoDescription.bind(this);
        this.onChangetodoResponsible = this.onChangetodoResponsible.bind(this);
        this.onChangetodoPriority = this.onChangetodoPriority.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            todo_description: '',
            todo_responsible: '',
            todo_priority: '',
            todo_completed: false
        }
    }

    onChangetodoDescription(e){
        this.setState({
            todo_description: e.target.value
        })
    }

    onChangetodoPriority(e){
        this.setState({
            todo_priority: e.target.value
        })
    }

    onChangetodoResponsible(e){
        this.setState({
            todo_responsible: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();

        // onsubmit logic
        console.log(`form submitted`);
        console.log(`Todo Desc : ${this.state.todo_description}`);

        const newTodo = {
            todo_description: this.state.todo_description,
            todo_responsible: this.state.todo_responsible,
            todo_priority: this.state.todo_priority,
            todo_completed: this.state.todo_completed
        }

        axios.post('http://localhost:4000/todos/add', newTodo)
            .then(res => console.log(res.data));

        this.setState({
            todo_description: '',
            todo_responsible: '',
            todo_priority: '',
            todo_completed: false
        })

        this.props.history.push('/');

    }

    render() {
        return (
            <div style={{marginTop : 20}}>
                <h3> Create a Todo </h3>
                <form onSubmit={this.onSubmit} >

                    <div className="form-group" >
                        <label>Description :</label>
                        <input className="form-control" type="text" value={this.state.todo_description} onChange={this.onChangetodoDescription} />
                    </div>

                    <div className="form-group">
                        <label> Responsible : </label>
                        <input className="form-control" type="text" value={this.state.todo_responsible} onChange={this.onChangetodoResponsible} />
                    </div>

                    <div className="form-group">
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="priorityOptions" id="priorityLow" value="Low" checked={this.state.todo_priority === 'Low'} onChange={this.onChangetodoPriority} />
                            <label className="form-check-label">Low</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="priorityOptions" id="priorityMedium" value="Medium" checked={this.state.todo_priority === 'Medium'} onChange={this.onChangetodoPriority} />
                            <label className="form-check-label">Medium</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="priorityOptions" id="priorityHigh" value="High" checked={this.state.todo_priority === 'High'} onChange={this.onChangetodoPriority} />
                            <label className="form-check-label">High</label>
                        </div>
                    </div>

                    <div className="form-group" >
                        <input type="submit" className="btn btn-primary" value="Create" />
                    </div>

                </form>
            </div>
        )
    }
}