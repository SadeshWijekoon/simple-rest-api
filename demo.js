const express = require('express');
const mySql = require('mysql');

// create a connection
const db = mySql.createConnection({
    host:'localhost',
    user:'root',
    password:'', // no password 
    database:'nodemysql'
})

// connect to my mySql
db.connect(err=>{
    if(err){
        throw err
    }
    console.log('my sql connected');
    
})

const app = express();

// create a database
app.get('/createdb',(req,res)=>{
    let sql = 'CREATE DATABASE nodemysql'
    db.query(sql, err=>{ // this method is use to excecute sql quries in sql server 
        if (err){
            throw err
        }
        res.send('Database Created')
    })
})

// create table 
app.get('/createemploye',(req,res)=>{
    let sql='CREATE TABLE employee(id int AUTO_INCREMENT, name VARCHAR(255),designation VARCHAR(225),PRIMARY KEY(id))'
    db.query(sql,err=>{
        if(err){
            throw err
        }
        res.send('Employee Table Created')
    })
})
// insert employee
app.get('/employee1',(req,res)=>{
    let post ={name:"Jake Smith",designation:"CEO"}
    let sql = 'INSERT INTO employee SET ?' // ? gonna replace with post
    db.query(sql,post,err=>{
        if(err){
            throw err
        }
        res.send('Employee 1 add')
    })
})
// select employee
app.get('/getemployee',(req,res)=>{
    let sql = 'SELECT * FROM employee'
    let quary = db.query(sql,(err,result)=>{
        if(err){
            throw(err)
        }
        console.log(result);
        
        res.send('Employee Details Fetched')
    })
})
//update employee
app.get('/updateemployee/:id',(req,res)=>{
    let newUser = 'UPDATE name'
    let sql = `UPDATE employee SET name = '${newUser}' WHERE id='${req.params.id}' `
    db.query(sql,(err,result)=>{
        if (err){
            throw err
        }
        console.log(result);
        res.send('Update the Employee')
        
    })
})
// delete employee
app.get('/delete/:id',(req,res)=>{
    let sql = `DELETE FROM employee WHERE id = ${req.params.id} `
    db.query(sql,(err)=>{
        if(err){
         throw err
        }
        res.send('delete the employee')
    })
})


app.listen('3000',()=>{
    console.log('Server Started');
    
})