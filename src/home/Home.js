import React, {Component} from 'react';
import './Home.css';
import {Header, Grid, Button, Segment, Menu, Tab, Icon} from "semantic-ui-react";
import {dataListGet} from "../util/APIUtils";
import Alert from 'react-s-alert';

class Home extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            dataList: []
        };

    }

    componentDidMount() {
        this._isMounted = true;
        console.log(this.state.dataList);
        if (this.state.dataList.length > 0) return;
        dataListGet()
            .then(response => {
                if (this._isMounted) {
                    this.setState({
                        dataList : response.response
                    });
                    console.log(response.response);
                }
            }).catch(error => {
            this.setState({
                loading: false
            });
            Alert.error('Ошибка получения списка проектов' || (error && error.message));
        });
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {


        const Devices = ({items}) => (
            <>
                {
                    items.map(item => (
                        <Grid.Column key={item.device_id}>
                            <Segment>
                                <div className='device-cell-container'>
                                    <div className='device-cell-header'>
                                        <Header sub floated='left'>
                                            <Header.Content>
                                                {item.model_name}
                                            </Header.Content>
                                        </Header>
                                    </div>
                                    <div className='device-cell-update-body'>
                                        {item.os_version ? item.os_version : <span>&emsp;</span>}
                                        <br/>
                                        {item.ip_address ? item.ip_address : <span>&emsp;</span>}
                                        <br/>
                                        {item.mac_address ? item.mac_address : <span>&emsp;</span>}
                                    </div>
                                </div>
                            </Segment>
                        </Grid.Column>
                    ))}
            </>
        );

        return (
            <div className={"main"}>
                <div className="tools-header">
                    <Header as='h1' floated={'left'} textAlign={'left'} size={'tiny'}>
                        <Header.Content>
                            Главная страница
                            <Header.Subheader>Инструмент по сбору и анализу Wi-Fi сетей</Header.Subheader>
                        </Header.Content>
                    </Header>
                </div>
                <div style={{ height: '140vh' }}>
                    {
                        this.state.dataList.length === 0 ? (
                            <label>Данные отстутствуют</label>
                        ) : (
                            <Grid columns='3' stackable>
                                <Devices items={this.state.dataList}/>
                            </Grid>
                        )
                    }

                </div>
            </div>
        )
    }
}

export default Home;