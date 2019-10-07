import React, {Component} from 'react';
import './Home.css';
import {Header, Grid, Table, Segment, Menu, Label, Icon} from "semantic-ui-react";

class Home extends Component {

    state = { activeItem: 'iphone' }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {

        const { activeItem } = this.state

        return (
            <div className={"main"}>
                <div className="tools-header">
                    <Header as='h1' floated={'left'} textAlign={'left'} size={'tine'}>
                        <Header.Content>
                            Главная страница
                            <Header.Subheader>Инструмент по сбору и анализу Wi-Fi сетей</Header.Subheader>
                        </Header.Content>
                    </Header>
                </div>
                <Grid style={{ height: '140vh' }}>
                    <Grid.Column width={4}>
                        <Menu fluid vertical tabular>
                            <Menu.Item
                                name='nokia'
                                active={activeItem === 'nokia'}
                                onClick={this.handleItemClick}
                            />
                            <Menu.Item
                                name='motorolla'
                                active={activeItem === 'motorolla'}
                                onClick={this.handleItemClick}
                            />
                            <Menu.Item
                                name='iphone'
                                active={activeItem === 'iphone'}
                                onClick={this.handleItemClick}
                            />
                            <Menu.Item
                                name='samsung'
                                active={activeItem === 'samsung'}
                                onClick={this.handleItemClick}
                            />
                        </Menu>
                    </Grid.Column>

                    <Grid.Column stretched width={12}>
                        <Segment>
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
                        </Segment>
                    </Grid.Column>
                </Grid>
                {/*<Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>*/}
                    {/**/}
                    {/*<Grid.Column className="grid-column">*/}
                        {/*<Header as='h2' color='teal' textAlign='center'>*/}
                            {/*Добро пожаловать*/}
                        {/*</Header>*/}
                    {/*</Grid.Column>*/}
                {/*</Grid>*/}
            </div>
        )
    }
}

export default Home;