import React, {Component} from 'react';
import './Home.css';
import LoginForm from '../home/LoginForm';
import {Redirect} from "react-router";

class Home extends Component {

    render() {
        console.log("AUTH:")
        console.log(this.props.authenticated)
        if(this.props.authenticated) {
            return <Redirect
                to={{
                    pathname: "/dashboard",
                    state: { from: this.props.location }
                }}/>;
        }else {
            console.log("LOGIN:")
            console.log(this.props.authenticated)
            return (
                <div className={"main"}>
                    <LoginForm {...this.props} />
                </div>
            )
        }
    }
}


export default Home;