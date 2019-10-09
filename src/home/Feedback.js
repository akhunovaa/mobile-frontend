import React, {Component} from 'react';
import './Home.css';
import { Button, Form, Grid, Header, Image, Segment } from 'semantic-ui-react'
import logo from '../img/logo.jpg';
import Alert from "react-s-alert";
import {feedback} from '../util/APIUtils';
import { ReCaptcha } from 'react-recaptcha-google'

class Feedback extends Component {

    constructor(props) {

        super(props);

        this.state = {
            name: '',
            email: '',
            phone: '',
            message: '',
            captchaToken: ''
        };

        if(this.props.currentUser){
            const fullName = this.props.currentUser.surname + ' ' + this.props.currentUser.name + ' ' + this.props.currentUser.patrName;
            this.state = {
                name: fullName,
                email: this.props.currentUser.email,
                phone: this.props.currentUser.phone,
                message: '',
                captchaToken: ''
            };
        }

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



    handleSubmit(event) {
        event.preventDefault();

        const feedbackRequest = Object.assign({}, this.state);
        if (feedbackRequest.message.length >= 3000){
            Alert.warning('Слишком длинное сообщение! Попробуйте заново.');
        }

        if (feedbackRequest.name.length >= 300){
            Alert.warning('Слишком длинное сообщение! Попробуйте заново.');
        }

        if (feedbackRequest.phone.length >= 300){
            Alert.warning('Слишком длинное сообщение! Попробуйте заново.');
        }

        if (feedbackRequest.email.length >= 300){
            Alert.warning('Слишком длинное сообщение! Попробуйте заново.');
        }
        if (feedbackRequest.captchaToken !== ""){
            feedback(feedbackRequest).then(response => {
                Alert.success("Сообщение успешно отправлено '" + response.message + "'");
                this.onLoadRecaptcha();
                this.props.history.push("/");
            }).catch(error => {
                Alert.error((error && error.message) || 'Что-то пошло не так! Попробуйте заново.');
            });
        }
    }


    handleInputChange(event) {
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;
        this.setState({
            [inputName] : inputValue
        });
    }

    render() {
        return (
            <div className={"main"}>
                <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                    <Grid.Column className="grid-column">
                        <Header as='h2' color='teal' textAlign='center'>
                            <Image src={logo} /> Форма обратной связи
                        </Header>
                        <Form onSubmit={this.handleSubmit} size='large'>
                            <Segment stacked>
                                <Form.Input fluid icon='user' iconPosition='left' placeholder='Имя' name="name" onChange={this.handleInputChange} required />
                                <Form.Input fluid icon='mail' iconPosition='left' placeholder='E-mail' name="email" onChange={this.handleInputChange} required />
                                <Form.Input fluid icon='phone' iconPosition='left' placeholder='Телефон' name="phone" onChange={this.handleInputChange} required />
                                <Form.TextArea placeholder='Ваше сообщение' name="message" onChange={this.handleInputChange} required />
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
                                    Отправить
                                </Button>
                            </Segment>
                        </Form>
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}

export default Feedback;