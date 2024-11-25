# Sistema de encuestas en HTML, CSS, JS, NODE.JS, EXPRESS
Hola esta es un introduccion a este sistema de encuestas inteligente.

El sistema tiene las siguientes funciones.

1- Una pestaña Home simple la cual tiene un boton que nos llevara al login.
2- En la pestaña login tenemos un cuadro para el login y otro para registro ambos funcionales y pueden modificarse su backend desde authController.js.

## Creacion de la base de datos local.

Dentro de la carpeta src/database, encontraremos un archivo llamado createdb.js.

Este script nos creara la base de datos llamada SurveySystem de manera automatica de manera local.

#### En caso de que este script falle hacerlo manualmente desde PostgreSQL usando el contenido de Schema.SQL en la carpeta database

## Configuracion de archivo .env
#### Se debe crear un archivo .env en la raiz del proyecto para poder conectarse con el servidor.

```bash
### Configuración de PostgreSQL
DB_USER= Tu usuario # Cambiar por tu Usuario
DB_HOST=localhost
DB_NAME=SurveySystem # Mantener este nombre
DB_PASSWORD= Tu contraseña # Cambiar por tu contraseña
DB_PORT=5432 # Cambiar solo si tu puerto de PostgreSQL es diferente.

### Puerto del servidor
PORT=3000
```
## Dependencias a instalar 

### Instala la dependencia

1. **Express-Session**

```bash
npm install express-session
```
## Inicio del Servidor 

### Para iniciar el servidor, se debe ejecutar el siguiente comando en la terminar en la carperta raiz del proyecto.

```bash
node app.js
```

#### Para reiniciar el servidor node escribir lo siguiente en la terminal:

```bash
rs
```

### Para iniciar el servidor y que se reinicie cada vez que se haga un cambio en el Backend utilizar el siguiente comando en terminal:

```bash
nodemon app.js
```

## Implementaciones y mejorar a añadir.

1- Habilitar los formularios de verificacion, ya sea: forgotpassword.html y verification.html

2- Agregar el metodo de autentificacion del usuario para el registro.

3- Hacer un cambio de diseño completo del login y el registro.

4- Habilitar el formulario de cambio de contraseña: resetpassword.html.

5- Cambiar colores en el Dashboard

6- Mejorar funcionales del Dashboard

7- Añadir pantalla de carga entre el Login y el Dashboard para dar un tiempo de carga de los elementos y una buena presentacion del dashboard

8- Organizar mejor carpeta Dashboard

9- Implementar Docker