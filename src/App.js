import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Todos from './components/Todos';
import Header from './components/layout/Header';
import AddTodo from './components/AddTodo';
import About from './components/pages/About';
import uuid from 'uuid';
import axios from 'axios';
import './App.css';

class App extends Component {
  state={
    things: [
      {
        id:uuid.v4(),
        title: "Meeting with boss",
        completed:false

      },
     
      {
        id:uuid.v4(),
        title:"Hit the gym",
        completed:false
      }
    ]
  }
  /*componentDidMount() {
		axios
			.get('https://jsonplaceholder.typicode.com/todos?_limit=10')
			.then((res) => this.setState({ things: res.data }));
	}*/
  //Toggle complete
  markComplete=(id)=>{
    this.setState({things:this.state.things.map(todo=>{
      if(todo.id===id){
      todo.completed=!todo.completed
    }
    return todo;
    })});
  }  
  //Delete todo
  delTodo=(id)=>{
    axios
			.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
			.then((res) =>
				this.setState({
					things: [...this.state.things.filter((todo) => todo.id !== id)]
				})
			);

  }
  // Add Todo
	addTodo = (title) => {
    axios
    .post('https://jsonplaceholder.typicode.com/todos', {
      title,
      completed: false
    })
    .then((res) => {
      res.data.id = uuid.v4();
      this.setState({ things: [...this.state.things, res.data] });
    });
	};
  render() { 
  return (
    
    <Router>
      <div className="App">
        <p className="link"> <Link style={{color:'#fff'}} to="/">Home</Link>|<Link style={{color:'#fff'}} to="/about">About</Link></p>
      <div className="container">
      <Header/>
      
      <Route
							exact
							path='/'
							render={(props) => (
								<React.Fragment>
      <AddTodo addTodo={this.addTodo}/>
      <ul>
       
      <Todos things={this.state.things} markComplete={this.markComplete}
      delTodo={this.delTodo}/>
     
      </ul>
      </React.Fragment>
      )}
      />
     <Route path='/about' component={About}/>
      </div>
      
    </div>
   
    </Router>
   );
 } 
}



export default App;
