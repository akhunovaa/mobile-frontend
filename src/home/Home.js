import React, {Component} from 'react';
import './Home.css';
import {Header, Grid, Button, Segment, Modal, Container, Table} from "semantic-ui-react";
import {dataListGet} from "../util/APIUtils";
import Alert from 'react-s-alert';

class Home extends Component {

    _isMounted = false;

    currentDeviceId = React.createRef();

    constructor(props) {
        super(props);
        this.state = {
            dataList: [],
            deviceDeleteModal: false,
            deviceInfoModal: false,
            deviceInfoModalClose: true,
            deviceDeleteModalClose: true,
            targetDeviceId:'',
        };

        this.closeDeviceInfoModal = this.closeDeviceInfoModal.bind(this);
        this.closeDeviceDeleteModal = this.closeDeviceDeleteModal.bind(this);
        this.deviceDelete = this.deviceDelete.bind(this);
        this.showDeviceDeleteModal = this.showDeviceDeleteModal.bind(this);
        this.showDeviceInfoModal = this.showDeviceInfoModal.bind(this);
    }


    closeDeviceDeleteModal() {
        this.setState({deviceDeleteModalClose: true, deviceDeleteModal: false});
    }

    closeDeviceInfoModal() {
        this.setState({deviceInfoModalClose: true, deviceInfoModal: false});
    }

    showDeviceInfoModal(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        const deviceId = data.get('deviceId');
        this.setState({deviceInfoModalClose: false, deviceInfoModal: true, targetDeviceId: deviceId});
    }

    showDeviceDeleteModal(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        const deviceId = data.get('deviceId');
        this.setState({deviceDeleteModalClose: false, deviceDeleteModal: true, targetDeviceId: deviceId});
    }


    componentDidMount() {
        this._isMounted = true;
        if (this.state.dataList.length > 0) return;
        dataListGet()
            .then(response => {
                if (this._isMounted) {
                    this.setState({
                        dataList : response.response
                    });
                }
            }).catch(error => {
            this.setState({
                loading: false
            });
            Alert.error('Ошибка получения списка проектов' || (error && error.message));
        });
    }

    deviceDelete(event) {
        event.preventDefault();
        if (!this.state.targetDeviceId) {
            return
        }
        const deviceDeleteRequest = Object.assign({}, {
            'id': this.state.targetDeviceId
        });
        this.closeDeviceDeleteModal();
        // deviceDeleteRequestSend(projectDeleteRequest)
        //     .then(response => {
        //         if (response.error) {
        //             Alert.warning(response.error + '. Необходимо заново авторизоваться.');
        //         }else if (response.success === false) {
        //             Alert.warning(response.message);
        //         } else {
        //             this.reload();
        //             Alert.success('Проект  "' + response.project.name + '" успешно удален');
        //         }
        //     }).catch(error => {
        //     console.log(error)
        // });
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
                                        <div className="status-activity">
                                            <label style={{marginRight: '12px'}}>Время: {item.created ? new Date(item.created).toLocaleString() : 'неизвестно'}</label>
                                        </div>
                                        <div className="status-activity">
                                            <label style={{marginRight: '12px'}}>Устройство: {item.model_name}</label>
                                        </div>
                                        <div className="status-activity">
                                            <label style={{marginRight: '12px'}}>ОС: {item.os_version}</label>
                                        </div>
                                        <div className="status-activity">
                                            <label>IP:  {item.ip_address}</label>
                                        </div>
                                        <div className="status-activity">
                                            <label style={{marginRight: '12px'}}>MAC: {item.mac_address}</label>
                                        </div>
                                    </div>
                                    <div className='device-cell-body'>
                                        <form onSubmit={this.showDeviceInfoModal}>
                                            <input ref={this.currentDeviceId} id="deviceId" name="deviceId" type="hidden" value={item.device_id}/>
                                            <Button  color='vk' icon="info"
                                                    content='Подробнее'/>
                                        </form>
                                        <Button disabled basic icon="wifi"
                                                content={item.wifi_data.length}/>
                                        <form onSubmit={this.showDeviceDeleteModal}>
                                            <input ref={this.currentDeviceId} id="deviceId" name="deviceId" type="hidden" value={item.device_id}/>
                                            <Button negative basic icon="trash" content='Удалить'/>
                                        </form>
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
                    <Header as='h1'  style={{height: '50px'}} floated={'left'} textAlign={'left'} size={'tiny'}>
                        <Header.Content>
                            <Header.Subheader style={{height: '50px'}}>Инструмент по сбору и анализу Wi-Fi сетей</Header.Subheader>
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

                <Modal open={this.state.deviceInfoModal} onClose={this.closeDeviceInfoModal} dimmer="blurring"
                       size="tiny" className="device-modal-conf">
                    <Modal.Header className="modal-header">Информация о полученных данных с устрйства</Modal.Header>
                    <Modal.Content className="modal-content">
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
                        </Table>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button
                            color='vk'
                            content="Закрыть"
                            onClick={this.closeDeviceInfoModal}
                        />
                    </Modal.Actions>
                </Modal>

                <Modal  open={this.state.deviceDeleteModal} onClose={this.closeDeviceDeleteModal} dimmer="blurring"
                        size="tiny" className="device-modal-conf-delete">
                    <Modal.Header className="modal-header">Удалить устройство</Modal.Header>
                    <Modal.Content>
                        <Container className="modal-container">
                            <p>
                                Вы уверены что хотите удалить данное устройство?
                            </p>
                        </Container>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button
                            color='vk'
                            content="Отменить"
                            onClick={this.closeDeviceDeleteModal}
                        />
                        <Button
                            className="menu-update"
                            negative
                            content="Удалить"
                            onClick={this.deviceDelete}
                        />
                    </Modal.Actions>
                </Modal>
            </div>
        )
    }
}

export default Home;