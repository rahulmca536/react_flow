import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Sidenav from '../components/sidenav';
import Home from '../pages/Home';
import Contacts from '../pages/Contacts';

function Index() {
    return (
<Sidenav >
          <Router>
<Switch>
<Route exact path="/" component={Home} />

<Route exact path="/contacts" component={Contacts} />
</Switch>
</Router>

</Sidenav>
    )
}

export default Index
