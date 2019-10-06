import React, {Component} from 'react';
import './Home.css';
import LoginForm from '../home/LoginForm';
import {Redirect} from "react-router";

class Home extends Component {

    state = {};

    render() {

        if(this.props.authenticated) {
            return <Redirect
                to={{
                    pathname: "/dashboard",
                    state: { from: this.props.location }
                }}/>;
        }

        return (
                <div className={"main"}>
                    <LoginForm {...this.props} />
                </div>
        )
                }
        }

export default Home;