// utils/speakNews.js
const speakNews = () => {
  const newsContent = `
    Recentemente, o uso de tecnologia assistiva tem crescido, proporcionando mais independência para pessoas cegas. 
    Novas ferramentas de leitura de tela e aplicativos de navegação têm sido desenvolvidos para ajudar na inclusão e acessibilidade. 
    O acesso à informação está melhorando, e eventos estão sendo realizados para aumentar a conscientização sobre a vida de pessoas com deficiência visual.
  `;

  const speech = new SpeechSynthesisUtterance(newsContent);
  speech.lang = "pt-BR";
  window.speechSynthesis.speak(speech);
};

export default speakNews;
