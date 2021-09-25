import SmoothScroll from "smooth-scroll";
import "./App.css";
import { Route,Switch } from "react-router";
import Home from "./components/Home/Home";
import DashboardRoute from './components/PrivetRoutes/DashboardRoute'
import DashBoard from './components/DashBoard/DashBoard'
import DashBoardAdmin from './components/DashboardAdmin/DashBoardAdmin'
export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const App = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <DashboardRoute path="/dashboard" component={DashBoard} />
      <DashboardRoute path="/dashboardadmin" component={DashBoardAdmin} />
    </Switch>
    // <ServicesOrdered/>
  );
};

export default App;
