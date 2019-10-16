import React, {Component} from 'react';
import './Home.css';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import logo from '../img/logo.jpg';
import { Redirect } from 'react-router-dom'
import { ReCaptcha } from 'react-recaptcha-google'
import { signup } from '../util/APIUtils';
import Alert from 'react-s-alert';

class SignUp extends Component {

    state = {};

    render() {
        if(this.props.authenticated) {
            return <Redirect
                to={{
                    pathname: "/",
                    state: { from: this.props.location }
                }}/>;
        }
        return (
            <div className={"main"}>
                <SignUpForm {...this.props} />
            </div>
        )
    }
}
class SignUpForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: '',
            email: '',
            password: '',
            captchaToken: ''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onLoadRecaptcha = this.onLoadRecaptcha.bind(this);
        this.verifyCallback = this.verifyCallback.bind(this);
    }

    componentDidMount() {
        if (this.captcha) {
            this.captcha.reset();
        }
    }
    onLoadRecaptcha() {
        if (this.captcha) {
            this.captcha.reset();
        }
    }

    verifyCallback(recaptchaToken) {
        this.setState({
            captchaToken : recaptchaToken
        })
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

        const signUpRequest = Object.assign({}, this.state);
        if (signUpRequest.captchaToken != null){
            signup(signUpRequest)
                .then(response => {
                    Alert.success("Вы успешно зарегистрировались! Пожалуйста авторизуйтесь заново.");
                    this.onLoadRecaptcha();
                    this.props.history.push("/");
                }).catch(error => {
                Alert.error((error && error.message) || 'Что-то пошло не так! Попробуйте заново.');
            });
        }

    }

    render() {
        return (
            <Grid className={"login-form"} textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                <Grid.Column className="grid-column">
                    <Header as='h2' color='teal' textAlign='center'>
                        <Image src={logo} /> Регистрация
                    </Header>
                    <Form onSubmit={this.handleSubmit} size='large'>
                        <Segment stacked>
                            <Form.Input fluid icon='user' iconPosition='left' placeholder='Login' name="login" onChange={this.handleInputChange} required/>
                            <Form.Input fluid icon='mail' iconPosition='left' placeholder='E-mail' name="email" onChange={this.handleInputChange} required/>
                            <Form.Input name="password"
                                fluid
                                icon='lock'
                                iconPosition='left'
                                placeholder='Пароль'
                                type='password'
                                required
                                onChange={this.handleInputChange}
                            />
                            <ReCaptcha
                                ref={(el) => {this.captcha = el;}}
                                size="normal"
                                data-theme="light"
                                render="explicit"
                                sitekey="6LeulZwUAAAAAA07OHdhKen90gZauyUDCBe8GDEn"
                                onloadCallback={this.onLoadRecaptcha}
                                verifyCallback={this.verifyCallback}
                                hl="ru"
                            />
                            <Button color='teal' fluid size='large'>
                                Зарегистрироваться
                            </Button>
                        </Segment>
                    </Form>
                    <Message>
                        Уже зарегистрированы? <a href='/'>Авторизоваться!!</a>
                    </Message>
                    <Message>
                        Данный ресурс представлен в рамках Хакатона <b>«Лучший по профессии».</b> <i>Задача №10.</i>
                    </Message>
                </Grid.Column>
            </Grid>
        );
    }
}

export default SignUp;