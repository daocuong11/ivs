const express = require("express");
const cors = require("cors");
const { Sequelize, DataTypes } = require('sequelize');
const auth = require("./basicAuth");


const sequelize = new Sequelize('temp', 'root', 'mypassword', {
  host: 'localhost',
  dialect: 'mysql',
  timestamps: false,
  logging: true
});

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING
  }
}, {
  timestamps: false
});

// Need to run any time sync data
// sequelize.sync().then(() => {
//   console.log('Table created successfully!');
// }).catch((error) => {
//   console.error('Unable to create table : ', error);
// });

const app = express();

(async () => {
  await test();
})();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.post('/register', async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;

  const user = User.build({ name, email });
  await user.save();

  res.send({ isSuccess: true });
});

app.use(['/all-users', '/all-names'], function (req, res, next) {
  auth(req, res, next);
});

app.get('/all-users', async (req, res) => {
  let users = await User.findAll();
  res.send({ isSuccess: true, users });
});

app.get('/all-names', async (req, res) => {
  let users = await User.findAll({
    attributes: ['name']
  });
  res.send({ isSuccess: true, users });
});

app.listen(3001, () => {
  console.log("running server");
});


async function test() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
