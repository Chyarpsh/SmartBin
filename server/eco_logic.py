def classify_item(item_name):
    item = item_name.lower().strip()

    rules = {
        "plastic bottle": "Recyclable",
        "banana peel": "Compostable",
        "styrofoam": "Trash",
        "glass": "Recyclable",
        "paper towel": "Compostable",
        "battery": "Hazardous Waste",
        "cardboard": "Recyclable",
        "aluminum can": "Recyclable",
        "chip bag": "Trash",
        "food waste": "Compostable",
        "tissue": "Trash"
    }

    category = rules.get(item, "Unknown")
    return {
        "item": item_name,
        "category": category,
        "tip": generate_tip(category)
    }

def generate_tip(category):
    if category == "Recyclable":
        return "Make sure it's clean and dry before recycling."
    elif category == "Compostable":
        return "Compost this in a green bin or backyard pile."
    elif category == "Trash":
        return "Dispose of this in your regular trash bin."
    elif category == "Hazardous Waste":
        return "Take it to a certified hazardous waste drop-off."
    else:
        return "We couldn't classify this item yet. Try rephrasing it."
