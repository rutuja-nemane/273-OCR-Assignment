from flask import Flask, request, jsonify
from PIL import Image
import pytesseract
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route("/")
def index():
    return "Welcome to the OCR API. Use /extract-text to upload an image."


# Route for uploading image and extracting text
@app.route("/extract-text", methods=["POST"])
def extract_text():
    if "image" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400
    file = request.files["image"]
    img = Image.open(file)

    # Extract text from image using Tesseract
    text = pytesseract.image_to_string(img)

    return jsonify({"extracted_text": text})


if __name__ == "__main__":
    app.run(debug=True)
