import React, {Component} from 'react';
import './Home.css';
import {Container, Grid, Header, Image} from 'semantic-ui-react'
import logo from '../img/logo.jpg';

class Contacts extends Component {

    state = {};

    render() {
        return (
            <div className={"main"}>
                <Grid className={"login-form"} textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                    <Grid.Column className="grid-column">
                        <Header as='h2' color='teal' textAlign='center'>
                            <Image src={logo} /> Контакты для связи
                        </Header>
                        <Container>
                            <p>
                                Телефон: +7 (926) 545-14-52
                            </p>
                            <p>
                                E-mail: admin[@]botmasterzzz.com
                            </p>
                            <p>
                                Website: https://rusberbank.ru
                            </p>
                        </Container>
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}

export default Contacts;