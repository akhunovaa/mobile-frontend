import React, {Component} from 'react';
import './AppHeader.css';

class AppHeader extends Component {
    render() {
        return (
                <div id="header">
                    <div id="header-center">
                        <a href="/">RuSberbank</a>
                        <ul>
                            <li><a href="#">RU</a></li>
                            <li><a href="#">О ПОРТАЛЕ</a></li>
                        </ul>
                    </div>
                </div>
        )
    }
}

export default AppHeader;
