import React, { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import useGlobalReducer from "../hooks/useGlobalReducer"

export const Login = () => {
	const { dispatch } = useGlobalReducer()
	const navigate = useNavigate()
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [error, setError] = useState("")
	const [loading, setLoading] = useState(false)

	const handleSubmit = async (e) => {
		e.preventDefault()
		setError("")
		setLoading(true)

		try {
			const backendUrl = import.meta.env.VITE_BACKEND_URL
			const response = await fetch(backendUrl + "/api/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, password }),
			})
			const data = await response.json()

			if (!response.ok) {
				throw new Error(data.message || "Invalid credentials")
			}

			sessionStorage.setItem("token", data.token)
			sessionStorage.setItem("user", JSON.stringify(data.user))

			dispatch({ type: "set_token", payload: data.token })
			dispatch({ type: "set_user", payload: data.user })
			navigate("/private")
		} catch (err) {
			setError(err.message)
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="container d-flex justify-content-center mt-5">
			<div className="card p-4" style={{ width: "400px" }}>
				<h2 className="text-center mb-4">Log In</h2>
				{error && <div className="alert alert-danger">{error}</div>}
				<form onSubmit={handleSubmit}>
					<div className="mb-3">
						<label htmlFor="email" className="form-label">Email</label>
						<input
							type="email"
							className="form-control"
							id="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</div>
					<div className="mb-3">
						<label htmlFor="password" className="form-label">Password</label>
						<input
							type="password"
							className="form-control"
							id="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</div>
					<button type="submit" className="btn btn-primary w-100" disabled={loading}>
						{loading ? "Logging in..." : "Log In"}
					</button>
				</form>
				<p className="text-center mt-3 mb-0">
					Don't have an account? <Link to="/signup">Sign up</Link>
				</p>
			</div>
		</div>
	)
}
