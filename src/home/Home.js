import React, {Component} from 'react';
import './Home.css';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import logo from '../img/logo.jpg';

class Home extends Component {

    state = {};

    render() {
        return (
            <div className={"main"}>
                <Grid className={"login-form"} textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                    <Grid.Column className="grid-column">
                        <Header as='h2' color='teal' textAlign='center'>
                            <Image src={logo} /> Добро пожаловать
                        </Header>
                        <Form size='large'>
                            <Segment stacked>
                                <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail или login' />
                                <Form.Input
                                    fluid
                                    icon='lock'
                                    iconPosition='left'
                                    placeholder='Пароль'
                                    type='password'
                                />

                                <Button color='teal' fluid size='large'>
                                    Войти
                                </Button>
                            </Segment>
                        </Form>
                        <Message>
                            Нет аккаунта? <a href='#'>Зарегистрироваться!</a>
                        </Message>
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}

export default Home;