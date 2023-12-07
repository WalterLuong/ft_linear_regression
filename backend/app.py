from flask import Flask, jsonify
from flask_cors import CORS
import csv
import pandas as pd
import numpy as np


app = Flask(__name__)

cors = CORS(app)


def model(X, theta):
    return np.dot(X, theta)


def cost_function(X, Y, theta):
    m = len(Y)
    J = np.sum(model(X, theta) - Y) ** 2 / (2 * m)
    return J


def gradient(X, Y, theta):
    m = len(Y)
    gradient = np.dot(X.T, model(X, theta) - Y) / m
    return gradient


def gradient_descent(X, y, theta, learning_rate, iterations, df):
    m = len(y)
    cost_history = np.zeros(iterations)
    theta_history = np.zeros((iterations, 2))
    for it in range(iterations):
        theta = theta - learning_rate * gradient(X, y, theta)
        theta_history[it, :] = theta.T
        cost_history[it] = cost_function(X, y, theta)
    return theta, cost_history, theta_history

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"


@app.get("/dataset")
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
