
const DatabaseConfig = () => ({
    type: 'mysql',
    host: "us-cdbr-east-04.cleardb.com",
    port: 3306,
    database: "heroku_7ee426e82883303",
    username: "bb16479b5469ce",
    password: "2ff575c5",
    entities: [
        "dist/entity/*{.ts,.js}"
    ],
    synchronize: false,
    logging:true,
    migrationsTableName: 'migrations', // this field will be used to create the table by name of migrations. You can name it whatever you want. But make sure to use the sensible name
    migrations: [
        "dist/src/migrations/*{.ts,.js}" // This is the path to the migration files created by typeorm cli. You don't have to create dist folder. When you save file, compiled files will be stored in dist folder
    ],
    cli: {
        migrationsDir: "src/migrations" // This path will be used by typeorm cli when we create a new migration
    }
});
export default DatabaseConfig;