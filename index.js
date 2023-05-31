const {obtenerPosts, agregarPost, eliminarPost, modificarPost} = require('./consultas.js');

const express = require('express');

const cors = require('cors');

const app = express();

app.use(express.json());

app.use(cors());

app.listen(3000, console.log("Servidor Encendido"));

app.get("/posts", async (req, res) => {
    try {
        const posts = await obtenerPosts();
        res.json(posts);
    } catch(error) {
        res.status(500).send(error);
    }    
})

app.post("/posts", async (req, res) => {
    try {
        const { titulo, img, descripcion } = req.body;
        const result = await agregarPost(titulo, img, descripcion);
        res.json(result);
    } catch(error) {
        res.status(500).send(error);
    }    
})

app.delete("/posts/:id", async (req, res) => {
    try {
        const {id} = req.params;
        await eliminarPost(id);
        res.send("Post eliminado con éxito");
    } catch(error) {
        res.status(500).send(error);
    }    
})

app.put('/posts/like/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await modificarPost(id);
        res.json(result);
    } catch(error) {
        res.status(500).send(error);
    }    
})