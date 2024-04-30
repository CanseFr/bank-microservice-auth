**RUNTIME**

1. **Install dependencies:**
```
$ npm install
```



2. **Start a PostgreSQL database with docker using:**
    - If you have a local instance of PostgreSQL running, you can skip this step. In this case, you will need to change the `DATABASE_URL` inside the `.env` file with a valid [PostgreSQL connection string](https://www.prisma.io/docs/concepts/database-connectors/postgresql#connection-details) for your database.

   - To start the application you must launch Docker deamon and follow this command line

```
$ docker-compose up -d
```

3. Apply database migrations:

Befor execute this command try to check the prisma/schema.prisma file to adjust some details if you need

```
$ npx prisma migrate dev
```
4. Start the project:
```
$ npx prisma db seed
```
5. Start the project:
```
$ npm run start:dev
or
$  nest start --watch
```

6. Access the project at http://localhost:3000/api to check swagger


8. Try to POST login un url http://localhost:3000/auth/login
```
{
    "email": "test@test.fr",
    "password": "testtesttest"
}
```
And get the auth token

9. If u want to lunch all tests (unit tests and integration tests) :
```
$ jest
```


<p align="right">(<a href="#readme-top">back to top</a>)</p>
