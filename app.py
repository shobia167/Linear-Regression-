from flask import Flask, request, jsonify, render_template
import joblib

app = Flask(__name__)

model = joblib.load("ad.pkl")

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/predict", methods=["POST"])
def predict():

    data = request.get_json()

    tv_budget = float(data["tv"])

    prediction = model.predict([[tv_budget]])

    return jsonify({
        "sales": prediction[0]
    })

if __name__ == "__main__":
    app.run(debug=True)