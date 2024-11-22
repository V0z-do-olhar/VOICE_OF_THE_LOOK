import React, { useState, useEffect } from "react";
import { FaMicrophone } from "react-icons/fa";
import "axios";
import "./Signup.css";

// Mapeamento de palavras para números
const numberWords = {
  zero: "0",
  um: "1",
  dois: "2",
  três: "3",
  quatro: "4",
  cinco: "5",
  seis: "6",
  sete: "7",
  oito: "8",
  nove: "9",
};

// Função para converter palavras faladas em números
const convertWordsToNumbers = (transcript) => {
  return transcript
    .toLowerCase()
    .split(" ")
    .map((word) => numberWords[word] || "")
    .join("");
};

const Cadastro = () => {
  const [formData, setFormData] = useState({
    nomeCompleto: "",
    username: "",
    gênero: "",
    cpf: "",
    email: "",
    senha: "",
    repetirSenha: "",
    chaveSeguranca: "",
  });

  const [isListening, setIsListening] = useState(false);
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(false);
  const [cpfError, setCpfError] = useState("");

  // Função para capturar mudanças nos campos
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Limitar o CPF a apenas números
    if (name === "cpf" && !/^\d*$/.test(value)) {
      return;
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "cpf") {
      setCpfError("");
    }
  };

  // Função para validar e submeter o formulário
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validação do CPF
    if (!/^\d{11}$/.test(formData.cpf)) {
      setCpfError("O CPF deve ter exatamente 11 dígitos numéricos.");
      return;
    }

    console.log("Dados do formulário:", formData);
  };

  // Função para ativar o reconhecimento de voz
  const startListening = (name) => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Reconhecimento de voz não suportado neste navegador.");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.onstart = () => {
      console.log("Você pode falar agora!");
      setIsListening(true);
    };

    recognition.onspeechend = () => {
      recognition.stop();
      setIsListening(false);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      const numberInput = convertWordsToNumbers(transcript);
      handleChange({ target: { name, value: numberInput } });
    };

    recognition.onerror = (event) => {
      console.error("Erro no reconhecimento de voz: ", event.error);
      setIsListening(false);
    };

    recognition.start();
  };

  useEffect(() => {
    setShowWelcomeMessage(true);
  }, []);

  return (
    <div>
      {showWelcomeMessage && <div className="welcome-message"></div>}
      <form onSubmit={handleSubmit}>
        <h1>Cadastro</h1>

        {/* Nome Completo */}
        <div>
          <label>Nome Completo:</label>
          <div className="input-container">
            <input
              type="text"
              name="nomeCompleto"
              value={formData.nomeCompleto}
              onChange={handleChange}
              placeholder="Diga seu nome completo"
              required
            />
            <button
              type="button"
              className="ButtonMicCadastro"
              onClick={() => startListening("nomeCompleto")}
            >
              <FaMicrophone />
            </button>
          </div>
        </div>

        {/* Username */}
        <div>
          <label>Username:</label>
          <div className="input-container">
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Diga seu username"
              required
            />
            <button
              type="button"
              className="ButtonMicCadastro"
              onClick={() => startListening("username")}
            >
              <FaMicrophone />
            </button>
          </div>
        </div>

        {/* Gênero */}
        <div>
          <label>Gênero:</label>
          <div className="input-container">
            <input
              type="text"
              name="gênero"
              value={formData.gênero}
              onChange={handleChange}
              placeholder="Diga seu gênero"
              required
            />
            <button
              type="button"
              className="ButtonMicCadastro"
              onClick={() => startListening("gênero")}
            >
              <FaMicrophone />
            </button>
          </div>
        </div>

        {/* CPF */}
        <div>
          <label>CPF Pessoal:</label>
          <div className="input-container">
            <input
              type="text"
              name="cpf"
              value={formData.cpf}
              onChange={handleChange}
              placeholder="Diga seu CPF"
              required
              maxLength="11"
            />
            <button
              type="button"
              className="ButtonMicCadastro"
              onClick={() => startListening("cpf")}
            >
              <FaMicrophone />
            </button>
          </div>
          {cpfError && <div className="error-message">{cpfError}</div>}
        </div>

        {/* Email */}
        <div>
          <label>Email:</label>
          <div className="input-container">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Diga seu email"
              required
            />
            <button
              type="button"
              className="ButtonMicCadastro"
              onClick={() => startListening("email")}
            >
              <FaMicrophone />
            </button>
          </div>
        </div>

        {/* Senha */}
        <div>
          <label>Senha:</label>
          <div className="input-container">
            <input
              type="password"
              name="senha"
              value={formData.senha}
              onChange={handleChange}
              placeholder="Diga sua senha"
              required
            />
            <button
              type="button"
              className="ButtonMicCadastro"
              onClick={() => startListening("senha")}
            >
              <FaMicrophone />
            </button>
          </div>
        </div>

        {/* Repetir Senha */}
        <div>
          <label>Repetir Senha:</label>
          <div className="input-container">
            <input
              type="password"
              name="repetirSenha"
              value={formData.repetirSenha}
              onChange={handleChange}
              placeholder="Repita sua senha"
              required
            />
            <button
              type="button"
              className="ButtonMicCadastro"
              onClick={() => startListening("repetirSenha")}
            >
              <FaMicrophone />
            </button>
          </div>
        </div>

        {/* Chave de Segurança */}
        <div>
          <label>Chave de Segurança:</label>
          <div className="input-container">
            <input
              type="text"
              name="chaveSeguranca"
              value={formData.chaveSeguranca}
              onChange={handleChange}
              placeholder="Diga sua chave de segurança"
              required
            />
            <button
              type="button"
              className="ButtonMicCadastro"
              onClick={() => startListening("chaveSeguranca")}
            >
              <FaMicrophone />
            </button>
          </div>
        </div>

        <button type="submit" className="CadastroButton">
          CADASTRAR
        </button>
      </form>
    </div>
  );
};

export default Cadastro;
