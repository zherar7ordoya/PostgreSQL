# Quickstart with SQLite

In this Quickstart guide, you'll learn how to get started with Prisma ORM from scratch using a plain TypeScript project and a local SQLite database file. It covers data modeling, migrations and querying a database.

If you want to use Prisma ORM with your own PostgreSQL, MySQL, MongoDB or any other supported database, go here instead:

* [Start with Prisma ORM from scratch](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases-typescript-postgresql)
* [Add Prisma ORM to an existing project](https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/relational-databases-typescript-postgresql)



# Prerequisites

You need Node.js installed on your machine (see system requirements for officially supported versions).



## 1. Create TypeScript project and set up Prisma ORM

As a first step, create a project directory and navigate into it:

```bash
mkdir hello-prisma
cd hello-prisma
```

Next, initialize a TypeScript project using npm:

```bash
npm init -y
npm install typescript tsx @types/node --save-dev
```

This creates a `package.json` with an initial setup for your TypeScript app.

> See [installation instructions](https://www.prisma.io/docs/orm/tools/prisma-cli#installation) to learn how to install Prisma using a different package manager.

Now, initialize TypeScript:

```bash
npx tsc --init
```

Then, install the Prisma CLI as a development dependency in the project:

```bash
npm install prisma --save-dev
```

Finally, set up Prisma ORM with the init command of the Prisma CLI:

```bash
npx prisma init --datasource-provider sqlite --output ../generated/prisma
```


---


## NOTA

La salida provee unos pasos a hacer antes de continuar:

```bash
Environment variables declared in the `.env` file are NOT automatically loaded by Prisma.
See: https://pris.ly/prisma-config-env-vars.

Next steps:
1. Install `dotenv`, and add `import "dotenv/config";` to your `prisma.config.ts` file to load environment variables from `.env`.
2. Set the DATABASE_URL in the .env file to point to your existing database. If your database has no tables yet, read https://pris.ly/d/getting-started
3. [...]
```

Es decir, antes de continuar, instalar:

```bash
npm install dotenv --save
```

Luego, agregar a `prisma.config.ts`:

```typescript
import 'dotenv/config'
```

Luego, para acallar los errores, modificar en `package.json`:

```json
"type": "module"
```
---


This creates a new `prisma` directory with a `schema.prisma` file and configures SQLite as your database. You're now ready to model your data and create your database with some tables.



# 2. Model your data in the Prisma schema

The Prisma schema provides an intuitive way to model data. Add the following models to your `schema.prisma` file:

`prisma/schema.prisma`

```prisma
model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  name  String?
  posts Post[]
}

model Post {
  id        Int     @id @default(autoincrement())
  title     String
  content   String?
  published Boolean @default(false)
  author    User    @relation(fields: [authorId], references: [id])
  authorId  Int
}
```

Models in the Prisma schema have two main purposes:

* Represent the tables in the underlying database
* Serve as foundation for the generated Prisma Client API

In the next section, you will map these models to database tables using Prisma Migrate.



## 3. Run a migration to create your database tables with Prisma Migrate

At this point, you have a Prisma schema but no database yet. Run the following command in your terminal to create the SQLite database and the `User` and `Post` tables represented by your models:

```bash
npx prisma migrate dev --name init
```

This command did three things:

1. It created a new SQL migration file for this migration in the `prisma/migrations` directory.
2. It executed the SQL migration file against the database.
3. It ran `prisma generate` under the hood (which installed the `@prisma/client` package and generated a tailored Prisma Client API based on your models).

> **NOTA:** Esto aún queda por dilucidar porque, formalmente, no se ha instalado a `@prisma/client`. Sin embargo, no hago más observaciones porque, en esta guía oficial, a continuación se procede a dicha instalación (es de notar que tal vez la guía se remonta a la época en la que la instalación por defecto estaba montada sobre JavaScript).

Because the SQLite database file didn't exist before, the command also created it inside the `prisma` directory with the name `dev.db` as defined via the environment variable in the .env file.

Congratulations, you now have your database and tables ready. Let's go and learn how you can send some queries to read and write data!



## 4. Explore how to send queries to your database with Prisma Client

To get started with Prisma Client, you need to install the @prisma/client package:

```bash
npm install @prisma/client
```

The install command invokes `prisma generate` for you which reads your Prisma schema and generates a version of Prisma Client that is *tailored (adaptada)*  to your models.

To send queries to the database, you will need a TypeScript file to execute your Prisma Client queries. Create a new file called `script.ts'  for this purpose:

```bash
touch script.ts
```

---
**NOTA**
> Eso es para Linux. Para Windows es:
> * Command Prompt: `type nul > script.ts`
> * PowerShell: `$null > script.ts`
---

Then, paste the following boilerplate into it:

`script.ts`

```typescript
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // ... you will write your Prisma Client queries here
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
  ```

> **NOTA:** En este punto, se produjo otro error. La IA lo resolvió y le pedí que haga un reporte al final de este documento (véase **Changes made by assistant**).

This code contains a `main` function that's invoked at the end of the script. It also instantiates `PrismaClient` which represents the query interface to your database.



### 4.1. Create a new User record

Let's start with a small query to create a new User record in the database and log the resulting object to the console. Add the following code to your `script.ts file:

```typescript
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.create({
    data: {
      name: 'Alice',
      email: 'alice@prisma.io',
    },
  })
  console.log(user)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
```

Instead of copying the code, you can type it out in your editor to experience the autocompletion Prisma Client provides. You can also actively invoke the autocompletion by pressing the CTRL+SPACE keys on your keyboard.

Next, execute the script with the following command:

```bash
npx tsx script.ts
```

Show CLI results:
```bash
{ id: 1, email: 'alice@prisma.io', name: 'Alice' }
```
Great job, you just created your first database record with Prisma Client! 🎉

In the next section, you'll learn how to read data from the database.



### 4.2. Retrieve all User records

Prisma Client offers various queries to read data from your database. In this section, you'll use the `findMany` query that returns *all* the records in the database for a given model.

Delete the previous Prisma Client query and add the new `findMany` query instead:

`script.ts`

```typescript
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const users = await prisma.user.findMany()
  console.log(users)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
```

Execute the script again:

```bash
npx tsx script.ts
```

Show CLI results:

```bash
[{ id: 1, email: 'alice@prisma.io', name: 'Alice' }]
```

Notice how the single `User` object is now enclosed with **square brackets** in the console. That's because the `findMany` returned an array with a single object inside.



### 4.3. Explore relation queries with Prisma Client

One of the main features of Prisma Client is the ease of working with [relations](https://www.prisma.io/docs/orm/prisma-schema/data-model/relations). In this section, you'll learn how to create a `User` and a `Post` record in a nested write query. Afterwards, you'll see how you can retrieve the relation from the database using the `include` option.

First, adjust your script to include the nested query:

`script.ts`

```typescript
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.create({
    data: {
      name: 'Bob',
      email: 'bob@prisma.io',
      posts: {
        create: [
          {
            title: 'Hello World',
            published: true
          },
          {
            title: 'My second post',
            content: 'This is still a draft'
          }
        ],
      },
    },
  })
  console.log(user)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
```

Run the query by executing the script again:

`npx tsx script.ts`

Show CLI results:

`{ id: 2, email: 'bob@prisma.io', name: 'Bob' }`

By default, Prisma Client only returns *scalar* fields in the result objects of a query. That's why, even though you also created a new Post record for the new User record, the console only printed an object with three scalar fields: `id`, `email` and `name`.

In order to also retrieve the `Post` records that belong to a `User`, you can use the **include** option via the `posts` relation field:

`script.ts`

```typescript
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const usersWithPosts = await prisma.user.findMany({
    include: {
      posts: true,
    },
  })
  console.dir(usersWithPosts, { depth: null })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
```

Run the script again to see the results of the nested read query:

```bash
npx tsx script.ts
```

Show CLI results:

```bash
[
  { id: 1, email: 'alice@prisma.io', name: 'Alice', posts: [] },
  {
    id: 2,
    email: 'bob@prisma.io',
    name: 'Bob',
    posts: [
      {
        id: 1,
        title: 'Hello World',
        content: null,
        published: true,
        authorId: 2
      },
      {
        id: 2,
        title: 'My second post',
        content: 'This is still a draft',
        published: false,
        authorId: 2
      }
    ]
  }
]
```

This time, you're seeing two `User` objects being printed. Both of them have a `posts` field (which is empty for `"Alice"` and populated with two `Post` objects for `"Bob"`) that represents the `Post` records associated with them.

Notice that the objects in the `usersWithPosts` array are fully typed as well. This means you will get autocompletion and the TypeScript compiler will prevent you from accidentally typing them.



# 5. Next steps

In this Quickstart guide, you have learned how to get started with Prisma ORM in a plain TypeScript project. Feel free to explore the Prisma Client API a bit more on your own, e.g. by including filtering, sorting, and pagination options in the `findMany` query or exploring more operations like update and delete queries.

**Explore the data in Prisma Studio**

Prisma ORM comes with a built-in GUI to view and edit the data in your database. You can open it using the following command:

```bash
npx prisma studio
```

---

See the detailed post-action audit and recommendations in `POST-ACTION-REPORT.md` (new file added alongside this README).
 
---



# Changes made by assistant

The following small, non-invasive edits were made to get the TypeScript project to type-check and to make the generated Prisma Client import resolve correctly.

- `script.ts`
  - Changed the import to point directly at the generated client file with an explicit `.js` extension:
  - Before: `import { PrismaClient } from './generated/prisma'`
    - After:  `import { PrismaClient } from './generated/prisma/client.js'`
  - Why: the generated output contains `client.ts` (no folder-level index), and with `tsconfig` using `module: "nodenext"` TypeScript/Node require explicit `.js` extensions for ESM imports in source files. Importing the specific `client.js` path matches Node's ESM resolution and avoids unresolved-module errors.

- `tsconfig.json`
  - Changed the `types` array to include Node types:
    - Before: `"types": []`
    - After:  `"types": ["node"]`
  - Why: your project uses Node globals like `process`. Adding Node type declarations (you already have `@types/node` in devDependencies) makes TypeScript aware of those globals (e.g., `process.exit`) and removes related type errors.

Other notes and verification

- I ran a TypeScript type-check to verify the edits:

```powershell
npx tsc --noEmit
```

- Result: no TypeScript errors reported after the changes.

Recommendations

- For a typical app, prefer importing from the published `@prisma/client` package instead of the generated folder path. Example:

```ts
import { PrismaClient } from '@prisma/client'
```

  This avoids depending on a generated folder layout and is the standard approach when `prisma generate` is used.

- If you ever re-run `prisma generate`, avoid editing generated files directly — prefer adjusting your source imports or adding a small wrapper file in your source tree that re-exports the client (so generated files remain untouched).

If you'd like, I can:

- Replace the `./generated/prisma/client.js` import with `@prisma/client` and show the minimal edits.
- Add a short example query to `script.ts` so you can test the DB connection immediately.

End of automated edits.



# Final note — why the `@prisma/client` import is better

I switched the example and project code to import the client from the published package:

```ts
import { PrismaClient } from '@prisma/client'
```

Why this is better:

- Stability: `@prisma/client` is the canonical package that `prisma generate` installs and maintains. It provides a stable import surface that won't break when Prisma regenerates client files.
- Encapsulation: Using the package hides the internal layout of generated files (no reliance on `generated/prisma/client.js` or any folder index). That prevents accidental coupling to generator internals.
- Types and tooling: The package ships with the correct TypeScript types and works well with module resolution and bundlers. It also integrates naturally with Node/Electron/Cloud environments.
- Simplicity: Importing from `@prisma/client` is the standard documented approach and keeps examples consistent with most community and official code samples.

Verification:

- I ran a TypeScript type-check after the change:

```powershell
npx tsc --noEmit
```

- Result: no TypeScript errors.

If you want, I can add a tiny `script.ts` example that performs a simple create/find query so you can run `npx tsx script.ts` and see the DB interaction end-to-end.