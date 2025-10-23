from flask import Flask, request, jsonify
from flask_cors import CORS
from utils.waste_utils import classify_waste, classify_image
from PIL import Image
import io

app = Flask(__name__)
CORS(app)

@app.route("/classify", methods=["POST"])
def classify():
    if "image" in request.files:
        image_file = request.files["image"]
        try:
            img = Image.open(image_file.stream).convert("RGB")
            result = classify_image(img)
            return jsonify(result)
        except Exception as e:
            return jsonify({"error": "Invalid image file", "details": str(e)}), 400

    # Handle text input
    if request.content_type.startswith("multipart/form-data"):
        item = request.form.get("itemName", "").strip()
    else:
        data = request.json
        item = data.get("text", "").strip()

    if item:
        result = classify_waste(item)
        return jsonify(result)

    return jsonify({"error": "No valid input provided"}), 400

if __name__ == "__main__":
    app.run(debug=True)
