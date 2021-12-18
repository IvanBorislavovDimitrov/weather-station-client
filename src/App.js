import './App.css';
import { BrowserRouter, Route, Switch, Link, Redirect } from "react-router-dom";
import Navbar from "./component/navbar";
import UserRegister from "./component/register";
import UserLogin from "./component/login";
import AddRaspberry from "./component/add-raspberry";
import MyRaspberries from "./component/my-raspberries";
import RaspberryCharts from "./component/raspberry-charts";
import UserActivation from "./component/user-activation";

function App() {
  setTimeout(function () {
    localStorage.clear();
  }, (24 * 60 * 60 * 1000));

  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/register" component={UserRegister} />
        <Route exact path="/login" component={UserLogin} />
        <Route exact path="/add-raspberry" component={AddRaspberry} />
        <Route exact path="/my-raspberries" component={MyRaspberries} />
        <Route path="/raspberry/chart/" component={RaspberryCharts} />
        <Route path="/user/activate/" component={UserActivation} />

      </Switch>
    </BrowserRouter>
  );

}

export default App;
