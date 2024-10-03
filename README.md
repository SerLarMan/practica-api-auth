# Tienda Api Rest Auth

Proyecto api rest para centrarse en la autentificación de usuario. Emula en cierta medida una página para comprar videojuegos como por ejemplo Instant Gaming o Steam.
Se conecta a una base de datos MongoDB e interactua con tres modelos:

- Users
- Orders
- Products

El modelo de Users tiene una colección de Orders con la fecha en la que se hizo la orden y Orders a su vez tiene una colección de Products. De esta manera el usuario hace ordenes que contienen productos para realizar una compra.

## Instalación

Este proyecto requiere [Node.js](https://nodejs.org/) v10+ para funcionar.

Instala las dependencias y las dependencias de desarrollo.

```sh
cd practica-api-rest
npm i
```

Para poblar la colección de productos.

```sh
npm run seed
```

Para arrancar el servidor en localhost en el puerto 3000.

```sh
npm run start
```

## Endpoints

Como esta indicado antes, esta api trabaja con tres modelos.
A continuación se listaran las rutas y los endpoints para poder interactuar con ellos.

### User

```sh
127.0.0.1:3000/users
```

| Método | Ruta | Cuerpo | Descripción |
| ------ | ------ | ------ | ------ |
| GET | / | | Obtiene todos los usuarios |
| GET | /:id | | Obtiene el usuarios seleccionado por la id |
| POST | /register | Objeto User | Registra un usuario nuevo |
| POST | /login | email y pass | Logea a un usuario y devuelve un token de autentificación |
| PUT | /:id | Objeto User | Actualiza un usuarios por su id |
| DELETE | /:id | | Borra un usuarios por su id |

### Order

```sh
127.0.0.1:3000/orders
```

| Método | Ruta | Cuerpo | Descripción |
| ------ | ------ | ------ | ------ |
| GET | / | | Obtiene todas las ordenes |
| GET | /:id | | Obtiene la orden seleccionada por la id |
| POST | / | Objeto Order | Crea una orden nueva |
| PUT | /:id | Objeto Order | Actualiza una orden por su id |
| DELETE | /:id | | Borra una orden por su id |

### Product

```sh
127.0.0.1:3000/products
```

| Método | Ruta | Cuerpo | Descripción |
| ------ | ------ | ------ | ------ |
| GET | / | | Obtiene todos los productos |
| GET | /:id | | Obtiene el producto seleccionada por la id |
| POST | / | Objeto Product | Crea un producto nueva |
| PUT | /:id | Objeto Product | Actualiza un producto por su id |
| DELETE | /:id | | Borra un producto por su id |

## Licencia

MIT
