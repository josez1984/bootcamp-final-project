module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
    logging: false
  }
};

// {
//   "development": {
//     "username": "postgres",
//     "password": null,
//     "database": "trademe",
//     "host": "127.0.0.1",
//     "port": 5432,
//     "dialect": "postgres"
//   },
//   "test": {
//     "username": "postgres",
//     "password": null,
//     "database": "trademe",
//     "host": "127.0.0.1",
//     "port": 5432,
//     "dialect": "postgres"
//   },
//   "production": {
//     "username": "postgres",
//     "password": null,
//     "database": "trademe",
//     "host": "127.0.0.1",
//     "port": 5432,
//     "dialect": "postgres"
//   }
// }

// DB_USER=postgres
// DB_PASSWORD=Brenjose1102
// DB_HOST=127.0.0.1
// DB_NAME=trademe
// DB_PORT=5432
// SECRET=MyKidsAreMyLife
// CLOUDINARY_URL='cloudinary://422555281449458:vyFyUyjsqANfjAj0SYbtBxrl7wY@horqnq3wz'
// CLOUDINARY_API_KEY=422555281449458
// CLOUDINARY_API_SECRET=vyFyUyjsqANfjAj0SYbtBxrl7wY
// CLOUDINARY_CLOUD_NAME=horqnq3wz
