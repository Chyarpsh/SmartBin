import React, { useState, useRef } from "react";
import axios from "axios";
import Webcam from "react-webcam";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

function Home() {
  const [itemName, setItemName] = useState("");
  const [image, setImage] = useState(null);
  const [scannedImage, setScannedImage] = useState(null);
  const [category, setCategory] = useState("");
  const [tip, setTip] = useState("");
  const [reuseIdea, setReuseIdea] = useState("");
  const [useCamera, setUseCamera] = useState(false);
  const webcamRef = useRef(null);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const handleVoiceInput = () => {
    if (!browserSupportsSpeechRecognition) {
      alert("Voice input not supported in this browser.");
      return;
    }
    resetTranscript();
    SpeechRecognition.startListening({ continuous: false });
  };

  const handleStopVoice = () => {
    SpeechRecognition.stopListening();
    setItemName(transcript);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("itemName", itemName);
    if (image) formData.append("image", image);
    if (scannedImage) formData.append("image", scannedImage);

    try {
      const res = await axios.post("http://localhost:5000/classify", formData);
      setCategory(res.data.category);
      setTip(res.data.disposal_tip);
      setReuseIdea(res.data.reuse_tip);

    } catch (err) {
      console.error("Error sending data to server:", err);
      alert("❌ Something went wrong. Please try again.");
    }
  };

  const capture = () => {
  if (!webcamRef.current) {
    alert("Webcam not ready. Please try again.");
    return;
  }

  const imageSrc = webcamRef.current.getScreenshot();
  if (!imageSrc) {
    alert("Failed to capture image. Please wait a moment and try again.");
    return;
  }

  fetch(imageSrc)
    .then(res => res.blob())
    .then(blob =>
      setScannedImage(new File([blob], "scan.jpg", { type: "image/jpeg" }))
    );
  setUseCamera(false);
};

  return (
    <div className="home-page">
      <h2>Welcome to SmartBin</h2>

      <div className="input-group">
        <label>Text Input:</label>
        <input
          type="text"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          placeholder="e.g. plastic bottle"
        />
      </div>

      <div className="input-group">
        <label>Upload an image:</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
      </div>

      <div className="input-group">
        <button onClick={() => setUseCamera(!useCamera)}>
          {useCamera ? "Cancel Camera" : "Scan with Camera"}
        </button>
        {useCamera && (
          <div>
            <Webcam
              ref={webcamRef}
              audio={false}
              screenshotFormat="image/jpeg"
              width={320}
            />
            <button onClick={capture}>Capture</button>
          </div>
        )}
      </div>

      <div className="input-group">
        <button onClick={handleVoiceInput}>🎤 Start Voice</button>
        <button onClick={handleStopVoice}>🛑 Stop & Use</button>
        {listening && <p>Listening...</p>}
      </div>

      <button className="submit-btn" onClick={handleSubmit}>
        Submit
      </button>

      {category && (
        <div className="output">
          <h3>Classification Result</h3>
          <p><strong>Category:</strong> {category}</p>
          <p><strong>Eco Tip:</strong> {tip}</p>
          <p><strong>Reuse Idea:</strong> {reuseIdea}</p>
        </div>
      )}
    </div>
  );
}

export default Home;
