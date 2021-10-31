const Speak = (text, pitch, rate, volume) => {
    const synth = window.speechSynthesis;
    if (synth.speaking) {
        console.error("speechSynthesis.speaking");
        return;
    }
    if (text.trim() !== "") {
        var utterThis = new SpeechSynthesisUtterance(text);
        utterThis.onend = function (event) {};
        utterThis.onerror = function (event) {
            console.error("SpeechSynthesisUtterance.onerror");
        };

        utterThis.pitch = +pitch;
        utterThis.rate = +rate;
        utterThis.volume = +volume;
        synth.speak(utterThis);
    }
};

export default Speak;
