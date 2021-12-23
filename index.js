const express = require('express');
const cors = require('cors');
const taskgroups = require('./src/routes/taskgroups.router');
const tasks = require('./src/routes/tasks.router');
const keys = require('./src/routes/key.router');
const { errorLogger, errorBoomHandler, errorHandler, errorJoiHandler} = require('./src/middlewares/error.handler');

const app = express();
const PORT = process.env.PORT || 3000;

const options = {
    origin: ['http://localhost:3005','https://taskmanagerpj.netlify.app'],
    optionsSuccessStatus: 200
}

app.use(express.json());
app.use(cors(options));

app.get('/', (req, res) => {
   res.send("Task api");
});

const routerV1 = express.Router();
app.use('/api/v1', routerV1);
routerV1.use('/taskgroups', taskgroups);
routerV1.use('/tasks', tasks);
routerV1.use('/keys', keys);

app.use(errorLogger);
app.use(errorJoiHandler);
app.use(errorBoomHandler);
app.use(errorHandler);

app.get('*', (req, res) => {
    res.status(404).send("NOT FOUND");
});

app.listen(PORT);