#!/bin/bash

echo "🔹 Installing Minikube..."

# Download Minikube

curl -Lo minikube https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64

# Make it executable

chmod +x minikube

# Move to /usr/local/bin

sudo mv minikube /usr/local/bin/

echo "✅ Minikube installed successfully"

echo "🔹 Installing kubectl..."

# Download kubectl

curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"

# Make it executable

chmod +x kubectl

# Move to /usr/local/bin

sudo mv kubectl /usr/local/bin/

echo "✅ kubectl installed successfully"

echo "🎉 Minikube and kubectl download successful!"

