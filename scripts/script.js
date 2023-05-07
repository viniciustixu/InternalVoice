const synth = window.speechSynthesis;

function talk() {
    let text = document.getElementById("txt").value;
    let voices = synth.getVoices();
    if (voices.length !== 0) {
        console.log("talk");
        let msg = new SpeechSynthesisUtterance();
        msg.voice = voices[19];        // voz
        msg.rate = 1;                 // Velocidade
        msg.pitch = 0.8;                // tom
        msg.text = text;
        msg.lang = "pt-BR";
        synth.speak(msg);
    }
}

function executarEmHorarioEspecifico(hora, minuto, funcao) {
    setInterval(function() {
      const agora = new Date();
      const horaAtual = agora.getHours();
      const minutoAtual = agora.getMinutes();
      if (horaAtual === hora && minutoAtual === minuto) {
        funcao();
      }
    }, 30000); //Verifica a cada 30 sec
}






executarEmHorarioEspecifico(15, 03, function() {
    talk();
});

document.getElementById("playButton").onclick = talk;
