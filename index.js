import express from 'express'
import mysql from 'mysql2/promise'

const pool = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: 'Zimkhitha1983!',
  database: 'shopleft'
});

const app = express();
app.listen(7786, () => {
    console.log('http://localhost:7786');
})

const products = async ()=>{
 let [row] = await pool.query(`SELECT * FROM products;`,)
 return row
}
app.get('/products',async(req,res)=>{
    res.json({
        data: await products()
    })
})


const fetchSinglePoducts = async (code) => {
    let [[row]] = await pool.query(`SELECT * FROM shopleft.products where product_code=?;`, [code]);
    return row;
}
app.get('/products',async(req,res)=>{
    res.json({
        data: await fetchSinglePoducts('bato 1')
    })
})



const addProducts = async (product_code,product_name,product_price,product_quantity) => {
    await pool.query(
        `INSERT INTO products (product_code,product_name,product_price,product_quantity) VALUES (?, ?, ?, ?)`,
        [product_code,product_name,product_price,product_quantity]
    );
    let [rows] = await pool.query(`SELECT * FROM products;`);
    return rows;
}
app.post('/products',async(req,res)=>{
    res.json({
        data: await addProducts('tota 4','Bar One','9.00',10)
    })
})




const deleteProducts = async (product_code) => {
    await pool.query(`DELETE FROM products WHERE product_code = ?`, [product_code]);
};
app.delete('/products',async(req,res)=>{
    res.json({
        data: await deleteProducts('rant 1')
    })
})


const updateProducts = async (product_code, product_name, product_price, product_quantity) => {
    await pool.query(
        `UPDATE products SET product_name = ?, product_price = ?, product_quantity = ? WHERE product_code = ?`,
        [product_name, product_price, product_quantity, product_code]
    );
    let [row] = await pool.query(`SELECT * FROM products WHERE product_code = ?`, [product_code]);
    return row;
};
app.patch('/products',async(req,res)=>{
    res.json({
        data: await updateProducts('hand 1', 'Sunlight', '20.00', 6)
    })
})


const users = async ()=>{
 let [row] = await pool.query(`SELECT * FROM users;`,)
 return row
}
app.get('/users',async(req,res)=>{
    res.json({
        data: await users()
    })
})


const fetchSingleUser = async (id) => {
    let [[row]] = await pool.query(`SELECT * FROM shopleft.users where id=?;`, [id]);
    return row;
}
app.get('/users',async(req,res)=>{
    res.json({
        data: await fetchSingleUser('2')
    })
})


const addUsers = async (id,email,first_name,last_name,password) => {
    await pool.query(
        `INSERT INTO users (id,email,first_name,last_name,password) VALUES (?, ?, ?, ?,?)`,
        [id,email,first_name,last_name,password]
    );
    let [rows] = await pool.query(`SELECT * FROM users;`);
    return rows;
}
app.post('/users',async(req,res)=>{
    res.json({
        data: await addUsers(4,'ZAYAAN@gmail.com','zayaan','salie','hotgurl')
    })
})


const deleteUsers = async (id) => {
    await pool.query(`DELETE FROM users WHERE id = 4`, [id]);
};
app.delete('/users',async(req,res)=>{
    res.json({
        data: await deleteUsers(4)
    })
})


