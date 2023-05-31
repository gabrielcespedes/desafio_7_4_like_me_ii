const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'Bgabriel441685',
    database: 'likeme',
    allowExitOnIdle: true
})

const obtenerPosts = async () => {
    const {rows} = await pool.query("SELECT * FROM posts");
    return rows;
}

const agregarPost = async(titulo, img, descripcion) => {
    let likes = 0;
    const consulta = await pool.query("INSERT INTO posts VALUES (DEFAULT, $1, $2, $3, $4) RETURNING id",
    [titulo, img, descripcion, likes]);
    const cardId = consulta.rows[0].id;
    const result = {id: cardId, titulo, img, descripcion, likes};
    return result;
}

const eliminarPost = async (id) => {
    const consulta = "DELETE FROM posts WHERE id = $1";
    const values = [id];
    const result = await pool.query(consulta, values);
}

const modificarPost = async(id) => {
    const consulta = "SELECT likes FROM posts WHERE id = $1";
    const values = [id];
    const resultado = await pool.query(consulta, values);
    const data = resultado.rows[0];
    let like = data.likes + 1;
    const consulta2 = "UPDATE posts SET likes = $1 WHERE id = $2";
    const values2 = [like, id];
    const resultado2 = await pool.query(consulta2, values2);
    return resultado2.rows[0];
}

module.exports = {obtenerPosts, agregarPost, eliminarPost, modificarPost};