# SOLUCIÓN PRUEBA TÉCNICA:PROCESO DE SELECCIÓN/ DESARROLLADOR FULL STACK

Esta prueba fue desarrollada por mi persona Santiago Cardenas el día 12 de octubre de 2024 para la empresa punto red. Creo que no revisaron esto, ya no importa, Se median 3 niveles: 
Nivel 1: Almacenar cada transacción en BD y listar esa informacion.
Nivel 2: Creación de una web conectada al api, mostrar la información del ticket y ver el modulo para consultar la transacción. (Un post y un get, lo normal).
Nivel 3: Hostear todo (Quedo en... en las urls, lee).

## Tecnologias usadas

#### Front end
`React` `Axios` `TailwindCSS`

#### Back end
`Spring Boot` `MySQL` `Java v17`

## ¿Cómo iniciar el proyecto de forma local?

Construí el proyecto para que se trabajase con la versión 21 de java, sin embargo al momento de subirlo al servidor fue necesario bajar la versión a la 17, aun asi el proyecto funciona con ambas versiones.

Para iniciar el backend, simplemente dirígete a la clase de PrApplication y corre la clase.

En el caso del front end, al ser una aplicación react, es necesario que uses los comandos `npm install` y `npm run serve`.

No olvides encender el servidor de la base de datos, en mi caso he utilizado xampp, y como comenté al inicio la base de datos es MySQL, no es necesario crear la BD, puesto que para ello puse el parametro: `createDatabaseIfNotExist=true`.

Esto permitirá que la aplicación funcione correctamente en su entorno local!

## Estructura Back end

Solamente hay un controlador nombrado `Transaction`, esto por ser un proyecto pequeño, el controlador tiene los endpoints para generar una compra `buy` (servicio Punto red), obtener los proveedores `suppliers` (servicio Punto red) y obtener las transacciones `Transaction` (Base de datos).

Dentro de la carpeta helpers veras el servicio e interfaz para la conexión con el API de punto red.

Dentro de enties and repositories veras la entidad, servicio y repositorio de la unica tabla que tiene la base de datos nombrada `Transaction`.

### Endpoints

GET https://punto-red-backend-production.up.railway.app/transaction/transactions

GET https://punto-red-backend-production.up.railway.app/transaction/suppliers

POST https://punto-red-backend-production.up.railway.app/transaction/buy

## Script de la base de datos

Las migraciones de base de datos están gestionadas con Flyway, lo que asegura que el esquema de la base de datos evolucione de manera controlada. Las migraciones se encuentran en el directorio `bd`.

## Demo

**Front end:** https://solucionpruebapuntoredsc.netlify.app/
**Back end:** https://punto-red-backend-production.up.railway.app/transaction/suppliers

Desarrollado por <a href="https://santic.netlify.app/">Santiago Cardenas</a>.



**Nota personal:** No olvidar! --> Esta es la ultima prueba que realizo, el código vale y el tiempo mas. Solo, me canse de seguir haciendo pruebas, me canse de perder el tiempo, no encuentro la motivación para seguir haciendo estas pruebas tecnicas, tener entrevistas y perder mi tiempo, 6 dias haciendo una  prueba tecnica, una hora de prueba teorica, preguntas de cómo has estado (bien), como te ves en 3 años (como un gran profesional), por que quieres trabajar (Siempre me ha interesado no morirme de hambre).... y el resultado es que hay alguien con 7 años de experiencia que tiene toda la teoria de wikipedia y cobra el minimo en COP. Si eres alguna persona que se siente igual, no importa sigue adelante y... **Recuerda:** 나 엿먹지마, 집중하고 계속해
