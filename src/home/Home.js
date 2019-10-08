import React, {Component} from 'react';
import './Home.css';
import {Header, Grid, Table, Segment, Menu, Tab, Icon} from "semantic-ui-react";
import LoadingIndicator from "../app/App";
import {dataListGet} from "../util/APIUtils";
import Alert from 'react-s-alert';

class Home extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            dataList: []
        };

    }

    componentDidMount() {
        this._isMounted = true;
        if (!this.state.response) return;
        this.setState({
            loading: true
        });
        console.log("data get")
        dataListGet()
            .then(response => {
                console.log(response.response)
                if (this._isMounted) {
                    this.setState({
                        dataList : response.response,
                        loading: false
                    });
                }
            }).catch(error => {
            this.setState({
                loading: false
            });
            Alert.error('Ошибка получения списка проектов' || (error && error.message));
        });
    }

    UNSAFE_componentWillMount() {
        this._isMounted = false;
    }

    render() {
        if (this.state.loading) {
            return <LoadingIndicator/>
        }
        const panes = ([
            { menuItem: 'Nokia', render: () => <Tab.Pane>Tab 1 Content</Tab.Pane> },
            { menuItem: 'Motorolla', render: () => <Tab.Pane>Tab 2 Content</Tab.Pane> },
            { menuItem: 'iPhone', render: () => <Tab.Pane>
                    <Table celled>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>SSID</Table.HeaderCell>
                                <Table.HeaderCell>BSSID</Table.HeaderCell>
                                <Table.HeaderCell>CHANNEL</Table.HeaderCell>
                                <Table.HeaderCell>RSSI</Table.HeaderCell>
                                <Table.HeaderCell>CC</Table.HeaderCell>
                                <Table.HeaderCell>SECURITY</Table.HeaderCell>
                                <Table.HeaderCell>CREATED TIME</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            <Table.Row>
                                <Table.Cell>Sberbank-Guest</Table.Cell>
                                <Table.Cell>34:a8:4e:1f:19:7f</Table.Cell>
                                <Table.Cell>64</Table.Cell>
                                <Table.Cell>-81</Table.Cell>
                                <Table.Cell>RU</Table.Cell>
                                <Table.Cell>NONE</Table.Cell>
                                <Table.Cell>2019-10-07 13:26:33</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>SBRF_HighQuality</Table.Cell>
                                <Table.Cell>34:a8:4e:81:57:7c</Table.Cell>
                                <Table.Cell>44</Table.Cell>
                                <Table.Cell>-61</Table.Cell>
                                <Table.Cell>RU</Table.Cell>
                                <Table.Cell>NONE</Table.Cell>
                                <Table.Cell>2019-10-07 22:22:05</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>Onlime_46</Table.Cell>
                                <Table.Cell>78:96:82:76:35:85</Table.Cell>
                                <Table.Cell>11</Table.Cell>
                                <Table.Cell>-73</Table.Cell>
                                <Table.Cell>RU</Table.Cell>
                                <Table.Cell>WPA2(PSK/AES/AES)</Table.Cell>
                                <Table.Cell>2019-10-07 22:22:05</Table.Cell>
                            </Table.Row>
                        </Table.Body>

                        <Table.Footer>
                            <Table.Row>
                                <Table.HeaderCell colSpan='7'>
                                    <Menu floated='right' pagination>
                                        <Menu.Item as='a' icon>
                                            <Icon name='chevron left' />
                                        </Menu.Item>
                                        <Menu.Item as='a'>1</Menu.Item>
                                        <Menu.Item as='a'>2</Menu.Item>
                                        <Menu.Item as='a' icon>
                                            <Icon name='chevron right' />
                                        </Menu.Item>
                                    </Menu>
                                </Table.HeaderCell>
                            </Table.Row>
                        </Table.Footer>
                    </Table>
               </Tab.Pane> },
            { menuItem: 'Samsung', render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> }
        ]);

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
                    <Tab menu={{ fluid: true, vertical: true, tabular: true }} panes={panes} />
                </div>
            </div>
        )
    }
}

export default Home;