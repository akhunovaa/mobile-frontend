import React, {Component} from 'react';
import './Home.css';


class Home extends Component {

    state = {};

    render() {
        return (
            <div>
                <div id="main_menu">
                    <ul id="sub01">
                        <li><a href="/">ГЛАВНАЯ СТРАНИЦА</a></li>
                        <li><a href="mailto:admin@botmasterzzz.com">ОБРАТНАЯ СВЯЗЬ</a></li>
                        <li><a href="tg://resolve?domain=botmasterzzzrobot">ТЕЛЕГРАММ БОТ</a></li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default Home;