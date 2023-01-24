import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import bCrypt from "bcrypt";
import dotenv from "dotenv";
import Usuario from "./DAOs/usuarios.dao.class.js";
import UsuariosSchema from "./models/usuarios.model.js";
import ProductSchema from "./models/producto.model.js";
import { createServer } from "http";
import { Server } from "socket.io";

//aqui importo el sistema de ruteo
import mainRoutes from "./routes/mainRoutes.js";

//passport imports
import passport from "passport";
import { Strategy } from "passport-local";

// PINO LOGGS

import pino from "pino";


const loggerError = pino('error.log');
const loggerWarn = pino('warning.log');
const loggerInfo = pino('info.log');

loggerError.level = 'error';
loggerWarn.level = 'warn';
loggerInfo.level = 'info';



// CONFIGURO MIS VARIABLES DE ENTORNO
dotenv.config();

const localStrategy = Strategy;

const usuario = new Usuario();

const app = express();
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// INICIO LA BASE DE DATOS!!
const connectDB = () => {
  mongoose.connect("mongodb+srv://omarurregodev:oturrego0712@normalizrcluster.u64wunr.mongodb.net/?retryWrites=true&w=majority&ssl=true");
  console.log("connected DB", "//omarurregodev:oturrego0712@normalizrcluster.u64wunr.mongodb.net/?retryWrites=true&w=majority&ssl=true");
};
connectDB();

app.use(cookieParser());
app.use(
  session({
    //MongoStorage
    store: MongoStore.create({
      mongoUrl: process.env.MongoDBURL_ATLAS,
      mongoOptions: advancedOptions,
    }),
    key: "currentSession",
    secret: process.env.SECRET_KEY_MONGO,
    cookie: {
      maxAge: 1000 * 60 * 10,
    }, // value of maxAge is defined in milliseconds.
    resave: false,
    saveUninitialized: false,
  })
);
const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);
  socket.on("disconnect", () => {
    console.log("🔥: A user disconnected");
  });
});
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST",
    credentials: true,
  })
);

//middleware passport
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static("public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header(
    "Access-Control-Allow-Methods",
    "GET,PUT,POST,DELETE,UPDATE,OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
  );
  next();
});

app.use("/api", mainRoutes);

//estrategias passport

//USER REGISTRATION
passport.use(
  "register",
  new localStrategy(
    { passReqToCallback: true },
    async (req, username, password, done) => {
      try {
        UsuariosSchema.create(
          {
            name: req.body.name,
            lastName: req.body.lastName,
            username: username,
            direccion: req.body.direccion,
            password: createHash(password),
          },
          (err, userWithId) => {
            if (err) {
              loggerError.error('Error al crear usuario nuevo.');
              loggerInfo.error("Error al crear usuario nuevo.");
              return done(err, null);
            }
            loggerInfo.info('Registro de usuario nuevo, exitoso.');
            return done(null, userWithId);
          }
          );
      } catch (e) {
        return done(e, null);
      }
    }
  )
);

// passport.use("addProduct",
// new localStrategy(async (req, productName, done) => {
//   try {
//     ProductSchema.create(
//       {
//         title: productName,
//         price: req.body.price,
//         thumbnail: req.body.thumbnail
//       }
//     )
//     return done(null, productName)
//   } catch (e) {
//     return done(e, null)
//   }

// })
// )

// USER LOGIN
passport.use(
  "login",
  new localStrategy((username, password, done) => {
    try {
      //console.log(username);
      const twesting_name = UsuariosSchema.findOne({ username }, (err, user) => {
        if (err) {
          return done(err, null);
        }
        if (!user) {
          loggerError.error('Error al iniciar sesión.');
          loggerInfo.error("Error al iniciar sesión.");
          return done(null, false);
        }
        if (!isValidPassword(user, password)) {
          return done(null, false);
        }
        loggerInfo.info('Inicio de sesión exitoso.');
        return done(null, user);
      });
    } catch (e) {
      return done(e, null);
    }
  })
);

// funciones para serializar y deserializar

passport.serializeUser((usuario, done) => {
  console.log("es esto",usuario);
  done(null, usuario.username);
});

passport.deserializeUser((usuario, done) => {
  UsuariosSchema.findOne({ usuario }, done);
});

function createHash(password) {
  return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}

function isValidPassword(user, password) {
  return bCrypt.compareSync(password, user.password);
}

// process object

const PORT = process.env.PORT_server || 8000;

const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});
server.on("error", (error) => console.log(`Error en servidor ${error}`));

