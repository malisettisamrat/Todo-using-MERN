import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from'react-router-dom';
import TodoList from './components/TodoList';
import EditTodo from './components/EditTodo';
import CreateTodo from './components/CreateTodo';
import logo from './logo.png';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="/">
                <img src={logo} width="30" height="30" alt="google.com/"/>
            </a>
            <Link to="/" className="navbar-brand"> Todos List </Link>
         
              <ul className="navbar-nav mr-auto">
                <li className="nav-item active"> 
                  <Link to="/" className="nav-link"> Todos</Link> 
                </li>
                <li className="nav-item active"> 
                  <Link to="/create" className="nav-link"> Create Todo </Link> 
                </li>
              </ul>
          </nav>
          <Route exact path="/" component = {TodoList} />
          <Route path = "/edit/:id" component = {EditTodo} />
          <Route path = "/create" component = {CreateTodo} />
        </div>
      </Router>
    );
  }
}

export default App;
