import React, {Component} from 'react';
import './Home.css';
import {Header, Grid} from "semantic-ui-react";

class Home extends Component {

    state = {};

    render() {

        return (
            <div className={"main"}>
                <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                    <Grid.Column className="grid-column">
                        <Header as='h2' color='teal' textAlign='center'>
                            Добро пожаловать {this.state.currentUser.name}
                        </Header>
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}

export default Home;