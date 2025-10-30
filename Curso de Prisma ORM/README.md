# Intro

Prisma consta de:

1. @prisma/client
2. npx prisma migrate
3. npx prisma studio

## Modo desarrollador

Al instalar Prisma instalamos un módulo de desarrollo.
Pero si es un ORM, ¿cómo es posible que tenga ese status?
Porque Prisma instala un módulo más: Prisma/Client, y ese módulo es el que permanece en producción.

Instalación: `npm install prisma -D`

> **¿Qué se instala cuando se instala?**
En la carpeta `node_modules\.bin` podemos ver que tenemos un nuevo comando: `prisma`.
Es decir, cuando hago `npx prisma [...]`, estoy ejecutando "localmente" ese ejecutable.

# Inicialización

`npx prisma init`: Iniciará el proyecto Prisma con la BBDD por defecto: Postgres. Para definir otra BBDD, deberá usarse: `npx prisma init --datasource-provider sqlite`