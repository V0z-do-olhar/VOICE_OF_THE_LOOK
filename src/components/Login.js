import React, { useState } from "react"; // Importa o React e o hook useState para gerenciar estado
import { FaMicrophone } from "react-icons/fa"; // Importa o ícone do microfone
import "axios";
import "./Signup"; // Importa o CSS para estilizar o componente de Login

const Login = ({ onLogin }) => {
  // Define o componente Login que recebe uma função onLogin como prop
  const [username, setUsername] = useState(""); // Estado para armazenar o nome de usuário
  const [password, setPassword] = useState(""); // Estado para armazenar a senha

  // Função para iniciar o reconhecimento de voz
  const startListening = (setter) => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition; // Verifica a disponibilidade da API de reconhecimento de voz
    const recognition = new SpeechRecognition(); // Cria uma nova instância de reconhecimento de voz

    recognition.onstart = () => {
      console.log("Você pode falar agora!"); // Mensagem no console quando o reconhecimento inicia
    };

    recognition.onresult = (event) => {
      // Evento acionado quando há um resultado
      const transcript = event.results[0][0].transcript; // Captura a transcrição do resultado
      console.log("Você disse: ", transcript); // Loga a transcrição no console
      setter(transcript); // Atualiza o estado com a transcrição recebida
      recognition.stop(); // Para o reconhecimento após receber a entrada
    };

    recognition.onerror = (event) => {
      // Evento acionado em caso de erro
      console.error("Erro no reconhecimento de voz: ", event.error); // Loga o erro no console
    };

    recognition.start(); // Inicia o reconhecimento de voz
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = (event) => {
    event.preventDefault(); // Previne o comportamento padrão do formulário
    onLogin(username); // Chama a função de login com o nome de usuário
  };

  return (
    <div className="login-page">
      {" "}
      {/* Contêiner da página de login */}
      <div className="login-container">
        {" "}
        {/* Contêiner do formulário de login */}
        <form onSubmit={handleSubmit}>
          {" "}
          {/* Formulário que chama a função handleSubmit ao enviar */}
          <div>
            <h2>LOGIN</h2> {/* Título do formulário de login */}
            <label>Username:</label>{" "}
            {/* Rótulo para o campo de nome de usuário */}
            <div style={{ display: "flex", alignItems: "center" }}>
              {" "}
              {/* Flexbox para alinhar o input e o botão */}
              <input
                type="text" // Campo de entrada para nome de usuário
                value={username} // Valor do input ligado ao estado username
                onChange={(e) => setUsername(e.target.value)} // Atualiza o estado ao digitar
                required // Campo obrigatório
                placeholder="Diga seu nome de usuário" // Placeholder do campo
              />
              <button
                type="button" // Botão que não envia o formulário
                className="ButtonMic" // Classe CSS para o botão
                onClick={() => startListening(setUsername)} // Inicia o reconhecimento de voz para o campo de nome de usuário
              >
                <FaMicrophone className="microphone-icon" />{" "}
                {/* Ícone do microfone */}
              </button>
            </div>
          </div>
          <div>
            <label>Senha:</label> {/* Rótulo para o campo de senha */}
            <div style={{ display: "flex", alignItems: "center" }}>
              {" "}
              {/* Flexbox para alinhar o input e o botão */}
              <input
                type="password" // Campo de entrada para senha
                value={password} // Valor do input ligado ao estado password
                onChange={(e) => setPassword(e.target.value)} // Atualiza o estado ao digitar
                required // Campo obrigatório
                placeholder="Diga sua senha" // Placeholder do campo
              />
              <button
                type="button" // Botão que não envia o formulário
                className="ButtonMic" // Classe CSS para o botão
                onClick={() => startListening(setPassword)} // Inicia o reconhecimento de voz para o campo de senha
              >
                <FaMicrophone className="microphone-icon" />{" "}
                {/* Ícone do microfone */}
              </button>
            </div>
          </div>
          <button className="BtnEntrar" type="submit">
            ENTRAR
          </button>{" "}
          {/* Botão para enviar o formulário */}
        </form>
      </div>
    </div>
  );
};

export default Login; // Exporta o componente Login para ser usado em outros lugares
