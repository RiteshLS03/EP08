import React from "react";
import ReactDOM from "react-dom/client";
import { Footer , Body } from "./src/Components/Index"


function App(){
    return(
        <>
        {/* <Header /> */}
        <Body />
        <Footer />
        </>
    );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);