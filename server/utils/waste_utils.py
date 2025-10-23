# utils/waste_utils.py

import json
import os
from transformers import AutoProcessor, AutoModelForImageClassification
from PIL import Image
import torch

# Load the waste knowledge base
def load_waste_data():
    base_path = os.path.dirname(os.path.abspath(__file__))
    json_path = os.path.join(base_path, "../data/waste_knowledge_base.json")
    with open(json_path, "r") as f:
        return json.load(f)

WASTE_KNOWLEDGE = load_waste_data()

# Load the AI model for image classification
processor = AutoProcessor.from_pretrained("microsoft/resnet-50")
model = AutoModelForImageClassification.from_pretrained("microsoft/resnet-50")
model.eval()

def classify_image(image: Image.Image):
    inputs = processor(images=image, return_tensors="pt")
    with torch.no_grad():
        outputs = model(**inputs)
    logits = outputs.logits
    predicted_class_id = logits.argmax(-1).item()
    label = model.config.id2label[predicted_class_id].lower()

    print(f"[DEBUG] Predicted label: {label}")  # Optional: see prediction in terminal

    # First try exact match
    if label in WASTE_KNOWLEDGE:
        return WASTE_KNOWLEDGE[label]

    # Then try partial match by similarity
    best_match = None
    for key in WASTE_KNOWLEDGE:
        if key in label or label in key:
            best_match = key
            break

    if best_match:
        return WASTE_KNOWLEDGE[best_match]

    # No match found
    return {
        "category": "Unknown",
        "disposal_tip": "Try to research proper disposal methods or ask local waste services.",
        "reuse_tip": "Explore creative reuse ideas or look for specialized disposal programs."
    }


def classify_waste(item_name):
    item_name = item_name.lower().strip()
    return WASTE_KNOWLEDGE.get(item_name, {
        "category": "Unknown",
        "disposal_tip": "Try to research proper disposal methods or ask local waste services.",
        "reuse_tip": "Explore creative reuse ideas or look for specialized disposal programs."
    })
