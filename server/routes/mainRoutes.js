import express from "express";
import Usuario from "../DAOs/usuarios.dao.class.js";
import Producto from "../DAOs/producto.dao.class.js";
import passport from "passport";
import { fork } from "child_process";
import parseArgs from "minimist";
import numCpus from "os";
import ProductSchema from "../models/producto.model.js";
import pino from "pino";


const loggerError = pino('error.log');
const loggerWarn = pino('warning.log');
const loggerInfo = pino('info.log');

loggerError.level = 'error';
loggerWarn.level = 'warn';
loggerInfo.level = 'info';


const argv = parseArgs(process.argv.slice(2));



//inicializo la ruta
const router = express.Router();

const usuario = new Usuario();

const producto = new Producto();

//AQUI INICIO LAS RUTAS

//ROUTE DE LOGGEO DE USUARIO
//Creación de la sesión
router.post("/login", passport.authenticate('login', {
  successRedirect: '/api/user',
  failureRedirect: '/api/login-error'
}));

router.get("/login-error", (req, res) => {
  res.status(400).json({status:"No se pudo iniciar sesion!"})
})


// Destruyo la sesion

router.get('/logout', (req, res) => {
    try {
      res.clearCookie('currentSession');
      req.session.destroy();
      res.status(200).json({
        status: 'success',
        message: 'Session cerrada',
      });
    } catch (e) {
        res.status(500).json({ status: 'error', message: 'Algo salio mal al hacer logout' });
    }
})

//Llamo al user en sesion

router.get("/user", (req, res) => {
  res.status(200).json({name:req.session.passport});
});

// Registro de usuario

router.post("/register", passport.authenticate('register', {
  successRedirect: '/api/login',
  failureRedirect: '/api/register'
}));

router.get('/login', (req, res) => {
  res.status(200).json({"message": "Usuario creado con exito!"})
})


// Add productos

router.post("/addProduct", (req, res) => {
  try {
    if (req.body.productName && req.body.price && req.body.thumbnail) {
      ProductSchema.create(
        {
          title: req.body.productName,
          price: req.body.price,
          thumbnail: req.body.thumbnail
        }
      )  
    }
    res.status(200).send("Producto creado")
  } catch (error) {
    res.status(402).send({"message":"Error creando producto"})
  }
});

router.get("/getProd", async (req, res) => {
  const prodsAll = await producto.listarAll();
  console.log(prodsAll);
  res.send(prodsAll);
})

router.get("/info", (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      arguments: argv,
      process: process.pid,
      version: process.version,
      system: process.platform,
      location: process.cwd(),
      memory: process.memoryUsage(),
      title: process.title,
      numCPUs: numCpus.cpus().length
    }
  });
});

// PINO LOGGS

router.get("/user", (req, res) => {
  if (req.session.passport) {
    loggerInfo.info('Exito');
    res.send({
      Name_session: req.session.passport,
    });
  } else {
    loggerError.error('El usuario no existe.');
    loggerInfo.error("error de datos.");
    res.send("error de datos.");
  }
})

router.get("/randoms", (req, res) => {
  const child = fork("./Utils/childCalc.js"); // < --- creamos proceso hijo
  const { cant } = req.query; // <--- obtenemos query de URL
  let numberToCalculate = parseInt(cant) || 100000; // <--- verificamos si se hace default o tiene un valor
  child.send(numberToCalculate); // <--- manda a child el numero a calcular
  child.on("message", (message) => {
    res.status(200).json(message); // <---- manda el resultado a front
  });
  child.on("error", (error) => {
    res.status(500).json({ message: "Algo salio mal", error }); // <--- imprime error
  });
  child.on("exit", (code) => {
    console.log("child exited with a code of ", code); // <--- termina proceso
  });
});



export default router;