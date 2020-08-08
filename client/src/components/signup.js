import React from 'react';
import { NavLink } from 'react-router-dom';

class Signup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name:"",
            username:"",
            password:"",
        }
        this.send = this.send.bind(this);
        this.handleChanges = this.handleChanges.bind(this);
    }

    handleChanges(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    send(e) {
        e.preventDefault(); //prevent from to refresh
        const { name , username, password } = this.state; //destruct employee;
        if (name && username && password) //check fields before sending data
            this.props.onAuth({name , username, password});
        else
           this.props.onAuth(false)

    }

    render() {

        const {name, username , password} = this.state;

        return (
            <div className="form">
                <header><h2>XYZ</h2></header>
                <section>
                    <form onSubmit={this.send}>
                        <input
                            name="name"
                            placeholder="Name"
                            onChange = {this.handleChanges}
                            value={name}
                            maxLength={12}
                            spellCheck={false}
                        />
                         <input
                            name="username"
                            placeholder="Username"
                            onChange = {this.handleChanges}
                            value={username}
                            maxLength={50}
                            spellCheck={false}
                        />
                        <input
                            name="password"
                            type="password"
                            placeholder="Password"
                            onChange = {this.handleChanges}
                            value={password}
                            maxLength={50}
                            spellCheck={false}
                        />

                        <button type="submit">SIGNUP</button>
                    </form>

                    <p>Already a user ?
                            <NavLink className="link" exact to="/"> Login</NavLink>
                        </p>

        <p className="error">{this.props.error}</p>
                </section>

                {/*Footer*/}
                <footer>
                    <h4>XYZ</h4>
                    <ul type="none">

                        <li>About me</li>
                        <li>Help</li>
                        <li>Report Bug</li>
                        <li>Api</li>
                        <li>Contact</li>
                    </ul>
                </footer>
            </div>
        )
    }
}

export default Signup;