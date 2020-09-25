# WinAdvisor

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.2.


## Development server

You need to have a MySQL instance installed and running.
You need to have a database for this project created.
The code you will run will do the rest (create the tables and connections)
Run `npm run dev` for starting the server side code, and then:
Run `ng serve -o` to start angular development server and open the app in your default browser (http://localhost:4200)


### Code scaffolding

Run `ng generate component component-name` to generate a new component.
Run `ng g c component-name` to achieve the same thing.
Run `ng g c component-name -module=module-name` to create a component and connect it to a certain module
you can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.


#### Running test
Running unit tests:
  - `ng test` - to execute unit tests vie [Karma](https://karma-runner.github.io/latest/index.html)

Running end-to-end tests:
  - `ng e2e` - to execute end-to-end tests via [Protractor](https://www.protractortest.org/)


##### Troubleshooting

You might get an error that port 3000 is in use by another service/application.
  - The server code uses port 3000 so you need to clear it by running `npm run clearDevPort`

You might also encounter issues with NodeJS memorun limit.
  Just run `npm run fixMemoryLimit`. This will increase `max-old-space-size` to the size specified in `LIMIT` in the package.json file


For further FE issues consult the official Angular documentation (https://angular.io/docs),
or the angular material docs (https://material.angular.io/)

For BE issues, consult the NodeJS docs (https://nodejs.org),
the Express docs (https://expressjs.com/),
the MySQL docs (https://www.mysql.com/),
or the Sequelize docs (https://sequelize.org/) v5.


Have a painless development
