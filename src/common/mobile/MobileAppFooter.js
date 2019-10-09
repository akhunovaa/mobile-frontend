import React, {Component} from 'react';
import './MobileAppFooter.css';
import {NavLink} from "react-router-dom";
import {CircleArrow as ScrollUpButton} from "react-scroll-up-button";

class MobileAppFooter extends Component {
    render() {
        return (
            <div id="footer_container">
                <div id="telegram">
                    <svg className="footer_background">
                        <rect id="footer_background" rx="0" ry="0" x="0" y="0" width="500" height="297">
                        </rect>
                    </svg>
                </div>
                <div id="write_button">
                    <svg className="Path_7_A0_Path_11" viewBox="0 0 242.047 47">
                        <path id="Path_7_A0_Path_11"
                              d="M 0 0 L 242.0473327636719 0 L 242.0473327636719 47 L 0 47 L 0 0 Z">
                        </path>
                    </svg>
                    <div id="____________">
                        <NavLink to="/feedback" style={{color: 'rgba(80, 77, 77, 0.8)'}}>
                            <span>Написать нам</span>
                        </NavLink>
                    </div>
                </div>
                <ScrollUpButton EasingType="easeOutCubic"/>
            </div>
        )
    }
}

export default MobileAppFooter;
