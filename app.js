require('dotenv').config();
require('express-async-errors');

const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');

const swaggerUi = require('swagger-ui-express');
const yaml = require('yamljs')
const swaggerDocs = yaml.load('./swagger.yaml');

const express = require('express');
const app = express();
const conectDB = require('./db/connect');
const authRouter = require('./routes/auth');
const jobRouter = require('./routes/jobs');
const auth = require('./middleware/authentication');

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');


app.set('trust proxy', 1);
app.use(rateLimiter({
  windowMs: 15* 60 *1000, max: 100
}));
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());
// extra packages

app.get('/', (req,res) => res.send('<h1>jobs api</h1><a href="/api-docs">Documentation</a>'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', auth, jobRouter);


app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await conectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
