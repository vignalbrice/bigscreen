/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */

/**
 * Next, we will create a fresh React component instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

// resources/assets/js/components/App.js

import React from "react";
import ReactDOM from "react-dom";
import App from "./router/App";

// Récupère App.js placé dans le router pour l'intégré dans le DOM du navigateur
ReactDOM.render(<App />, document.getElementById("app"));
