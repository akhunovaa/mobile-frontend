import React, {Component} from 'react';

class DashBoard extends Component {

    constructor(props) {

        super(props);
    }

    render() {

        return (
            <div className={"main"}>
                <p>Hello, {this.props.currentUser.name}</p>
            </div>
        )
    }
}

export default DashBoard;