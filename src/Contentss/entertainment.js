// utils/speakEntertainment.js
const speakEntertainment = () => {
  const entertainmentContent = `
    A IA está transformando o entretenimento para pessoas cegas. 
    Novos aplicativos estão sendo criados para descrever imagens, e audiobooks estão se tornando mais populares. 
    Além disso, experiências imersivas de teatro e eventos culturais estão sendo adaptadas para tornar-se acessíveis a todos.
  `;

  const speech = new SpeechSynthesisUtterance(entertainmentContent);
  speech.lang = "pt-BR";
  window.speechSynthesis.speak(speech);
};

export default speakEntertainment;
