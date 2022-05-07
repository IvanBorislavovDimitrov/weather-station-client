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
import AddPowerPlug from "./component/add-power-plug";
import EditRaspberry from "./component/edit-raspberry";
import EditPowerPlug from "./component/edit-power-plug";
import DeletePowerPlug from "./component/delete-power-plug";
import EditAnomalyDetectionRule from "./component/edit-anomaly-detection-rule";
import DeleteAnomalyDetectionRule from "./component/delete-anomaly-detection-rule";
import UpdateUserRoles from "./component/update-user-roles";
import DeleteUser from "./component/delete-users";

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
        <Route path="/power-plug/add/" component={AddPowerPlug} />
        <Route path="/raspberry/edit/" component={EditRaspberry} />
        <Route path="/power-plug/edit/" component={EditPowerPlug} />
        <Route path="/power-plug/delete/" component={DeletePowerPlug} />
        <Route path="/anomaly/edit/" component={EditAnomalyDetectionRule} />
        <Route path="/anomaly/delete/" component={DeleteAnomalyDetectionRule} />
        <Route exact path="/admin/update-roles/" component={UpdateUserRoles} />
        <Route exact path="/admin/delete-user/" component={DeleteUser} />

      </Switch>
    </BrowserRouter>
  );

}

export default App;
