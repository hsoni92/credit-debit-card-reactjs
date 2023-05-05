import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import TaskWidget from './Components/TaskWidget/TaskWidget';
import NeoCreditCard from './Components/NeoCreditCard/NeoCreditCard';
import Grid from '@material-ui/core/Grid';
import './App.css';

class App extends Component {
    state = {
        cardNumber: "000 090 1234 6258",
        validThru: "01/09",
        cvv: "076",
        loading: true
    };

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                loading: false
            });
        }, 700);
    }


    render() {
        const { loading, cardNumber, validThru, cvv } = this.state;
        const xs = 8;
        const sm = 8;
        const md = 4;
        const lg = 3;
        const xl = 3;

        let components = [
            {
                path: "/components/taskwidget",
                el: (
                    <Grid className="outer-grid-container" container justify="center" spacing={2}>
                        <Grid item xs={10} sm={10} md={10} lg={10} xl={10}>
                            <Grid container justify="center" spacing={4}>
                                <Grid item xs={xs} sm={sm} md={md} lg={lg} xl={xl}>
                                    <TaskWidget type="success" percentage={45}
                                        progressInfo="Deploying Containers 11/20"
                                        duration="12h"
                                        title="JS001" />
                                </Grid>
                                <Grid item xs={xs} sm={sm} md={md} lg={lg} xl={xl}>
                                    <TaskWidget type="error" percentage={55}
                                        duration="0h"
                                        progressInfo="Failed to deploy containers 9/20" title="JE002" />
                                </Grid>
                                <Grid item xs={xs} sm={sm} md={md} lg={lg} xl={xl}>
                                    <TaskWidget type="warning" percentage={65}
                                        duration="17h"
                                        progressInfo="Failed to cleanup stale containers 1/20" title="JW003" />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                )
            },
            {
                path: "/components/neo",
                el: (
                    <NeoCreditCard
                        type="visa"
                        className={loading ? "hidden" : ""}
                        holderName="HDesign In"
                        cardNumber={cardNumber}
                        validThru={validThru}
                        cvv={cvv} />
                )
            }
        ];
        components.unshift({
            path: "/",
            el: <div>{ components.map(item => <div><a href={item.path}>{item.path}</a></div>) }</div>
        })

        const routerMappedComponents = () => {
            return components.map(item => (
                <Route exact path={item.path}
                    render={() => item.el}></Route>
            ));
        }

        return (
            <>
                <Router>
                    <Switch>
                        {routerMappedComponents()}
                    </Switch>
                </Router>
            </>
        );
    }
}

export default App;