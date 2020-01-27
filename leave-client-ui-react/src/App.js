import React from 'react';
import './App.css';
import NavbarPage from "./component/Navbar";
import Test from "./component/Test";
import ListView from "./component/ListView";
import CreateForm from "./component/CreateForm";
import Lol from "./component/Lol";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Detail from "./component/Detail";
import Edit from "./component/Edit";

function App() {
  return (
    <div className="App">



      <Router>
        <NavbarPage/>
        <hr/>
        <Switch>

          <Route path='/' exact={true} component={ListView}/>

          <Route path='/view' exact={true} component={ListView}/>
          <Route path='/create' component={CreateForm}/>
          <Route path='/detail/:leaveid' component={Detail}/>
          <Route path='/edit/:leaveid' component={Edit}/>
          <Route path='/delete/' component={ListView}/>
        </Switch>
      </Router>


    </div>
  );
}

export default App;
