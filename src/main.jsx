import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./Route/Route.jsx";
import { Provider, useDispatch } from "react-redux";
import { store } from "./redux/Store.js";


ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<Provider store={store}>
			<RouterProvider router={router}>
				{/* <App /> */}
			</RouterProvider>
		</Provider>
	</React.StrictMode>
);
