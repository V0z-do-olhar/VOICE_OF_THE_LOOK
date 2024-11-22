// utils/speechReflection.js
const speakReflection = () => {
  const conversationScript = `
    A vida é cheia de altos e baixos. Às vezes, nos deparamos com desafios que parecem insuperáveis. 
    No entanto, é importante lembrar que cada experiência, boa ou má, nos ensina algo. 
    Refletir sobre esses momentos pode nos ajudar a crescer e a valorizar ainda mais as pequenas alegrias do dia a dia.
  `;

  const speech = new SpeechSynthesisUtterance(conversationScript);
  speech.lang = "pt-BR";
  window.speechSynthesis.speak(speech);
};

export default speakReflection;
