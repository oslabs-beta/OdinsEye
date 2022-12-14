<b>Set Up</b> 

1. Download and install Docker: https://docs.docker.com/get-docker/

2. Download and install minikube: https://minikube.sigs.k8s.io/docs/start/ 

```sh
brew install minikube
```

3. Install Kubectl: https://kubernetes.io/docs/tasks/tools/ 

```sh
brew install kubectl
```

4. Install Helm

5. Add Prometheus Community Helm Repo: https://github.com/prometheus-community/helm-charts/

```sh
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
```

6. Start minikube

```sh
minikube start
```

7. helm install prometheus - replace the release field with the desired name for your prometheus monitoring pod, note that this will affect the command used to forward the port in the next step.

```sh
helm install [release] prometheus-community/kube-prometheus-stack --namespace=prometheus --create-namespace --wait
```

8. Port forward prometheus to 9090

```sh
kubectl port-forward service/[release]-kube-prometheus-prometheus -n prometheus 9090
```

9. Apply mongodb

```sh
kubectl apply -f mongodb.yaml —-namespace=prometheus
```

10. helm install mongodb metric exporter

```sh
helm install [release] prometheus-community/prometheus-mongodb-exporter --namespace=prometheus -f exporter-values.yaml
```
