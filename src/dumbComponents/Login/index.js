import React from "react"
import Cookies from "js-cookie"
import Container from "components/Login/index"
import "./index.css"

class Login extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			username: "",
			password: "",
			error: false,
		}
		this.username = React.createRef()
		this.password = React.createRef()
	}
	componentDidMount() {
		//reacthelmet code
	}
	onClickLogin = () => {
		const { username, password} = this.state
		//make the api call to login dispatch fro login

		if(!username || !password) {
			this.setState({
				error: true,
			})
			return
		}
		const { history, login } = this.props
		login({
			username,
			password,
		})
		history.push("/dashboard")
	}
	render() {
		console.log("props in Login", this.props)
		const { error } = this.state
		return (
			<div className="login-container">
				<input 
					ref={this.username}
					className="username"
					type="text"
					placeholder="username"
					onChange={(event) => {this.setState({
						username: event.target.value
					})}}
				/>
				<input 
					ref={this.password}
					className="password"
					type="password"
					placeholder="password"
					onChange={(event) => {this.setState({
						password: event.target.value
					})}}
				/>
				<button onClick={this.onClickLogin} className="lg-btn">LOGIN</button>
				{error && <span>Please fill the mandatory fields</span>}
			</div>
		)
	}
}
export default Container(Login)