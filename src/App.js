import './App.css';
import { BrowserRouter, Route, Switch, Link, Redirect } from "react-router-dom";
import Navbar from "./component/navbar";
import UserRegister from "./component/register";
import UserLogin from "./component/login";
import AddRaspberry from "./component/add-raspberry";
import MyRaspberries from "./component/my-raspberries";
import RaspberryCharts from "./component/raspberry-charts";
import UserActivation from "./component/user-activation";
import AddAnomalyDetectionRule from "./component/add-anomaly-detection-rule";
import RaspberryAnomalies from "./component/raspberry-anomalies";
import Landing from "./component/landing";
import MyPowerPlugs from "./component/my-power-plugs";

function App() {
  setTimeout(function () {
    localStorage.clear();
  }, (24 * 60 * 60 * 1000));

  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
      <Route exact path="/" component={Landing} />
        <Route exact path="/register" component={UserRegister} />
        <Route exact path="/login" component={UserLogin} />
        <Route exact path="/add-raspberry" component={AddRaspberry} />
        <Route exact path="/my-raspberries" component={MyRaspberries} />
        <Route path="/raspberry/chart/" component={RaspberryCharts} />
        <Route path="/user/activate/" component={UserActivation} />
        <Route path="/detection/raspberry/" component={AddAnomalyDetectionRule} />
        <Route path="/anomalies/raspberry/" component={RaspberryAnomalies} />
        <Route path="/raspberry/power-plugs/" component={MyPowerPlugs} />

      </Switch>
    </BrowserRouter>
  );

}

export default App;
