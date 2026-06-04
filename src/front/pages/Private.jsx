import React from "react"
import { Navigate } from "react-router-dom"
import useGlobalReducer from "../hooks/useGlobalReducer"

export const Private = () => {
	const { store } = useGlobalReducer()

	if (!store.token) {
		return <Navigate to="/login" replace />
	}

	return (
		<div className="container text-center mt-5">
			<h1 className="display-4">Private Page</h1>
			<p className="lead">Welcome, {store.user?.email || "user"}!</p>
			<p>You are logged in. This content is only visible to authenticated users.</p>
		</div>
	)
}
