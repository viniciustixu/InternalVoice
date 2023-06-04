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
      alerta.play();
      synth.speak(msg);
  }
}

// Função que define a hora e minuto que o audio sera reproduzido

function executarEmHorarioEspecifico(hora, minuto, funcao) {
  const agora = new Date();
  const horaAtual = agora.getHours();
  const minutoAtual = agora.getMinutes();
  if (horaAtual === hora && minutoAtual === minuto) {
    funcao();
  }
}

//Função que cria div dinâmicamente

function criarDiv(hora, minuto) {
  
  const novaDiv = document.createElement("div")
  novaDiv.className = "item"

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

  const label = document.createElement("label");
  label.htmlFor = "texto" + hora;
  label.innerText = "Tarefa:";

  const inputTexto = document.createElement("input");
  inputTexto.type = "text";
  inputTexto.name = "nTexto" + hora;
  inputTexto.id = "texto" + hora;

  novaDiv.appendChild(inputHora);
  novaDiv.appendChild(inputMinuto);
  novaDiv.appendChild(label);
  novaDiv.appendChild(inputTexto);

  const container = document.getElementById("container");
  container.appendChild(novaDiv);
}


//Função de criar tarefa nova

function adicionarNovaTarefa() {
  const container = document.getElementById("container");
  let numFilhos = container.childElementCount;

  criarDiv(numFilhos + 1,numFilhos + 1);
}

// Função de automação que define as chamadas a cada um minuto

function automacao() {
  const container = document.getElementById("container");
  let numFilhos = container.childElementCount;
  
  for (let i = 1; i <= numFilhos; i++) {
    let h = Number(document.getElementById(`hora${i}`).value);
    let m = Number(document.getElementById(`minuto${i}`).value);
    let t = document.getElementById(`texto${i}`).value

    executarEmHorarioEspecifico(h, m, function() {
      talk(t);
  });
  }
}

setInterval(automacao, 60000);

// Guardando no localStorage

function GuardandoInformacoes() {
  const container = document.getElementById("container");
  const numFilhos = container.childElementCount;
  localStorage.clear();
  for (let i = 1; i <= numFilhos; i++) {
    let horaId = document.getElementById(`hora${i}`).value
    let minutoId = document.getElementById(`minuto${i}`).value
    let texto = document.getElementById(`texto${i}`).value
    
    localStorage.setItem(`hora${i}`, horaId);
    localStorage.setItem(`minuto${i}`, minutoId);
    localStorage.setItem(`texto${i}`, texto)
    localStorage.setItem('incremento', i)
  };
}

setInterval(GuardandoInformacoes, 5000);

// Resgatando localStorage

function resgatandoLocalStorage() {
  let incremento = parseInt(localStorage.getItem('incremento'))
  let hora = ""
  let minuto = ""
  let texto = ""

  for (let i = 1; i < incremento; i++) {
    adicionarNovaTarefa()
  }

  for (let i = 1; i <= incremento; i++) {
    hora = parseInt(localStorage.getItem(`hora${i}`));
    minuto = parseInt(localStorage.getItem(`minuto${i}`));
    texto = localStorage.getItem(`texto${i}`)

    document.getElementById(`hora${i}`).value = hora
    document.getElementById(`minuto${i}`).value = minuto
    document.getElementById(`texto${i}`).value = texto
  }
}

// Remover ultima tarefa

function removerTarefa() {
  let container = document.getElementById('container');
  let ultimoFilho = container.lastChild;
  let filhos = container.children;
  

  if (filhos.length > 1) {
    ultimoFilho.remove();
  }
}

// Adicionar uma hora a todas as tarefas

function adiarEmUmaHora() {
  const container = document.getElementById("container");
  let numFilhos = container.childElementCount;

  for (let i = 0; i < numFilhos; i++) {
    let h = document.getElementById(`hora${i + 1}`);
    h.value++
  }
  validarHorario()
}

// Atrasar uma hora a todas as tarefas

function adiantarEmUmaHora() {
  const container = document.getElementById("container");
  let numFilhos = container.childElementCount;

  for (let i = 0; i < numFilhos; i++) {
    let h = document.getElementById(`hora${i + 1}`);
    h.value-- 
  }
  validarHorario()
}

// Validar horarios inexistentes

function validarHorario() {
  const container = document.getElementById("container");
  let numFilhos = container.childElementCount;

  for (let i = 0; i < numFilhos; i++) {
    let h = document.getElementById(`hora${i + 1}`);
    
    if (h.value == 24) {
      h.value = 0
    } else if (h.value == -1) {
      h.value = 23
    }
  }
}

// Som de alerta antes de mensagem

var alerta = new Audio();
alerta.src = 'https://viniciustixu.github.io/InternalVoice/sounds/alert.mp3';


// Contornando restrição da extensão

document.addEventListener("DOMContentLoaded", function () {
  resgatandoLocalStorage();
  document.getElementById("novaTarefaBtn").addEventListener("click", adicionarNovaTarefa);
  document.getElementById("removerTarefaBtn").addEventListener("click", removerTarefa);
  document.getElementById("adiarUmaHoraBtn").addEventListener("click", adiarEmUmaHora);
  document.getElementById("adiantarUmaHoraBtn").addEventListener("click", adiantarEmUmaHora);
});
