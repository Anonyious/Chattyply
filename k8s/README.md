# 🚀 Full-Stack Chat App Deployment Guide (Kubernetes & Docker)

Welcome to the deployment guide for a **Full-Stack Chat Application** using **Kubernetes (Kind)** and **Docker Compose**.

This guide is designed for developers who want to:
- Learn Kubernetes deployment basics
- Run a full-stack app locally
- Understand container orchestration workflows

---

## 📌 What You'll Learn

- Set up a local Kubernetes cluster using **Kind**
- Deploy a full-stack app (Frontend + Backend + MongoDB)
- Manage Kubernetes resources effectively
- Run the same app using **Docker Compose**
- Monitor the cluster using **Prometheus & Grafana**

---

## 🧰 Prerequisites

Make sure you have the following installed on your machine:

### 1. Kind (Kubernetes in Docker)

**For Linux (x86_64):**
```bash
curl -Lo ./kind [https://kind.sigs.k8s.io/dl/v0.25.0/kind-linux-amd64](https://kind.sigs.k8s.io/dl/v0.25.0/kind-linux-amd64)
chmod +x ./kind
sudo mv ./kind /usr/local/bin/kind

For Linux (ARM64):
Bash

curl -Lo ./kind [https://kind.sigs.k8s.io/dl/v0.25.0/kind-linux-arm64](https://kind.sigs.k8s.io/dl/v0.25.0/kind-linux-arm64)
chmod +x ./kind
sudo mv ./kind /usr/local/bin/kind

Verify Installation:
Bash

kind --version

2. kubectl
Bash

curl -LO "[https://dl.k8s.io/release/$(curl](https://dl.k8s.io/release/$(curl) -L -s [https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl](https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl)"
chmod +x kubectl
sudo mv kubectl /usr/local/bin/

Verify Installation:
Bash

kubectl version --client

3. Docker

Install from the official site: Docker Get Started

Verify Installation:
Bash

docker --version

4. Helm (For Monitoring Setup)

Install from the official site: Installing Helm
📥 Clone the Repository
Bash

git clone [https://github.com/iemafzalhassan/full-stack_chatApp.git](https://github.com/iemafzalhassan/full-stack_chatApp.git)
cd full-stack_chatApp/k8s
git checkout DevOps

☸️ Kubernetes Deployment (Kind)
1. Create Cluster
Bash

kind create cluster --config kind-config.yaml
kubectl cluster-info

2. Create Namespace
Bash

kubectl apply -f namespace.yaml
kubectl get ns

3. Setup Storage & Configs
Bash

kubectl apply -f mongo-pvc.yaml -n chat-app
kubectl apply -f backend-secrets.yaml -n chat-app
kubectl apply -f frontend-configmap.yaml -n chat-app

4. Deploy MongoDB
Bash

kubectl apply -f mongodb-deployment.yaml -n chat-app
kubectl apply -f mongodb-service.yaml -n chat-app

# Wait for MongoDB to be ready
kubectl wait --for=condition=Ready pods -l app=mongodb -n chat-app --timeout=120s

5. Deploy Backend
Bash

kubectl apply -f backend-deployment.yaml -n chat-app
kubectl apply -f backend-service.yaml -n chat-app

# Wait for Backend to be ready
kubectl wait --for=condition=Ready pods -l app=backend -n chat-app --timeout=120s

6. Deploy Frontend
Bash

kubectl apply -f frontend-deployment.yaml -n chat-app
kubectl apply -f frontend-service.yaml -n chat-app

# Wait for Frontend to be ready
kubectl wait --for=condition=Ready pods -l app=frontend -n chat-app --timeout=120s

🔍 Verify Deployment

Check all running resources in your namespace:
Bash

kubectl get all -n chat-app

Check Application Logs:
Bash

kubectl logs -f -l app=frontend -n chat-app
kubectl logs -f -l app=backend -n chat-app
kubectl logs -f -l app=mongodb -n chat-app

🌐 Access the Application

The application is exposed via NodePort. You can access it in your browser at:
👉 http://localhost:8080

To verify the exposed services, run:
Bash

kubectl get svc -n chat-app

📊 Monitoring (Prometheus + Grafana)

We use the kube-prometheus-stack Helm chart to quickly deploy monitoring capabilities to our Kubernetes cluster.
1. Install the Prometheus Stack
Bash

# Add the Prometheus community Helm repository
helm repo add prometheus-community [https://prometheus-community.github.io/helm-charts](https://prometheus-community.github.io/helm-charts)
helm repo update

# Install the stack into a new 'monitoring' namespace
helm install monitoring prometheus-community/kube-prometheus-stack -n monitoring --create-namespace

2. Access Grafana Dashboards

Expose the Grafana service locally:
Bash

kubectl port-forward svc/monitoring-grafana 3000:80 -n monitoring

👉 Access Grafana at: http://localhost:3000
(Default Login: Username: admin, Password: prom-operator)
🛠 Debugging

If a pod is crashing or failing to start, inspect it with:
Bash

kubectl describe pod <pod-name> -n chat-app

🧹 Cleanup

To completely remove the deployment and the cluster, run:
Bash

# Delete the namespace (removes all app resources)
kubectl delete namespace chat-app

# Delete the Kind cluster
kind delete cluster

🐳 Docker Compose (Alternative)

If you prefer to run the application without Kubernetes, you can use Docker Compose from the root directory:
Bash

docker-compose up -d --build

Access the application at 👉 http://localhost:3000 (or whichever port is defined in your docker-compose.yml).
