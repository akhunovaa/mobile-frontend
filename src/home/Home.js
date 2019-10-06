import React, {Component} from 'react';
import './Home.css';
import LoginForm from '../home/LoginForm';

class Home extends Component {

    state = {};

    render() {
        if(this.props.authenticated) {
            return  <div className={"main"}>

            </div>;
        }else {
            return (
                <div className={"main"}>
                    <LoginForm {...this.props} />
                </div>
            )
        }

    }
}

export default Home;