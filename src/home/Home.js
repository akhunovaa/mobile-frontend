import React, {Component} from 'react';
import './Home.css';
import LoginForm from '../home/LoginForm';
import {Redirect} from "react-router";

class Home extends Component {

    state = {
        authenticated: false
    };

    constructor(props) {

        super(props);

        this.state = {
            authenticated: this.props.authenticated
        };
    }

    render() {
        console.log("AUTH:")
        console.log(this.state.authenticated)
        if(this.state.authenticated) {
            return <Redirect
                to={{
                    pathname: "/dashboard",
                    state: { from: this.props.location }
                }}/>;
        }else {
            console.log("LOGIN:")
            console.log(this.state.authenticated)
            return (
                <div className={"main"}>
                    <LoginForm {...this.props} />
                </div>
            )
        }
    }
}


export default Home;