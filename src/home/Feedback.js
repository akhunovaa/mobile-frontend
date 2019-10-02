import React, {Component} from 'react';
import './Home.css';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import logo from '../img/logo.jpg';

class Feedback extends Component {

    state = {};

    render() {
        return (
            <div className={"main"}>
                <Grid className={"login-form"} textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                    <Grid.Column className="grid-column">
                        <Header as='h2' color='teal' textAlign='center'>
                            <Image src={logo} /> Форма обратной связи
                        </Header>
                        <Form size='large'>
                            <Segment stacked>
                                <Form.Input fluid icon='user' iconPosition='left' placeholder='Имя' />
                                <Form.Input fluid icon='mail' iconPosition='left' placeholder='E-mail' />
                                <Form.Input fluid icon='phone' iconPosition='left' placeholder='Телефон' />
                                <Form.TextArea fluid placeholder='Ваше сообщение' />
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