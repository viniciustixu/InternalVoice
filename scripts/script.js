// Função que lê o texto em audio

const synth = window.speechSynthesis;

function talk(texto) {
  let text = texto
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

// Função que define a hora e minuto que o audio sera reproduzido

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

//Função que cria div dinâmicamente

function criarDiv(hora, minuto) {
  // Criar o elemento div
  const novaDiv = document.createElement("div");

  // Criar os elementos input
  const inputHora = document.createElement("input");
  inputHora.type = "number";
  inputHora.name = "nHora" + hora;
  inputHora.id = "hora" + hora;
  inputHora.max = "23";
  inputHora.min = "0";
  inputHora.placeholder = "Hora";

  const inputMinuto = document.createElement("input");
  inputMinuto.type = "number";
  inputMinuto.name = "nMinuto" + minuto;
  inputMinuto.id = "minuto" + minuto;
  inputMinuto.max = "59";
  inputMinuto.min = "0";
  inputMinuto.placeholder = "Minuto";

  // Criar o elemento label
  const label = document.createElement("label");
  label.htmlFor = "texto" + hora;
  label.innerText = "Tarefa:";

  // Criar o elemento input para o texto
  const inputTexto = document.createElement("input");
  inputTexto.type = "text";
  inputTexto.name = "nTexto" + hora;
  inputTexto.id = "texto" + hora;

  // Adicionar os elementos à div
  novaDiv.appendChild(inputHora);
  novaDiv.appendChild(inputMinuto);
  novaDiv.appendChild(label);
  novaDiv.appendChild(inputTexto);

  // Adicionar a div ao documento
  const container = document.getElementById("container");
  container.appendChild(novaDiv);
}

criarDiv(2,2);
criarDiv(3,3);
























executarEmHorarioEspecifico(21, 54, function() {
    talk('Deu certo');
});



//document.getElementById("playButton").onclick = function() {
//  talk('Testando função de audio');
//};
