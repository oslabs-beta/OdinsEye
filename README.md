<a name="readme-top"></a>
<br />
<div align="center">
  <a href="https://github.com/oslabs-beta/OdinsEye">
    <img src="client/images/odin-logo.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Odin's Eye</h3>

<br>
Monitoring tool for Kubernetes and Containerized MongoDB



<b>Prerequisites</b>
Before firing up and installing Odin's Eye, please make sure to have...
1) Your Kuberenetes clusters set up and ports open
2) Create a Prometheus deployment - with ports properly forwarded: https://github.com/prometheus-community/helm-charts/tree/main/charts/kube-prometheus-stack
<br> a) ```Terminal: helm install prometheus prometheus-community/kube-prometheus-stack```
<br> b) ```kubectl port-forward service/prometheus-kube-prometheus-prometheus 9090```
3) Set up MongoDB exporter with appropriate setting: 
 <br> a) ```helm install exporter prometheus-community/prometheus-mongodb-exporter -f mongodb-exporter-values.yaml```




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
npm run build 
```

4.  Start the application server

```sh
npm run start
```

5. Navigate to http://localhost:7070



<b>Authors <b>
- Peter Choi [@prismatism](https://github.com/prismatism) | [Linkedin](https://www.linkedin.com/in/peterchoi3000/)
- Emily Chu [@emmychu](https://github.com/emmychu) | [Linkedin](https://www.linkedin.com/in/lin-chu-pharmd/)
- Chris Hicks [@chrishicks430](https://github.com/chrishicks430) | [Linkedin](https://www.linkedin.com/in/chrishicks430/)
- Wendy Zheng [@wzhengg99](https://github.com/wzhengg99) | [Linkedin](https://www.linkedin.com/in/wzheng208/)


<b>Show your support  <br>
Give a ⭐️ if this project helped you!

<p align="right">(<a href="#readme-top">back to top</a>)</p>