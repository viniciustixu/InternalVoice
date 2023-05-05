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

document.getElementById("playButton").onclick = talk;