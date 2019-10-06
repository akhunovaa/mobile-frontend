import {login} from "../util/APIUtils";
import {ACCESS_TOKEN} from "../constants";
import Alert from "react-s-alert";
import React, {Component} from 'react';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import logo from "../img/logo.jpg";

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: '',
            password: ''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;

        this.setState({
            [inputName] : inputValue
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        const loginRequest = Object.assign({}, this.state);
        login(loginRequest)
            .then(response => {
                localStorage.setItem(ACCESS_TOKEN, response.accessToken);
                Alert.success("Вы авторизовались в системе!");
                this.props.history.push("/");
                window.location.reload();
            }).catch(error => {
            Alert.error((error && error.message) || 'Что-то пошло не так! Попробуйте заново.');
        });
    }

    render() {
        return (
            <Grid className={"login-form"} textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                <Grid.Column className="grid-column">
                    <Header as='h2' color='teal' textAlign='center'>
                        <Image src={logo} /> Добро пожаловать
                    </Header>
                    <Form size='large' onSubmit={this.handleSubmit}>
                        <Segment stacked>
                            <Form.Input  name="login" fluid icon='user' iconPosition='left' placeholder='E-mail или login' onChange={this.handleInputChange} required/>
                            <Form.Input
                                name="password"
                                fluid
                                icon='lock'
                                iconPosition='left'
                                placeholder='Пароль'
                                type='password' onChange={this.handleInputChange} required
                            />

                            <Button color='teal' fluid size='large'>
                                Войти
                            </Button>
                        </Segment>
                    </Form>
                    <Message>
                        Нет аккаунта? <a href='/signup'>Зарегистрироваться!</a>
                    </Message>
                </Grid.Column>
            </Grid>
        );
    }
}

export default LoginForm;