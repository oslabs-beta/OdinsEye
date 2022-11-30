<a name="readme-top"></a>
<br />
<div align="center">
  <a href="https://github.com/oslabs-beta/OdinsEye">
    <img src="client/images/odin-logo.png" alt="Logo" width="80" height="80">
  </a>

<h2 align="center">Odin's Eye</h2>

<br>
Monitoring Tool for Kubernetes and Containerized MongoDB
</div>



## Prerequisites

1) A Kuberenetes cluster set up with ports open

2) A Prometheus deployment - with ports properly forwarded: https://github.com/prometheus-community/helm-charts/tree/main/charts/kube-prometheus-stack
<br> a) ```helm install prometheus prometheus-community/kube-prometheus-stack```
<br> b) ```kubectl port-forward service/prometheus-kube-prometheus-prometheus 9090```

3) MongoDB metrics exported to prometheus: 
 <br> a) ```helm install exporter prometheus-community/prometheus-mongodb-exporter```

Refer to the help directory for a step-by-step walkthrough


## Installation

1.  Clone this repository onto your local machine

```sh
 git clone https://github.com/oslabs-beta/OdinsEye.git
```

2.  Install dependencies

```sh
npm install 
```

3.  Start the application server

```sh
npm run start
```

4. Navigate to http://localhost:3000

## Technologies

- [React](https://reactjs.org/)
- [Redux](https://redux.js.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Chart.js](https://www.chartjs.org/)
- [Kubernetes](https://kubernetes.io/)
- [Docker](https://www.docker.com/)
- [Node](https://nodejs.org/en/)
- [Prometheus/PromQL](https://prometheus.io/)

## Authors
- Peter Choi [@prismatism](https://github.com/prismatism) | [Linkedin](https://www.linkedin.com/in/peterchoi3000/)
- Emily Chu [@emmychu](https://github.com/emmychu) | [Linkedin](https://www.linkedin.com/in/lin-chu-pharmd/)
- Chris Hicks [@chrishicks430](https://github.com/chrishicks430) | [Linkedin](https://www.linkedin.com/in/chrishicks430/)
- Wendy Zheng [@wzhengg99](https://github.com/wzhengg99) | [Linkedin](https://www.linkedin.com/in/wzheng208/)



<b>Show your support  <br>
Give a ⭐️ if this project helped you!

<p align="right">(<a href="#readme-top">back to top</a>)</p>