import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import NotFound from '../common/NotFound';
import Home from '../home/Home';
import LoadingIndicator from '../common/LoadingIndicator';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authenticated: false,
            currentUser: null,
            loading: false
        };
    }

    render() {
        if (this.state.loading) {
            return <LoadingIndicator/>
        }

        return (
            <div>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route component={NotFound}/>
                </Switch>
                <Alert stack={{limit: 3}}
                       timeout={3000}
                       position='top-right' effect='slide' offset={65}/>
            </div>
        );
    }
}

export default App;