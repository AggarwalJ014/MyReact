import React from 'react';
import axios from 'axios';
import { emails } from './emails';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            password: '',
            apiData: [],
            dataErrorMessage: '',
            errorMessage: ''
        }
    }

    componentDidMount() {
        const url = window.location.origin + '/data.json'
        axios.get(url).then(res => {
            let data = res.data;
            let dataArr = [];
            for (const key in data) {
                if (Object.hasOwnProperty.call(data, key)) {
                    dataArr.push(data[key]);
                }
            }
            this.setState({
                apiData: dataArr
            })
        }).catch(err => {
            this.setState({
                errorMessage: err.message
            })
        })
    }

    handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            [name]: value,
            errorMessage: ''
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let val = this.state.apiData.findIndex(it => (it.username === this.state.userName && it.password === this.state.password));
        if (val != -1) {
            localStorage.setItem('isLoggedIn', this.state.userName);
            this.props.history.push('/dashboard');

        } else {
            localStorage.setItem('isLoggedIn', null);
            this.setState({
                errorMessage: 'UserName & Password notx found !'
            })
        }
    }

    render() {
        return (
            <div className='container fluid'>
                <form onSubmit={this.handleSubmit}>
                    <div className='form-group'>
                        <label htmlFor="userName">User Name</label><br />
                        <input onChange={this.handleChange} className='form-control' value={this.state.userName} required type="email" id="userName" name="userName" /><br />
                    </div>
                    <div className='form-group'>
                        <label htmlFor="password">Password</label><br />
                        <input type="password" className='form-control' onChange={this.handleChange} required id="password" value={this.state.password} name="password" /><br />
                    </div>

                    <button className='btn btn-primary' type="submit">Login</button>
                    <div>{this.state.errorMessage}</div>
                </form>
            </div>
        )
    }
}

export default Login;