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


## Authors
- Peter Choi [@prismatism](https://github.com/prismatism) | [Linkedin](https://www.linkedin.com/in/peterchoi3000/)
- Emily Chu [@emmychu](https://github.com/emmychu) | [Linkedin](https://www.linkedin.com/in/lin-chu-pharmd/)
- Chris Hicks [@chrishicks430](https://github.com/chrishicks430) | [Linkedin](https://www.linkedin.com/in/chrishicks430/)
- Wendy Zheng [@wzhengg99](https://github.com/wzhengg99) | [Linkedin](https://www.linkedin.com/in/wzheng208/)


## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<b>Show your support  <br>
Give a ⭐️ if this project helped you!

<p align="right">(<a href="#readme-top">back to top</a>)</p>