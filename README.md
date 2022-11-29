# [Odin's Eye](https://) 
Odin's Eye <br>
Visualization tool for Kubernetes and Containerized MongoDB

NOTE: The initial instructions below are meant to get you in and testing the development version of VaaS on your local machine as quickly as possible

<b>Prerequisites</b>
Before firing up and installing Odin's Eye, please make sure to have...
1) your Kuberenetes clusters set up and ports open
2) create a Prometheus deployment - with ports properly forwarded: https://github.com/prometheus-community/helm-charts/tree/main/charts/kube-prometheus-stack
<br> a) ```Terminal: helm install prometheus prometheus-community/kube-prometheus-stack --namespace=prometheus --create-namespace```
<br> b) ```kubectl port-forward service/prometheus-kube-prometheus-prometheus -n prometheus 9090```
3) Set up MongoDB exporter: 
 <br> a) ```helm install exporter prometheus-community/prometheus-mongodb-exporter -f mongodb-exporter-values.yaml```
4) 



<b>Installation</b> 

1.  Clone this repository onto your local machine

```sh
 git clone https://github.com/oslabs-beta/OdinsEye.git
```

2.  Install dependencies

```sh
npm install 
```

3. Build

```sh
npm build 
```

4.  Run the app with

```sh
npm start
```
Set up order:
You will need to port-forward Promethesus on port 9090







<b>Authors <b>
- Peter Choi [@Radizorit](https://github.com/Radizorit) | [Linkedin](https://www.linkedin.com/in/jimmy-l-625ba98b/)
- Emily Chu [@AlexKaneps](https://github.com/AlexKaneps) | [Linkedin](https://www.linkedin.com/in/alex-kaneps/)
- Chris Hicks [@j-chany](https://github.com/j-chany) | [Linkedin](https://www.linkedin.com/in/james-c-694018b5/)
- Wendy Zheng [@vduong021](https://github.com/vduong021) | [Linkedin](https://www.linkedin.com/in/vu-duong/)


<b>Show your support  <br>
Give a ⭐️ if this project helped you!