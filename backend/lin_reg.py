import csv
import matplotlib.pyplot as plt
import pandas as pd
import numpy as np


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
        plt.clf()
        plt.plot(df[cols[0]], model(X, theta), color="red")
        plt.scatter(df[cols[0]], df[cols[1]])
        plt.draw()
        plt.pause(0.01)
    return theta, cost_history, theta_history


if __name__ == "__main__":

    # Read the csv file
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
    np.set_printoptions(suppress=True)
    print(df)
    plt.scatter(df[cols[0]], df[cols[1]])

    # Plot the dataset
    X = np.array(df[cols[0]]).reshape(-1, 1)
    print(X)

    X_norm = X.copy()
    # mu = np.zeros((1, X.shape[1]))
    # sigma = np.zeros((1, X.shape[1]))
    mu = np.mean(X, axis=0)
    sigma = np.std(X, axis=0)

    X_norm = (X - mu) / sigma
    X = X_norm
    X = np.hstack((np.ones(X.shape), X))

    # X_normalized = np.array(normalized_df[cols[0]]).reshape(-1, 1)
    # X_normalized = np.hstack((X_normalized, np.ones(X_normalized.shape)))

    print("\033[32mX\033[0m")
    print(X)

    Y = np.array(df[cols[1]]).reshape(-1, 1)
    print("\033[32mY\033[0m")
    print(Y)

    theta = np.zeros((2, 1))
    # print(grad(X, Y, theta))

    iterations = 100
    learning_rate = 0.05

    # # NORMALIZED
    # theta, cost_history, theta_history = gradient_descent(
    #     X_normalized, Y_normalized, theta, learning_rate, iterations)

    # plt.plot(normalized_df[cols[0]], model(X_normalized, theta), color="red")
    # plt.scatter(normalized_df[cols[0]], normalized_df[cols[1]])

    # NOT NORMALIZED
    theta, cost_history, theta_history = gradient_descent(
        X, Y, theta, learning_rate, iterations, df)
    X2 = df[cols[0]].tolist()
    print(X2)
    print(theta[0][0])
    modelll = [c * theta[1] + theta[0] for c in X2]
    print('Model est: ', modelll)
    # plt.plot(df[cols[0]], model(X, theta), color="red")

    print("\033[32mTheta\033[0m")
    print(theta)
    price = 120000
    print(f'le prix est: {(price - mu)/sigma * theta[1][0] + theta[0][0]}')
    # print("\033[32mCost History\033[0m")
    # print(cost_history)
    # print("\033[32mTheta History\033[0m")
    # print(theta_history)

    # plt.xlabel(cols[0])
    # plt.ylabel(cols[1])
    plt.show()
