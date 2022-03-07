import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import store from './redux/store';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import LandingPage from './components/LandingPage';
import AddManagerPage from './components/AddManagerPage';
import AddDriverPage from './components/AddDriverPage';
import AdminLinksPage from './components/AdminLinksPage';
import PassengerLinksPage from './components/PassengerLinksPage';
import BusstopsPage from './pages/BusstopsPage';
import ZonesPage from './pages/ZonesPage';
import RoutesPage from './pages/RoutesPage';
import BusesPage from './pages/BusesPage';
import RequestRidePage from './components/RequestRidePage';
import MyRidesPage from './components/MyRidesPage';
// Protected route should have token. If not, login.
// const ProtectedRoute = ({ isAllowed, ...props }) => (
//   isAllowed
//     ? <Route {...props} />
//     : <Redirect to="/login" />
// );

// const hasToken = store.getState().user.accessToken;

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/admin" component={AdminLinksPage} />
        <Route exact path="/passenger" component={PassengerLinksPage} />
        <Route exact path="/passenger/request-ride" component={RequestRidePage} />
        <Route exact path="/passenger/my-rides" component={MyRidesPage} />
        <Route exact path="/admin/add-manager" component={AddManagerPage} />
        <Route exact path="/admin/add-driver" component={AddDriverPage} />
        <Route exact path="/admin/add-busstop" component={BusstopsPage} />
        <Route exact path="/admin/add-zone" component={ZonesPage} />
        <Route exact path="/admin/add-route" component={RoutesPage} />
        <Route exact path="/admin/add-bus" component={BusesPage} />
        {/* <ProtectedRoute isAllowed={hasToken} exact path="/" component={App} /> */}
      </Switch>
    </Router>
  );
};

export default Routes
