import React, {Component} from 'react';
import './Home.css';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import logo from '../img/logo.jpg';

class SignUp extends Component {

    state = {};

    render() {
        return (
            <div className={"main"}>
                <Grid className={"login-form"} textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                    <Grid.Column className="grid-column">
                        <Header as='h2' color='teal' textAlign='center'>
                            <Image src={logo} /> Регистрация
                        </Header>
                        <Form size='large'>
                            <Segment stacked>
                                <Form.Input fluid icon='user' iconPosition='left' placeholder='Login' />
                                <Form.Input fluid icon='mail' iconPosition='left' placeholder='E-mail' />
                                <Form.Input
                                    fluid
                                    icon='lock'
                                    iconPosition='left'
                                    placeholder='Пароль'
                                    type='password'
                                />
                                <Form.Input
                                    fluid
                                    icon='lock'
                                    iconPosition='left'
                                    placeholder='Повторите пароль'
                                    type='password'
                                />

                                <Button color='teal' fluid size='large'>
                                    Зарегистрироваться
                                </Button>
                            </Segment>
                        </Form>
                        <Message>
                            Уже зарегистрированы? <a href='/'>Авторизоваться!!</a>
                        </Message>
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}

export default SignUp;