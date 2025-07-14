# SmartBin – Intelligent Waste Classifier App

SmartBin is a mobile web app that helps users classify waste with the goal to reduce landfill, and live sustainably. It supports multiple input methods (text, voice, image scan) and provides smart suggestions for proper disposal and reuse.

## Features

- **User Authentication** – Secure login, signup, logout, and password/email change via Firebase
- **Multi-Modal Input**
  - Text: Type item name
  - Voice: Speak item name (Speech Recognition)
  - Image: Upload or Scan (Webcam) for image-based classification
- **AI-Powered Classification**
  - Uses `microsoft/resnet-50` with HuggingFace + PyTorch for image detection
  - Classifies item into known categories (e.g., Recyclable, Compostable, Hazardous)
  - Returns eco-tip + creative reuse idea
 - **Eco-Themed UI**
  - Mobile-friendly layout styled with green-themed palette
  - Light/Dark theme toggle
- **Settings Page**
  - Update email/password
  - Reauthentication handling
- **Modern Navigation**
  - Responsive navbar with dropdown menu and icons
- **Coming Soon**
  - Dashboard / Activity History
  - Feedback Loop (ratings)
  - Offline support (PWA)
  - Mini Waste Encyclopedia
  - Location-based disposal tips

---

## Tech Stack

### Frontend
- **React.js**
- `react-router-dom`, `react-icons`, `react-webcam`
- `react-speech-recognition`
- **Firebase Authentication**
- **Axios** – REST API communication
- **Responsive + Mobile-first Design**

###  Backend
- **Flask (Python)**
- **HuggingFace Transformers + PyTorch**
  - Model: `microsoft/resnet-50`
- **Waste Knowledge Base**
  - `waste_knowledge_base.json` for category, eco tips, reuse ideas

---

## Project Structure

