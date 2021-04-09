import logo from './logo.svg';
import './App.css';
import Backstretch from './assets/images/backstretch.jpg';

import LoginForm from './components/forms/LoginFormComponent';
import CategoryView from './views/CategoryView';
import CategoryEnter from './views/CategoryEnter';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Sidenav from './components/sidenav';
import Home from './pages/Home';
import Contacts from './pages/Contacts';
import Tags from './pages/Tags';
import Campaign from './pages/Campaign';
import Editor from './pages/campaign/Editor'
import Emailcompaign from './pages/campaign/Emailcompaign'
import Createcampaign from './pages/campaign/Createcampaign'




import Index from './pages/Index';
import sidenav from './components/sidenav';
import Login from './views/Login';
import Register from './views/Register';

import Images from './components/Images';
import Filter from './components/Filter';

import PrivateRoute from './routing/PrivateRoute';
import setAuthToken from './utils/setAuthToken';
import { ToastProvider } from "react-toast-notifications";
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  return (
    <ToastProvider>
      <Router>
        <Switch>
        <Route exact path="/Login" component={Login} />
        <Route exact path="/Register" component={Register} />
        <Route exact path="/category" component={CategoryView} />
        <Route exact path="/categoryenter" component={CategoryEnter} />
        
        <PrivateRoute exact path="/editor" component={Editor} />
          <Sidenav>
          <PrivateRoute exact path="/" component={Home} />
            <PrivateRoute exact path="/home" component={Home} />
            <PrivateRoute exact path="/contacts" component={Contacts} />
            <PrivateRoute exact path="/tags" component={Tags} />
            <PrivateRoute exact path="/emailcampaign" component={Emailcompaign} />
            <PrivateRoute exact path="/createcampaign" component={Createcampaign} />


            <PrivateRoute exact path="/campaign" component={Campaign} />
            <PrivateRoute exact path="/filter" component={Filter} />

          </Sidenav>
         
        </Switch>
      </Router>
      </ToastProvider>
  );
}

export default App;
