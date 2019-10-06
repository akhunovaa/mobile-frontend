import React, {Component} from 'react';

class DashBoard extends Component {

    state = {};

    render() {

        return (
            <div className={"main"}>
                <p>Hello, {this.props.currentUser.login}</p>
            </div>
        )
    }
}

export default DashBoard;