import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import './AppHeader.css';
import logo from '../img/logo.jpg';

class AppHeader extends Component {
    render() {
        return (
            <div className="header">
                <div className="header-center">
                    <a href="/">
                        <img src={logo} className="logo" alt='RuSberbank.ru logo picture'/>
                    </a>
                    <ul>
                        <div className="header-right" >
                            {this.props.authenticated ? (
                                <div>
                                    <a style={{float: 'right'}} onClick={this.props.onLogout}>ВЫЙТИ</a>
                                    <NavLink style={{float: 'right'}} to="/profile">ПРОФИЛЬ</NavLink>
                                    <li><NavLink to="/feedback">ОБРАТНАЯ СВЯЗЬ</NavLink></li>
                                    <li><a href="#">КОНТАКТЫ</a></li>
                                </div>
                            ) : (
                                <div>
                                    <NavLink style={{float: 'right'}} to="/signup">РЕГИСТРАЦИЯ</NavLink>
                                    <NavLink style={{float: 'right'}} to="/login">ВХОД</NavLink>
                                    <li><NavLink to="/feedback">ОБРАТНАЯ СВЯЗЬ</NavLink></li>
                                    <li><a href="#">КОНТАКТЫ</a></li>
                                </div>
                            )}
                        </div>

                    </ul>
                </div>
            </div>
        )
    }
}

export default AppHeader;
