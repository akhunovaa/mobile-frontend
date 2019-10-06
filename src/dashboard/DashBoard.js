import React, {Component} from 'react';

class DashBoard extends Component {

    state = {
        authenticated: false,
        currentUser: {
            name: '',
            email: '',
            phone: '',
            message: '',
            captchaToken: ''
        }
    };

    constructor(props) {

        super(props);

        this.state = {
            authenticated: this.props.authenticated
        };

        if(this.props.currentUser){
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

        return (
            <div className={"main"}>
                <p>Hello, {this.state.currentUser.name}</p>
            </div>
        )
    }
}

export default DashBoard;