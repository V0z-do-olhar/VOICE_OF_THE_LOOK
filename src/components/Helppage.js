import React, { useState } from "react";
import { FaMicrophone } from "react-icons/fa";
import "./Helppage.css";

function Helppage() {
  const [reportText, setReportText] = useState("");
  const [feedbackText, setFeedbackText] = useState("");
  const [isRecognizing, setIsRecognizing] = useState(false);

  const faqData = [
    { question: "O que é Noah?", answer: "Noah é um assistente virtual." },
    {
      question: "Como posso me cadastrar?",
      answer: "Clique na opção 'Cadastrar'.",
    },
    { question: "Como faço login?", answer: "Insira seu email e senha." },
    {
      question: "Onde posso encontrar as notícias?",
      answer: "Na página principal.",
    },
    { question: "Como funciona a reflexão?", answer: "Clique no microfone." },
  ];

  const startRecognition = (type) => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Reconhecimento de voz não suportado neste navegador.");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "pt-BR";
    recognition.interimResults = false;

    recognition.onstart = () => setIsRecognizing(true);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      if (type === "report") {
        setReportText(transcript);
      } else {
        setFeedbackText(transcript);
      }
    };

    recognition.onerror = () => {
      alert("Ocorreu um erro com o reconhecimento de voz.");
      setIsRecognizing(false);
    };

    recognition.onend = () => setIsRecognizing(false);

    recognition.start();
  };

  const speakAnswer = (answer) => {
    const utterance = new SpeechSynthesisUtterance(answer);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="Helppage">
      <main>
        <section className="help-section">
          <h1>AJUDA</h1>
          <p>
            Bem-vindo à nossa página de ajuda! Nossa missão é ajudar o usuário
            deficiente visual no seu dia a dia com as informações corretas.
          </p>
        </section>

        <section className="contact-section">
          <input
            type="text"
            placeholder="Relatar algo ou fale conosco"
            value={reportText}
            onChange={(e) => setReportText(e.target.value)}
          />
          <button
            onClick={() => startRecognition("report")}
            disabled={isRecognizing}
            className="mic-button"
          >
            <FaMicrophone />
          </button>
        </section>

        <section className="contact-section">
          <input
            type="text"
            placeholder="Feedback"
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
          />
          <button
            onClick={() => startRecognition("feedback")}
            disabled={isRecognizing}
            className="mic-button"
          >
            <FaMicrophone />
          </button>
        </section>

        <section className="faq-section">
          <h2>FAQ - Perguntas frequentes</h2>
          {faqData.map((faq, index) => (
            <div className="faq" key={index}>
              <h3>
                {index + 1}. {faq.question}
              </h3>
              <div className="btn">
                <button
                  className="btnListen"
                  onClick={() => speakAnswer(faq.answer)}
                >
                  OUVIR
                </button>
              </div>
              <div className="faqAnsewr">
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}

export default Helppage;
