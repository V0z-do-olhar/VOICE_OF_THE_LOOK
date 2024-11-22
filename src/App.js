import React, { useState, useEffect } from "react";
import {
  FaMicrophone,
  FaInstagram,
  FaYoutube,
  FaEnvelope,
} from "react-icons/fa";
import "./style.css"; // Estilo do aplicativo
import Login from "./components/Login"; // Componente de Login
import Signup from "./components/Signup"; // Componente de Cadastro
import Helppage from "./components/Helppage"; // Componente da página de ajuda
import logo from "./assets/logo.png"; // Imagem do logo
import speakReflection from "./Contentss/conversation"; // Função de fala sobre reflexão
import speakEntertainment from "./Contentss/entertainment"; // Função de fala sobre entretenimento
import speakNews from "./Contentss/news"; // Função de fala sobre notícias
import SoundWaves from "./components/SoundWaves"; // Componente para ondas sonoras

const App = () => {
  // Estado para armazenar a mensagem do usuário
  const [message, setMessage] = useState("");
  // Estado para verificar se o usuário está logado
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // Estado para controlar a exibição do formulário de cadastro
  const [showSignup, setShowSignup] = useState(false);
  // Estado para controlar a exibição da página de ajuda
  const [showHelppage, setShowHelppage] = useState(false);
  // Estado para armazenar as conversas (ex: mensagens trocadas)
  const [conversations, setConversations] = useState([]);
  // Estado para armazenar o volume (ex: de um áudio ou vídeo)
  const [volume, setVolume] = useState(0);
  // Estado para controlar se o microfone está ativo ou não
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    respondWithMessage(
      "Olá, eu sou o Noah, como posso ajudar você hoje? Você pode fazer login, cadastrar-se, ir para a página de ajuda ou conversar comigo."
    );
    startListening();
  }, []);

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    // Configuração do AudioContext e AnalyserNode
    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    const analyser = audioContext.createAnalyser();

    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);
      analyser.fftSize = 2048;
      const dataArray = new Uint8Array(analyser.frequencyBinCount);

      const getVolume = () => {
        analyser.getByteFrequencyData(dataArray);
        const sum = dataArray.reduce((a, b) => a + b);
        const average = sum / dataArray.length; // Corrigido aqui
        setVolume(average / 255); // Normaliza para um valor entre 0 e 1
        requestAnimationFrame(getVolume);
      };
      getVolume(); // Inicia a captura de volume
    });

    recognition.onstart = () => {
      setMessage("Você pode falar agora!");
      setIsListening(true); // Inicia a escuta
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.toLowerCase();
      setConversations((prev) => [
        ...prev,
        { sender: "user", text: transcript },
      ]);
      handleVoiceCommand(transcript);
    };

    recognition.onerror = () => {
      setMessage("Desculpe, não consegui te entender.");
      setIsListening(false); // Para a escuta em caso de erro
    };

    recognition.onend = () => {
      setIsListening(false); // Volta ao estado de microfone após o reconhecimento
    };

    recognition.start();
  };

  const handleVoiceCommand = (command) => {
    const commands = {
      "ir para login": () => navigateTo("login"),
      login: () => navigateTo("login"),
      entrar: () => navigateTo("login"),
      "ir para cadastro": () => navigateTo("signup"),
      cadastro: () => navigateTo("signup"),
      cadastrar: () => navigateTo("signup"),
      "pagina de cadastro": () => navigateTo("signup"),
      "ir para ajuda": () => navigateTo("help"),
      ajuda: () => navigateTo("help"),
      "limpar conversa": () => clearConversations(),
      limpar: () => clearConversations(),
      noah: () => respondWithMessage("Você chamou, estou aqui!"),
      "falar com voce": () => respondWithMessage("Você chamou, estou aqui!"),
    };

    const action = Object.keys(commands).find((phrase) =>
      command.includes(phrase)
    );
    if (action) {
      commands[action]();
    } else {
      const reflectionPhrases = [
        "reflexão sobre a vida",
        "fale uma reflexão",
        "reflexão",
        "fale sobre a vida",
      ];
      const entertainmentPhrases = [
        "entretenimento para cegos",
        "entretenimento",
        "entretenimentos",
        "fale sobre entretenimento",
      ];
      const newsPhrases = [
        "notícias sobre cegos",
        "notícias",
        "notícia",
        "fale sobre tecnologia assistiva",
      ];

      if (reflectionPhrases.some((phrase) => command.includes(phrase))) {
        speakReflection();
      } else if (
        entertainmentPhrases.some((phrase) => command.includes(phrase))
      ) {
        speakEntertainment();
      } else if (newsPhrases.some((phrase) => command.includes(phrase))) {
        speakNews();
      } else {
        respondWithMessage("Comando não reconhecido.");
      }
    }
  };

  const navigateTo = (section) => {
    setShowHelppage(section === "help");
    setShowSignup(section === "signup");
    if (section === "login") {
      setIsLoggedIn(false);
      respondWithMessage("Você está na página de login.");
    } else if (section === "signup") {
      respondWithMessage("Você está na página de cadastro.");
    } else if (section === "help") {
      respondWithMessage("Você está na página de ajuda.");
    }
  };

  const clearConversations = () => {
    setConversations([]);
    respondWithMessage("As conversas foram limpas.");
  };

  const handleLogin = (email, password) => {
    console.log("Email:", email, "Senha:", password);
    setIsLoggedIn(true); // Aqui você pode adicionar lógica de autenticação
  };

  const respondWithMessage = (text) => {
    setMessage(text);
    setConversations((prev) => [...prev, { sender: "ai", text }]);
    const speech = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(speech);
  };

  const resetToHome = () => {
    setShowHelppage(false);
    setShowSignup(false);
    setIsLoggedIn(false);
    setMessage("");
    setConversations([]);
    respondWithMessage("Você voltou para a página inicial.");
  };

  return (
    <div className="app-container">
      <header>
        <img src={logo} alt="Logo" className="logo" onClick={resetToHome} />
        <nav>
          {!isLoggedIn ? (
            <div className="nav-links">
              <a
                href="#"
                onClick={() =>
                  respondWithMessage("Você está na página inicial.")
                }
              >
                Início
              </a>
              <a href="#" onClick={() => setShowSignup(true)}>
                Cadastrar
              </a>
              <a href="#" onClick={() => setShowHelppage(true)}>
                Ajuda
              </a>
            </div>
          ) : (
            <a href="#" onClick={() => setShowHelppage(true)}>
              Ajuda
            </a>
          )}
        </nav>
      </header>

      <main>
        {showHelppage ? (
          <Helppage />
        ) : (
          <div>
            <div className="noah-container">
              <h5>NOAH</h5>
              <div className="conversations-container">
                {conversations.map((conversation, index) => (
                  <div
                    key={index}
                    className={`message ${
                      conversation.sender === "user"
                        ? "user-message"
                        : "ai-message"
                    }`}
                  >
                    {conversation.text}
                  </div>
                ))}
              </div>
              <div className="input-box">
                <p className="message-box">{message}</p>{" "}
                {/* Atualização: Mudei o nome da classe CSS */}
                <button
                  className="ButtonNoah"
                  onClick={() => {
                    if (!isListening) {
                      startListening(); // Verifique se não está escutando antes de iniciar
                    }
                  }}
                >
                  {isListening ? (
                    <SoundWaves volume={volume} />
                  ) : (
                    <FaMicrophone />
                  )}
                </button>
              </div>
            </div>

            {!isLoggedIn && (
              <>
                {showSignup ? (
                  <Signup
                    onSignup={(email, password) => {
                      handleLogin(email, password);
                    }}
                  />
                ) : (
                  <Login
                    onLogin={(email, password) => {
                      handleLogin(email, password);
                    }}
                  />
                )}
                <p>
                  {showSignup ? (
                    <>
                      Já tem uma conta?{" "}
                      <button
                        className="BtnEntrar"
                        onClick={() => setShowSignup(false)}
                      >
                        Entrar
                      </button>
                    </>
                  ) : (
                    <>
                      Não tem uma conta?{" "}
                      <button
                        className="BtnCadastrar"
                        onClick={() => setShowSignup(true)}
                      >
                        Cadastrar
                      </button>
                    </>
                  )}
                </p>
              </>
            )}
          </div>
        )}
      </main>

      <footer className="footer">
        <div className="footer-links">
          <a href="#">Portfólio</a>
          <a href="#">Ajuda</a>
          <a href="#">Termos e Condições</a>
          <a href="#">Política de Privacidade</a>
        </div>
        <div className="footer-info">
          <p>VOICE OF THE LOOK © 2024</p>
          <p>Design with Figma, Code on React</p>
        </div>
        <div className="footer-social">
          <a href="#">
            <FaYoutube />
          </a>
          <a href="#">
            <FaInstagram />
          </a>
          <a href="#">
            <FaEnvelope />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default App;
