from flask import Flask, jsonify, request
from flask_cors import CORS
import csv
import pandas as pd
import numpy as np


app = Flask(__name__)

cors = CORS(app)

with open("data.csv", "r") as f:
    reader = csv.reader(f)
    cols = next(reader)
    # Check if the dataset is valid
    df = pd.read_csv("data.csv", usecols=[cols[0], cols[1]])
    if df.isnull().values.any():
        print("There is a null value in the dataset")
        exit(1)
    try:
        df = df.astype(int)
    except ValueError:
       print("There is a non-integer value in the dataset")
       exit(1)

X = np.array(df[cols[0]]).reshape(-1, 1)
X_norm = X.copy()
mu = np.mean(X, axis=0)
sigma = np.std(X, axis=0)
X_norm = (X - mu) / sigma
X = X_norm
X = np.hstack((np.ones(X.shape), X))
Y = np.array(df[cols[1]]).reshape(-1, 1)
iterations = 100
learning_rate = 0.05
theta = np.zeros((2, 1))

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
    return "<h1>Hello, World!</h1>"


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
    return jsonify({"data": df.values.tolist()}), 200

@app.get("/model")
def get_model():
    global theta
    global X
    global Y
    global iterations
    global learning_rate
    theta, cost_history, theta_history = gradient_descent(X, Y, theta, learning_rate, iterations, df)
    return jsonify({"data": [l[0] for l in model(X, theta).tolist()], "theta" : [l[0] for l in theta.tolist()]}), 200

@app.post("/predict")
def predict():
    global theta
    global mu
    global sigma
    data = request.get_json()
    x = data["x"]
    x = (x - mu) / sigma
    y = x * theta[1] + theta[0]
    return jsonify({"data": y[0]//1}), 200

@app.get("/values")
def get_values():
    return jsonify({"iterations": iterations, "learning_rate": learning_rate}), 200

@app.route('/modify', methods=['POST'])
def modify():
    global iterations
    global learning_rate
    global theta

    data = request.get_json()
    iterations = data["iterations"]
    learning_rate = data["learning_rate"]
    theta = np.zeros((2, 1))
    theta, cost_history, theta_history = gradient_descent(X, Y, theta, learning_rate, iterations, df)

    return jsonify(data), 200


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
