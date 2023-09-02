import React from "react";
import ReactDOM from "react-dom/client";
import { Footer, Body } from "./src/Components/Index";
// import { createBrowserRouter } from "react-router-dom"; // First , Need to push to the repo

function App() {
  return (
    <>
      {/* <Header /> */}
      <Body />
      <Footer />
    </>
  );
}

// const appRoute = createBrowserRouter([
//     { path: "/",
// }]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
