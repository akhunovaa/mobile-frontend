import React, {Component} from 'react';
import './Home.css';
import {Header, Grid} from "semantic-ui-react";
import {NavLink} from "react-router-dom";

class Home extends Component {

    state = {};

    render() {

        if(!this.props.authenticated) {
            return <div className={"main"}>
                <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                    <Grid.Column className="grid-column">
                        <Header as='h2' color='teal' textAlign='center'>
                            Для работы с данным порталом необходима <NavLink to="/login">авторизация</NavLink>
                        </Header>
                    </Grid.Column>
                </Grid>
            </div>
        }

        return (
            <div className={"main"}>
                <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                    <Grid.Column className="grid-column">
                        <Header as='h2' color='teal' textAlign='center'>
                            Добро пожаловать
                        </Header>
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}

export default Home;