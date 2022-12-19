import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from 'connect-mongo'; 
import bCrypt from 'bcrypt';
import dotenv from 'dotenv';
import Usuario from "./DAOs/usuarios.dao.class.js";
import UsuariosSchema from './models/usuarios.model.js';

//aqui importo el sistema de ruteo
import mainRoutes from "./routes/mainRoutes.js";

//passport imports
import passport from "passport";
import { Strategy } from "passport-local";

// CONFIGURO MIS VARIABLES DE ENTORNO
dotenv.config();


const localStrategy = Strategy;

const usuario = new Usuario();

const app = express();
const advancedOptions = {useNewUrlParser: true, useUnifiedTopology: true};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// INICIO LA BASE DE DATOS!!
const connectDB = () => {
  mongoose.connect(process.env.MongoDBURL_ATLAS);
  console.log("connected DB", process.env.MongoDBURL_ATLAS);
}
connectDB();


app.use(cookieParser());
app.use(session({
  //MongoStorage
  store: MongoStore.create({
    mongoUrl:process.env.MongoDBURL_ATLAS,
    mongoOptions: advancedOptions
  }),
  key: 'currentSession',
  secret: process.env.SECRET_KEY_MONGO,
  cookie: { 
    maxAge: 1000 * 60 * 10,
   }, // value of maxAge is defined in milliseconds. 
  resave: false,
  saveUninitialized: false,
}));

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

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

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
passport.use(
  "register",
  new localStrategy(
    { passReqToCallback: true},
    async (req, username, password, done) => {
      try {
        UsuariosSchema.create(
          {
            name:req.body.name ,
            lastName: req.body.lastName,
            username: username,
            direccion: req.body.direccion,
            password: createHash(password)
          },
          (err, userWithId) => {
            if (err) {
              return done(err, null);
            }
            return done(null, userWithId);
          }
        )
      } catch (e) {
        return done(e, null);
      }
    }
  )
);

passport.use("login", 
new localStrategy((username, password, done) => {
  try {
    console.log(username);
    UsuariosSchema.findOne({username}, (err, user) => {
      if (err) {
        return done(err, null);
      }
      if (!user) {
        return done(null, false);
      }
      if (!isValidPassword(user, password)) {
        return done(null, false);
      }
      return done(null, user);
    })
  } catch (e) {
    return done(e, null);
  }
  
}));

// funciones para serializar y deserializar

passport.serializeUser((usuario, done) => {
  console.log(usuario);
  done(null, usuario.username);
});

passport.deserializeUser((usuario, done) => {
  UsuariosSchema.findOne({usuario}, done);
})

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
