# Diagonjs Express App

This is a basic Express app that consumes Diagonjs for mathematical expression translation.

## Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine.

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Run the following command to start the Express app:

```bash
npm start
```

The app will be running at http://localhost:3000.

## Testing with cURL

Make a POST request to the /math endpoint using cURL:

```bash
curl -X POST -H "Content-Type: application/json" -d '{"expression": "f(x) = 1 + x / (1 + x)"}' http://localhost:3000/math
```
