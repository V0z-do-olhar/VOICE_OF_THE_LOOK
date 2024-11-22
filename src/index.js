import React from "react"; // Importa a biblioteca React para criar componentes
import ReactDOM from "react-dom"; // Importa o ReactDOM para manipular o DOM
import { BrowserRouter as Router } from "react-router-dom"; // Importa o Router para gerenciamento de rotas
import App from "./App"; // Importa o componente principal App do arquivo App.js
import "./style.css"; // Importa o arquivo de estilos

// Renderiza o componente App dentro do elemento com o id "root"
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById("root") // Seleciona o elemento do DOM onde o App será montado
);
