import React, {Component} from 'react';
import './Home.css';
import LoginForm from '../home/LoginForm';

class Home extends Component {

    constructor(props) {

        super(props);

        if (this.props.currentUser) {
            const fullName = this.props.currentUser.surname + ' ' + this.props.currentUser.name + ' ' + this.props.currentUser.patrName;
            this.state.currentUser = {
                name: fullName,
                email: this.props.currentUser.email,
                phone: this.props.currentUser.phone,
                message: '',
                captchaToken: ''
            };
        }
    }

    render() {
        if (!this.props.authenticated) {
            return <div className={"main"}>
                <LoginForm {...this.props} />
            </div>
        }

        return (
            <div className={"main"}>
                <p>Hello, {this.state.currentUser.name}</p>
            </div>
        )
    }
}

export default Home;