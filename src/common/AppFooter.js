import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {CircleArrow as ScrollUpButton} from "react-scroll-up-button";
import './AppFooter.css';

class AppFooter extends Component {
    render() {
        return (
            <div id="footer">
                {this.props.authenticated ? (
                        <div id="footer-center">
                            <ul>
                                <li><NavLink to="/feedback">ОБРАТНАЯ СВЯЗЬ</NavLink></li>
                                <li><a href="/contacts">КОНТАКТЫ</a></li>
                                <NavLink style={{float: 'right'}} to="/profile">ПРОФИЛЬ</NavLink>
                                <a style={{float: 'right'}} onClick={this.props.onLogout}>ВЫЙТИ</a>

                            </ul>
                        </div>
                ) : (
                        <div id="footer-center">
                            <ul>
                                <li><NavLink to="/feedback">ОБРАТНАЯ СВЯЗЬ</NavLink></li>
                                <li><a href="/contacts">КОНТАКТЫ</a></li>
                                <NavLink style={{float: 'right'}} to="/signup">РЕГИСТРАЦИЯ</NavLink>
                            </ul>
                        </div>
                )}
                <ScrollUpButton EasingType="easeOutCubic"/>
            </div>
        )
    }
}

export default AppFooter;
