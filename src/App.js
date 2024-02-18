import React, { useState, useEffect } from 'react';
import { get } from 'lodash';
import TaskWidget from './Components/TaskWidget/TaskWidget';
import NeoCreditCard from './Components/NeoCreditCard/NeoCreditCard';
import './App.css';

function TaskWidgetComponent() {
    return (<div style={{ width: '800px', height: '400px', borderRadius: '5px', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#1C1A39' }}>
        <div>
            <TaskWidget
                type="success"
                percentage={45}
                progressInfo="Deploying Containers 11/20"
                duration="12h"
                title="Training Model" />
        </div>
    </div>)
}

function CreditCardComponent() {
    return <NeoCreditCard
        type="visa"
        className={false ? "hidden" : ""}
        holderName="Lorem Ipsum In"
        cardNumber={'9000 1234 5643 67543'}
        validThru={'11/2025'}
        cvv={'008'} />;
}

export default function App() {
    const [queryParams, setQueryParams] = useState({});

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const params = {};

        for (const [key, value] of urlParams.entries()) {
            params[key] = value;
        }
        console.log('qp', params);
        setQueryParams(params);
    }, []);

    const componentList = [
        {
            id: 'taskwidget',
            name: 'Task Widget',
            el: <TaskWidgetComponent />

        },
        {
            id: 'neo',
            name: 'Neumorphic Card',
            el: <CreditCardComponent />
        }
    ];
    const indexEl = (<div>
        {componentList.map(item => <div><a href={`?component=${item.id}`} style={{ display: 'block' }}><div>{item.name}</div></a></div>)}
    </div>);
    componentList.push({
        id: '',
        name: 'Index',
        el: indexEl
    });

    const componentId = get(queryParams, 'component');
    const componentReturned = componentList.find(cl => cl.id === componentId) || {
        id: '',
        name: 'Index',
        el: indexEl
    };
    return componentReturned.el;
}
