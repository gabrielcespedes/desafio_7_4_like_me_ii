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
    let likes = 0
    const query = await pool.query("INSERT INTO posts VALUES (DEFAULT, $1, $2, $3, $4) RETURNING id",
    [titulo, img, descripcion, likes]);
    const cardId = query.rows[0].id;
    const result = {id: cardId, titulo, img, descripcion, likes};
    console.log(query.rows[0].id);
    console.log(query);
    return result;
}

const eliminarPost = async (id) => {
    const consulta = "DELETE FROM posts WHERE id = $1";
    const values = [id];
    const result = await pool.query(consulta, values);
}

const modificarPost = async(id) => {
    const firstQuery = "SELECT likes FROM posts WHERE id = $1";
    const firstValues = [id];
    const firstResult = await pool.query(firstQuery, firstValues);
    const data = firstResult.rows[0];
    console.log(data)
    let like = data.likes + 1;
    const secondQuery = "UPDATE posts SET likes = $1 WHERE id = $2";
    const secondValue = [like, id];
    const secondResult = await pool.query(secondQuery, secondValue);
    return secondResult.rows[0];
}

module.exports = {obtenerPosts, agregarPost, eliminarPost, modificarPost};