import React from 'react';
import {Loader, Dimmer} from "semantic-ui-react";

export default function LoadingIndicator() {
    return (
        <div className="loading-indicator" style={{display: 'block', textAlign: 'center', marginTop: '30px'}}>
            <Dimmer active inverted>
                <Loader size='large'>Загрузка...</Loader>
            </Dimmer>
        </div>
    );
}