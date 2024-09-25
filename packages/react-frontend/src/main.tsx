import React from "react";
import ReactDOMClient from "react-dom/client";
import "./main.css";
import MyApp from "./MyApp";


//Create container
const container: HTMLElement | null = document.getElementById("root");

//Check if container was created
if (container) {
    // Create root
    const root = ReactDOMClient.createRoot(container);
    root.render(<MyApp />);
}