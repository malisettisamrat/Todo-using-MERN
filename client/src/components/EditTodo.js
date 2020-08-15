import React, {Component} from 'react';
import axios from 'axios';
import '../App.css'

export default class EditTodo extends Component {
    constructor(props) {
        super(props);

        this.onChangetodoDescription = this.onChangetodoDescription.bind(this);
        this.onChangetodoResponsible = this.onChangetodoResponsible.bind(this);
        this.onChangetodoPriority = this.onChangetodoPriority.bind(this);
        this.onChangetodoCompleted = this.onChangetodoCompleted.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            todo_description : '',
            todo_responsible : '',
            todo_priority : '',
            todo_completed : false
        }

    }

    abortController = new AbortController();

    componentDidMount() {
        axios.get('http://localhost:4000/todos/'+this.props.match.params.id, { signal : this.abortController.signal })
            .then(res => {
                this.setState({
                    todo_description : res.data.todo_description,
                    todo_responsible : res.data.todo_responsible,
                    todo_priority : res.data.todo_priority,
                    todo_completed : res.data.todo_completed
                })
            })
            .catch(err => console.log(err))
    }

    onChangetodoDescription(e) {
        this.setState({
            todo_description : e.target.value
        });
    }

    onChangetodoResponsible(e) {
        this.setState({
            todo_responsible : e.target.value
        })
    }

    onChangetodoPriority(e) {
        this.setState({
            todo_priority : e.target.value
        })
    }

    onChangetodoCompleted(e) {
        this.setState({
            todo_completed : !this.state.todo_completed
        });
    }

    onSubmit(e) {
        e.preventDefault()
        console.log(this.state.todo_priority);
        const obj = {
            todo_description : this.state.todo_description,
            todo_responsible : this.state.todo_responsible,
            todo_priority : this.state.todo_priority,
            todo_completed : this.state.todo_completed
        }

        axios.post('http://localhost:4000/todos/update/'+this.props.match.params.id, obj)
            .then(res => console.log('Update'));

        this.props.history.push('/');
    }

    render() {
        return (
            <div>
                <h3 style={{ marginTop : 20 }}>Edit Todo</h3>
                <form onSubmit={this.onSubmit} style={{ marginTop : 20 }}>

                    <div className="form-group">
                        <label>Description</label>
                        <input type="text" className="form-control" value={this.state.todo_description} onChange={this.onChangetodoDescription} ></input>
                    </div>

                    <div className="form-group">
                        <label>Responsible</label>
                        <input type="text" className="form-control" value={this.state.todo_responsible} onChange={this.onChangetodoResponsible} ></input>
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

                    <div className="form-check">
                        <input type="checkbox" 
                                className="form-check-input"
                                id="completedCheckbox"
                                name="completedCheckbox"
                                onChange={this.onChangetodoCompleted}
                                checked={this.state.todo_completed}
                                value = {this.state.todo_completed}
                        />
                        <label className="form-check-label" htmlFor="completedCheckbox">Completed</label>
                    </div>

                    <br/>

                    <div className="form-group" >
                        <input type="submit" className="btn btn-primary" value="Update"/>
                    </div>

                </form>
            </div>
        )
    }
}