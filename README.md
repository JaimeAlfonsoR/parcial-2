Jaime Esteban Alfonso Ruiz
202116525

Para las pruebas de postman, decidi implementar solo para los servicios que se mencionaron en el documento del parcial, dado que era los unicos que tocaba hacer y que estaban correctamente implementados. Para cada uno de estos servicios, se hico la prueba para el caso correcto y el error, ademas de validar varias de las condiciones que se impusieron en la logica como lo es que el slogan tiene que tener un largo de mas de 20 caracteres para poder crear la red social. Se realizaron las pruebas de todas las entidades y de la asociacion, esta ultima teniendo solo en cuenta el post debido a que era el unico metodo necesario. 

Para los casos de error se tenian 3 posibilidades para los codigos: 
HttpStatus.NOT_FOUND o 404
HttpStatus.PRECONDITION_FAILED o 412
HttpStatus.BAD_REQUEST o 400
Ademas del codigo 200 y 2001, usado para las transacciones exitosas, por ejemplo: ![image](https://github.com/JaimeAlfonsoR/parcial-2/assets/89108988/de9f689c-4cbc-4098-bf92-d7496c4c9f53),


por ultimo, se usaron variables de entorno para realizar las peticiones de get, delete, y las asociaciones (que en este caso era solo una), que me ayudaron a utilizar las entidades recien creadas y manipularlas en las peticiones siguientes.

![image](https://github.com/JaimeAlfonsoR/parcial-2/assets/89108988/30ef8fc9-ee18-47c9-9276-3dd35c1288a5)

Se puede ver, ademas, como el ID de cada una de las entidades creadas se asigna automaticamente.


## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
