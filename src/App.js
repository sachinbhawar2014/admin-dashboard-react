import React, { Suspense } from "react";
import { BrowserRouter, Route } from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <switch>
                <Route path="/" Component={LoginPage} />
            </switch>
        </BrowserRouter>
    );
}

export default App;
