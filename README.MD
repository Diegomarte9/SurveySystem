# Sistema de encuestas en HTML, CSS, JS, NODE.JS, EXPRESS
Hola esta es un introduccion a este sistema de encuestas inteligente.

El sistema tiene las siguientes funciones.

1- Una pestaña Home simple la cual tiene un boton que nos llevara al login.
2- En la pestaña login tenemos un cuadro para el login y otro para registro ambos funcionales y pueden modificarse su backend desde authController.js.

## Creacion de la base de datos local.

Dentro de la carpeta src/database, encontraremos un archivo llamado createdb.js.

Este script nos creara la base de datos llamada SurveySystem de manera automatica de manera local.

#### Tomar en cuenta que debes de colocar tus credenciales de postgreSQL, pero los puertos y nombre de base de datos se mantienen igual.

## Configuracion de archivo .env

### Configuración de PostgreSQL
DB_USER= Tu usuario
DB_HOST=localhost
DB_NAME=SurveySystem
DB_PASSWORD= Tu contraseña
DB_PORT=5432

### Puerto del servidor
PORT=3000