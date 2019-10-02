import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import NotFound from '../common/NotFound';
import Home from '../home/Home';
import LoadingIndicator from '../common/LoadingIndicator';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import './App.css';
import AppHeader from '../common/AppHeader';
import AppFooter from '../common/AppFooter';
import MobileAppHeader from "../common/mobile/MobileAppHeader";
import MobileAppFooter from "../common/mobile/MobileAppFooter";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            authenticated: false,
            currentUser: null,
            loading: false,
            width: window.innerWidth
        };

        this.loadCurrentlyLoggedInUser = this.loadCurrentlyLoggedInUser.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    loadCurrentlyLoggedInUser() {
        // this.setState({
        //     loading: true
        // });

        // getCurrentUser()
        //     .then(response => {
        //         this.setState({
        //             currentUser: response,
        //             authenticated: true,
        //             loading: false
        //         });
        //     }).catch(error => {
        //     this.setState({
        //         loading: false
        //     });
        // });
    }

    handleLogout() {
        //localStorage.removeItem(ACCESS_TOKEN);
        this.setState({
            authenticated: false,
            currentUser: null
        });
        Alert.success("Вы удачно покинули сессию.");
    }

    componentDidMount() {
        //loadReCaptcha();
        this.loadCurrentlyLoggedInUser();
    }

    componentWillMount() {
        window.addEventListener('resize', this.handleWindowSizeChange);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowSizeChange);
    }

    handleWindowSizeChange = () => {
        this.setState({ width: window.innerWidth });
    };

    render() {

        const { width } = this.state;
        const isMobile = width <= 500;

        if (this.state.loading) {
            return <LoadingIndicator/>
        }

        if (isMobile) {
            return (
                <div>
                    <MobileAppHeader authenticated={this.state.authenticated}/>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route component={NotFound}/>
                    </Switch>
                    <MobileAppFooter authenticated={this.state.authenticated}/>
                    <Alert stack={{limit: 3}}
                           timeout={3000}
                           position='top-right' effect='slide' offset={65}/>
                </div>
            );
        }else {
            return (
                <div>
                    <AppHeader authenticated={this.state.authenticated}/>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route component={NotFound}/>
                    </Switch>
                    <AppFooter authenticated={this.state.authenticated}/>
                    <Alert stack={{limit: 3}}
                           timeout={3000}
                           position='top-right' effect='slide' offset={65}/>
                </div>
            );
        }

    }
}

export default App;