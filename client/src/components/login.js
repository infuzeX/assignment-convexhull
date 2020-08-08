import React from 'react';
import { NavLink } from 'react-router-dom';

import '../styles/form.css';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            error:""
         }
        this.send = this.send.bind(this);
        this.handleChanges = this.handleChanges.bind(this);
    }


    handleChanges(e) {
        this.setState({ [e.target.name]: e.target.value });
    }


    send(e) {
        e.preventDefault(); //prevent from to refresh
        const { username, password } = this.state; //destruct employee;
        if (username && password) { //check fields before sending data
            this.props.onAuth({ username, password });     
        }
        //if field is empty show error
        else
            this.setState({ error: "Empty field" });
    }

    render() {

        const { username, password } = this.state;

        return (<div className="form">
            <header> <h2>XYZ</h2></header>
            <section>


                <form
                    onSubmit={this.send} >
                    <input
                        name="username"
                        placeholder="Username"
                        onChange={this.handleChanges}
                        value={username}
                        spellCheck={false} />

                    <input
                        name="password"
                        placeholder="Password"
                        type="password"
                        onChange={this.handleChanges}
                        value={password}
                    />
                    <button type="submit">LOGIN</button>
                </form>

                <p> New user ? < NavLink to="/register" className="link" > Signup </NavLink></p>
                <p className="error">{this.props.error}</p>
            </section>

            {/*Footer*/}
            <footer>
                <h4> XYZ </h4>
                <ul type="none" >
                    <li> About me </li>
                    <li> Help </li>
                    <li> Report Bug </li>
                    <li > Api </li>
                    <li > Contact </li>
                </ul>
            </footer>

        </div>
        )
    }
}

export default Login;