
A library that generates an interactive radar, inspired by [thoughtworks.com/radar](http://thoughtworks.com/radar).

This modified code is inspired of the work of Jeff Grunewald - https://github.com/jeffgrunewald/techradar

### Setting up your data
Unlike the original BYOR from Thoughtworks this modified version don't use Google spreadsheet og csv as datasource.
The data source for the radar is a versioned json-file in the `data` folder.

Example:

```json
[
  {
    "name": "Applying product management to internal platforms",
    "ring": "Adopt",
    "quadrant": "Techniques",
    "isNew": "FALSE",
    "description": "<p>More and more companies are building internal platforms to roll out new digital solutions quickly and efficiently. Companies that succeed with this strategy are <strong>applying product management to internal platforms</strong>. This means establishing empathy with internal consumers (the development teams) and collaborating with them on the design. Platform product managers create roadmaps and ensure the platform delivers value to the business and enhances the developer experience. Unfortunately, we're also seeing less successful approaches, where teams create a platform in the void, based on unverified assumptions and without internal customers. These platforms, often despite aggressive internal tactics, end up being underutilized and a drain on the organization's delivery capability. As usual, good product management is all about building products that consumers love.</p>"
  },
  {
    "name": "Infrastructure as code",
    "ring": "Adopt",
    "quadrant": "Techniques",
    "isNew": "FALSE",
    "description": "<p>Although <strong>infrastructure as code</strong> is a relatively old technique (we’ve featured it in the Radar in 2011), it has become vitally important in the modern cloud era where the act of setting up infrastructure has become the passing of configuration instructions to a cloud platform. When we say \"as code\" we mean that all the good practices we've learned in the software world should be applied to infrastructure. Using source control, adhering to the <a href=\"https://en.wikipedia.org/wiki/Don%27t_repeat_yourself\">DRY principle</a>, modularization, maintainability, and using automated testing and deployment are all critical practices. Those of us with a deep software and infrastructure background need to empathize with and support colleagues who do not. Saying \"treat infrastructure like code\" isn't enough; we need to ensure the hard-won learnings from the software world are also applied consistently throughout the infrastructure realm.</p>"
  },
  {
    "name": "Micro frontends",
    "ring": "Adopt",
    "quadrant": "Techniques",
    "isNew": "FALSE",
    "description": "<p>We've seen significant benefits from introducing <a href=\"https://martinfowler.com/articles/microservices.html\">microservices</a>, which have allowed teams to scale the delivery of independently deployed and maintained services. Unfortunately, we've also seen many teams create a front-end monolith — a large, entangled browser application that sits on top of the back-end services — largely neutralizing the benefits of microservices. <strong>Micro frontends</strong> have continued to gain in popularity since they were first introduced. We've seen many teams adopt some form of this architecture as a way to manage the complexity of multiple developers and teams contributing to the same user experience. In June of last year, one of the originators of this technique published an <a href=\"https://martinfowler.com/articles/micro-frontends.html\">introductory article</a> that serves as a reference for micro frontends. It shows how this style can be implemented using various web programming mechanisms and builds out an example application using <a href=\"/radar/languages-and-frameworks/react-js\">React.js</a>. We're confident this style will grow in popularity as larger organizations try to decompose UI development across multiple teams.</p>"
  },
  {
    "name": "Pipelines as code",
    "ring": "Adopt",
    "quadrant": "Techniques",
    "isNew": "FALSE",
    "description": "<p>The <strong>pipelines as code</strong> technique emphasizes that the configuration of delivery pipelines that build, test and deploy our applications or infrastructure should be treated as code; they should be placed under source control and modularized in reusable components with automated testing and deployment. As organizations move to decentralized autonomous teams building <a href=\"https://martinfowler.com/articles/microservices.html\">microservices</a> or <a href=\"/radar/techniques/micro-frontends\">micro frontends</a>, the need for engineering practices in managing pipelines as code increases to keep building and deploying software consistent within the organization. This need has given rise to delivery pipeline templates and tooling that enable a standardized way to build and deploy services and applications. Such tools use the <em>declarative delivery pipelines</em> of applications, adopting a pipeline blueprint to execute the underlying tasks for various stages of a delivery lifecycle such as build, test and deployment; and they abstract away implementation details. The ability to build, test and deploy pipelines as code should be one of the evaluation criteria for choosing a CI/CD tool.</p>"
  }
]
```

## Docker Image
We have released BYOR as a docker image for our users. The image is available in our [DockerHub Repo](https://hub.docker.com/r/wwwthoughtworks/build-your-own-radar/). To pull and run the image, run the following commands.

```
$ docker pull wwwthoughtworks/build-your-own-radar
$ docker run --rm -p 8080:80 -e SERVER_NAMES="localhost 127.0.0.1" wwwthoughtworks/build-your-own-radar
$ open http://localhost:8080
```

## Contribute

All tasks are defined in `package.json`.

Pull requests are welcome; please write tests whenever possible. 
Make sure you have nodejs installed.

- `git clone git@github.com:thoughtworks/build-your-own-radar.git`
- `npm install`
- `npm test` - to run your tests
- `npm run dev` - to run application in localhost:8080. This will watch the .js and .css files and rebuild on file changes

To run End to End tests in headless mode
- add a new environment variable 'TEST_URL' and set it to 'http://localhost:8080/'
- `npm run end_to_end_test`

To run End to End tests in debug mode
- add a new environment variable 'TEST_URL' and set it to 'http://localhost:8080/'
- `npm run start`
- Click on 'Run all specs' in cypress window

### Don't want to install node? Run with one line docker

     $ docker run -p 8080:8080 -v $PWD:/app -w /app -it node:10.15.3 /bin/sh -c 'npm install && npm run dev'

***Note***: If you are facing Node-sass compile error while running, please prefix the command `npm rebuild node-sass` before `npm run dev`. like this
```
npm install && npm rebuild node-sass && npm run dev
```

After building it will start on `localhost:8080`
