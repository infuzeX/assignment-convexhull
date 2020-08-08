import React from 'react';
import axios from 'axios';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';

import Login from '../components/login';
import Signup from '../components/signup';
import Products from '../components/product';
import { ProtectedRoute } from './proRoute';


class Authentication extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isAuth: false,
            error: ""
        }

        this.onAuth = this.onAuth.bind(this);
        this.onLogout = this.onLogout.bind(this);
    }

    //handle both login / register
    onAuth(credential) {

        if (!credential) {
            this.setState({ error: "Empty Field" });
            return;
        }
        const { history } = this.props;
        const pathname = history.location.pathname;
        const path = (pathname === '/') ? '/login' : pathname;
        axios.post(`/api/employee${path}`, credential)

            .then(res => res.data)
            .then(res => {
                const { success, data } = res;
                if (success) {
                    this.setState({ error: "" });
                    this.setState({ isAuth: success });
                    return history.push('/products', true)
                } else {
                    this.setState({ error: data });
                }
            })
    }

    onLogout(){
        console.log("clicked");
        const {history} = this.props;
        this.setState({isAuth:false})
        return history.push('/' , true);
    }

    render() {

        return (<Switch>
            {/*Login Route*/}
            <Route exact path="/"
                render={() => <Login onAuth={this.onAuth} error={this.state.error} />}
            />
            {/*Register route*/}
            <Route exact path="/register"
                render={() => <Signup onAuth={this.onAuth} error={this.state.error} />}
            />

            {/*authorized route*/}
            <ProtectedRoute to="/" {...this.props} render={() => {
                if (this.state.isAuth)
                    return <Products logout={this.onLogout}/>
                else
                    return <Redirect to="/" from="/products" />
            }}
            />
        </Switch>);
    }
}

export default withRouter(Authentication);