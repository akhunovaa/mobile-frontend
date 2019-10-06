import React, {Component} from 'react';
import './Home.css';
import LoginForm from '../home/LoginForm';

class Home extends Component {

    render() {
        if (!this.props.authenticated) {
            return <div className={"main"}>
                <LoginForm {...this.props} />
            </div>
        }

        return (
            <div className={"main"}>
                <p>Hello, {this.props.currentUser.name}</p>
            </div>
        )
    }
}

export default Home;