import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./redux/reducer.js";
import {Provider} from "react-redux";

const store = configureStore({
    reducer: rootReducer,
});

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<Provider store={store}>
            <BrowserRouter>
                <App />
                <Toaster
                    toastOptions={{
                        className: "",
                        style: {
                            // backgroundColor: '#01285F',
                            backgroundColor: "white",
                            // color: 'white',
                            color: "black",
                            marginTop: 20,
                            // transform: translateX(70)
                        },
                    }}
                />
            </BrowserRouter>
        </Provider>
	</StrictMode>
);