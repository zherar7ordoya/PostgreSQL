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

## ¿Qué se instala cuando se instala?

En la carpeta `node_modules\.bin` podemos ver que tenemos un nuevo comando: `prisma`.
Es decir, cuando hago `npx prisma [...]`, estoy ejecutando "localmente" ese ejecutable.


# Inicialización

`npx prisma init`: Iniciará el proyecto Prisma con la BBDD por defecto: Postgres. Para definir otra BBDD, deberá usarse: `npx prisma init --datasource-provider sqlite`.

> El archivo .env tendrá: `DATABASE_URL="file:./dev.db"`


# Modelos

Una migración es, simplemente, la conversión del modelo a tablas SQL: `npx prisma migrate dev` (`migrate` necesita saber si estamos en producción o desarrollo).

## Nota sobre variables de entorno

Si usas un archivo `.env` para declarar `DATABASE_URL`, y tu configuración de Prisma está en TypeScript (por ejemplo `prisma.config.ts`), Prisma no cargará automáticamente las variables desde `.env` cuando el archivo de configuración se ejecute.

La forma más simple y recomendada de asegurarse de que `DATABASE_URL` esté disponible es agregar esta línea al principio de `prisma.config.ts`:

```ts
import "dotenv/config";
```

Esto carga las variables de entorno del `.env` antes de que Prisma lea `env("DATABASE_URL")`. Alternativamente, puedes exportar la variable en tu shell antes de ejecutar comandos de Prisma.

## Ejemplo para crear una migración

1. Ejecuta `npx prisma migrate dev`.
2. Ingresa un nombre para la migración (por ejemplo `init`).

## Scripts útiles de npm

He añadido algunos scripts de conveniencia a `package.json` para ejecutar las tareas de Prisma más habituales desde `npm`:

- `npm run generate` — genera el cliente de Prisma (equivalente a `npx prisma generate`).
- `npm run migrate` — ejecuta `prisma migrate dev` y aplicará las migraciones en desarrollo.
- `npm run studio` — abre Prisma Studio (`prisma studio`).

Ejemplo (PowerShell):

```powershell
# Generar cliente
npm run generate

# Ejecutar migraciones de desarrollo (te pedirá un nombre para la migración)
npm run migrate

# Abrir Prisma Studio
npm run studio
```


# Crear Datos

