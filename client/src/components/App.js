import React from 'react';
import {Route, Switch} from "react-router-dom";
import About from "./about";
import Login from "./registerlogin";
function App() {
  return (
    <div>
     <Switch>
       <Route path="/about" component={About} />
       <Route path="/login" component={Login} /> 
     </Switch>
    </div>
  );
}

export default App;
