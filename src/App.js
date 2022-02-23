import "./App.css";
import { Switch, Route } from "react-router-dom";
import Home from "./pages/home";
import AddUser from "./pages/addUser";
import EditUser from "./pages/editUser";
function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/addUser" component={AddUser} />
        <Route exact path="/EditUser/:id" component={EditUser} />
      </Switch>
    </div>
  );
}

export default App;
