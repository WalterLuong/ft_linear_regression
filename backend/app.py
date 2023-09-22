from flask import Flask, jsonify
from flask_cors import CORS
import csv
import pandas as pd
import numpy as np


app = Flask(__name__)

cors = CORS(app, resources={r"/*": {"origins": "*"}})


@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"


@app.route("/dataset")
def dataset():
    with open("data.csv", "r") as f:
        reader = csv.reader(f)
        cols = next(reader)

    # Check if the dataset is valid
    df = pd.read_csv("data.csv", usecols=[cols[0], cols[1]])
    if df.isnull().values.any():
        return jsonify({"error": "There is a null value in the dataset"}), 400

    try:
        df = df.astype(int)
    except ValueError:
        return jsonify({"error": "There is a non-integer value in the dataset"}), 400
    np.set_printoptions(suppress=True)
    return jsonify({"data": df.values.tolist()}), 200


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
