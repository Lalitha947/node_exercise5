import express from 'express'
import mysql from 'mysql2/promise'

const pool = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: 'Zimkhitha1983!',
  database: 'shopleft'
});

const app = express();

const products = async ()=>{
 let [row] = await pool.query(`SELECT * FROM products;`,)
 return row
}
console.log( await products());

const fetchSinglePoducts = async (code) => {
    let [[row]] = await pool.query(`SELECT * FROM shopleft.products where product_code=?;`, [code]);
    return row;
}
console.log( await fetchSinglePoducts('bato 1'))


const addProducts = async (product_code,product_name,product_price,product_quantity) => {
    await pool.query(
        `INSERT INTO products (product_code,product_name,product_price,product_quantity) VALUES (?, ?, ?, ?)`,
        [product_code,product_name,product_price,product_quantity]
    );
    let [rows] = await pool.query(`SELECT * FROM products;`);
    return rows;
}
console.log(await addProducts('tota 1','Bar One','9.00',10));



const deleteProducts = async (product_code) => {
    await pool.query(`DELETE FROM products WHERE product_code = ?`, [product_code]);
};
await deleteProducts('rant 1');

const updateProducts = async (product_code, product_name, product_price, product_quantity) => {
    await pool.query(
        `UPDATE products SET product_name = ?, product_price = ?, product_quantity = ? WHERE product_code = ?`,
        [product_name, product_price, product_quantity, product_code]
    );
    let [row] = await pool.query(`SELECT * FROM products WHERE product_code = ?`, [product_code]);
    return row;
};
console.log(await updateProducts('hand 1', 'Sunlight', '20.00', 6));

const users = async ()=>{
 let [row] = await pool.query(`SELECT * FROM users;`,)
 return row
}
console.log( await users());

const fetchSingleUser = async (id) => {
    let [[row]] = await pool.query(`SELECT * FROM shopleft.users where id=?;`, [id]);
    return row;
}
console.log( await fetchSingleUser(2))

const addUsers = async (id,email,first_name,last_name,password) => {
    await pool.query(
        `INSERT INTO users (id,email,first_name,last_name,password) VALUES (?, ?, ?, ?,?)`,
        [id,email,first_name,last_name,password]
    );
    let [rows] = await pool.query(`SELECT * FROM users;`);
    return rows;
}
console.log(await addUsers(3,'raeesa@gmail.com','raeesa','samaai','coolgurl'));

const deleteUsers = async (id) => {
    await pool.query(`DELETE FROM users WHERE id = ?`, [id]);
};
await deleteUsers(1);

