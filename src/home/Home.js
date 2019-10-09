import React, {Component} from 'react';
import './Home.css';
import {Button, Container, Grid, Header, Modal, Segment, Table, Divider} from "semantic-ui-react";
import {dataListGet, deviceDeleteRequestSend} from "../util/APIUtils";
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
            targetDeviceId: '',
            targetDevice: [],
            targetDeviceName: '',
            roleAdmin: this.props.currentUser.role ? this.props.currentUser.role.role_name  === "ROLE_ADMIN" : false
            //roleAdmin: true
        };

        this.closeDeviceInfoModal = this.closeDeviceInfoModal.bind(this);
        this.closeDeviceDeleteModal = this.closeDeviceDeleteModal.bind(this);
        this.deviceDelete = this.deviceDelete.bind(this);
        this.showDeviceDeleteModal = this.showDeviceDeleteModal.bind(this);
        this.showDeviceInfoModal = this.showDeviceInfoModal.bind(this);
        this.reload = this.reload.bind(this);
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
        this.state.dataList.map((i) => {
            if (i.device_id && i.device_id == deviceId) {
                this.setState({
                    targetDevice: i.wifi_data,
                    targetDeviceName: i.model_name
                });
            }
        });
        this.setState({
            deviceInfoModalClose: false,
            deviceInfoModal: true,
            targetDeviceId: deviceId,
        });
    }

    showDeviceDeleteModal(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        const deviceId = data.get('deviceId');
        this.setState({deviceDeleteModalClose: false, deviceDeleteModal: true, targetDeviceId: deviceId});
    }


    componentDidMount(){
        this._isMounted = true;
        if (this.state.dataList.length > 0) return;
        dataListGet(this.state.roleAdmin)
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
        const deviceId = this.state.targetDeviceId;
        this.closeDeviceDeleteModal();
        deviceDeleteRequestSend(deviceId)
            .then(response => {
                if (response.error) {
                    Alert.warning(response.errorMessage + '. Необходимо заново авторизоваться.');
                }else if (response.success === false) {
                    Alert.warning(response.errorMessage);
                } else {
                    this.reload();
                    Alert.success('Устройство успешно удалено');
                }
            }).catch(error => {
            console.log(error)
        });
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    reload (){
        window.location.reload();
    };

    render() {


        const Devices = ({items}) => (
            <>
                {
                    items.map(item => (
                        <Grid.Column key={item.device_id}>
                            <Segment piled raised secondary>
                                <div className='device-cell-container'>
                                    <div className='device-cell-header'>
                                        <div className="status-activity">
                                            <label style={{marginRight: '12px', color: 'green'}}>Пользователь: {item.user.username}</label>
                                        </div>
                                        <div className="status-activity">
                                            <label style={{marginRight: '12px', color: 'green'}}>Email: {item.user.email}</label>
                                        </div>
                                        <Divider />
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
                                            <Button size='small' color='vk' icon="info"
                                                    content='Подробнее'/>
                                        </form>
                                        <Button size='small' disabled basic icon="wifi"
                                                content={item.wifi_data.length}/>
                                        <form onSubmit={this.showDeviceDeleteModal}>
                                            <input ref={this.currentDeviceId} id="deviceId" name="deviceId" type="hidden" value={item.device_id}/>
                                            <Button size='small' negative disabled={!this.state.roleAdmin} basic icon="trash" content='Удалить'/>
                                        </form>
                                    </div>
                                </div>
                            </Segment>
                        </Grid.Column>
                    ))}
            </>
        );

        const Rows = ({items}) => (
            <>
                {
                    items.map(item => (
                        <Table.Row textAlign={'center'} key={item.id}>
                            <Table.Cell>{item.ssid}</Table.Cell>
                            <Table.Cell>{item.bssid}</Table.Cell>
                            <Table.Cell>{item.channel}</Table.Cell>
                            <Table.Cell>{item.rssi}</Table.Cell>
                            <Table.Cell>{item.cc}</Table.Cell>
                            <Table.Cell>{item.security}</Table.Cell>
                            <Table.Cell>{new Date(item.created).toLocaleString()}</Table.Cell>
                        </Table.Row>
                    ))
                }
            </>
        );

        return (
            <div className={"main"}>
                <div className="tools-header">
                    <Header disabled style={{height: 'auto'}} floated={'left'} size={'tiny'}>
                        Инструмент по сбору и анализу Wi-Fi сетей
                    </Header>
                </div>
                <div style={{ height: 'auto', minHeight: '91vh', minWidth: '500px' }}>
                    {
                        this.state.dataList == null && this.state.dataList.length === 0 ? (
                            <label>Данные отстутствуют</label>
                        ) : (
                            <Grid columns='5' stackable>
                                <Devices items={this.state.dataList}/>
                            </Grid>
                        )
                    }

                </div>

                <Modal open={this.state.deviceInfoModal} onClose={this.closeDeviceInfoModal} dimmer="blurring"
                       size="fullscreen" className="device-modal-conf">
                    <Modal.Header className="modal-header">{this.state.targetDeviceName}: сети WiFi</Modal.Header>
                    <Modal.Content className="modal-content">
                        <Table selectable structured textAlign='center' verticalAlign='middle' size='large' celled>
                            <Table.Header>
                                <Table.Row textAlign={'center'} >
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
                                <Rows items={this.state.targetDevice}/>
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

                <Modal basic open={this.state.deviceDeleteModal} onClose={this.closeDeviceDeleteModal} dimmer="blurring"
                        size="fullscreen" className="device-modal-conf-delete">
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