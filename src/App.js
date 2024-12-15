import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import GoogleSheetsComponent from "./components/datepicker";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" Component={GoogleSheetsComponent} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
