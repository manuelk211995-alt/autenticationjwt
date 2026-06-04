import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {
	const { store, dispatch } = useGlobalReducer()
	const navigate = useNavigate()

	const handleLogout = () => {
		dispatch({ type: "logout" })
		navigate("/login")
	}

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
			<div className="ml-auto d-flex gap-2">
				{store.token ? (
					<>
						<Link to="/private">
							<button className="btn btn-outline-success">Profile</button>
						</Link>
						<button className="btn btn-outline-danger" onClick={handleLogout}>Log Out</button>
					</>
				) : (
					<>
						<Link to="/login">
							<button className="btn btn-outline-primary">Log In</button>
						</Link>
						<Link to="/signup">
							<button className="btn btn-primary">Sign Up</button>
						</Link>
					</>
				)}
				<Link to="/demo">
					<button className="btn btn-secondary">Demo</button>
				</Link>
			</div>
			</div>
		</nav>
	);
};