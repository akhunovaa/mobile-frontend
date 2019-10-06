import React, {Component} from 'react';
import {Header, Grid} from "semantic-ui-react";


class DashBoard extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div className={"main"}>
                <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                    <Grid.Column className="grid-column">
                        <Header as='h2' color='teal' textAlign='center'>
                           Добро пожаловать {this.props.currentUser.name}
                        </Header>
                    </Grid.Column>
                </Grid>

            </div>
        )
    }
}

export default DashBoard;