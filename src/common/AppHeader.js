import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import './AppHeader.css';
import logo from '../img/logo.jpg';

class AppHeader extends Component {
    render() {
        return (
            <div id="header">
                <div className="header-center">
                    <a href="/">
                        <img src={logo} className="logo" alt='RuSberbank.ru logo picture'/>
                    </a>
                            {this.props.authenticated ? (
                                <div>
                                    {/*<a style={{float: 'right'}} onClick={this.props.onLogout}>ВЫЙТИ</a>*/}
                                    {/*<NavLink style={{float: 'right'}} to="/profile">ПРОФИЛЬ</NavLink>*/}
                                    {/*<li><NavLink to="/feedback">ОБРАТНАЯ СВЯЗЬ</NavLink></li>*/}
                                    {/*<li><a href="#">КОНТАКТЫ</a></li>*/}
                                    <NavLink style={{float: 'right', marginTop: '25px', paddingRight: '20px'}} to="/signup"><a style={{float: 'right', color: '#00b5ad'}} onClick={this.props.onLogout}>ВЫЙТИ</a></NavLink>
                                    <NavLink style={{float: 'right', marginTop: '25px', paddingRight: '20px', color: '#00b5ad'}} to="/feedback">ОБРАТНАЯ СВЯЗЬ</NavLink>
                                </div>
                            ) : (
                                <div>
                                    <NavLink style={{float: 'right', marginTop: '25px', paddingRight: '20px', color: '#00b5ad'}} to="/feedback">ОБРАТНАЯ СВЯЗЬ</NavLink>
                                    <NavLink style={{float: 'right', marginTop: '25px', paddingRight: '20px', color: '#00b5ad'}} to="/signup">РЕГИСТРАЦИЯ</NavLink>
                                </div>
                            )}

                </div>
            </div>
        )
    }
}

export default AppHeader;
