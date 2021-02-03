const mysql = require('../db')
const {createToken} = require('../helpers/jwt')
const {asyncQuery,generateQueryBody} = require('../helpers/queryHelp')
const { validationResult } = require('express-validator')

module.exports = {
    register: async(req, res) => {

        let uid = Date.now()

        const errors = validationResult(req)
        if (!errors.isEmpty()) return res.status(400).send(errors.array()[0].msg)

        try{
            let sql = `SELECT * FROM users WHERE username = '${req.body.username}' OR email = '${req.body.email}' `
            let rows = await asyncQuery(sql)

            if(rows.length) return res.status(400).send("Username atau Email tidak boleh sama !")

            let sql2 = `INSERT INTO users (uid,username,email,password) VALUES ('${uid}','${req.body.username}','${req.body.email}','${req.body.password}')`
            let rows2 = await asyncQuery(sql2)

            let sql3 = `SELECT * FROM users WHERE username = '${req.body.username}' OR email = '${req.body.email}'`
            let rows3 = await asyncQuery(sql3)

            const token = createToken({
                uid: rows3[0].uid,
                role: rows3[0].role
            })

            rows3[0].token = token

            res.status(200).send(rows3[0])
            
        }catch(err){
            console.log(err)
            res.status(400).send(err)
        }
    },
    login: async(req,res) => {
        try{
            let sql = `SELECT * FROM users WHERE username = '${req.body.username}' AND password = '${req.body.password}' `
            let rows = await asyncQuery(sql)

            if(rows[0].status != 1) return res.status(400).send("Akun tidak aktif atau ditutup !")
            if(rows.length === 0) return res.status(400).send("Username atau pass salah !")


            // let data = {
            //     user : rows[0].username,
            //     password : rows[0].password
            // }

            res.status(200).send(rows[0])


        }
        catch(err){
            console.log(err)
            res.status(400).send(err)
        }
    },
    deactive: async(req,res) => {

        let uid = req.user.uid

        try{
            let sql = `SELECT * FROM users WHERE uid = '${uid}'`
            let rows = await asyncQuery(sql)

            if(rows.length === 0) return res.status(400).send("Akun tidak ditemukan !")
            if(rows[0].status === 3) return res.status(400).send("Akun anda sudah ditutup !")


            let sql2 = `UPDATE users SET status = 2  WHERE uid = '${uid}'`
            let rows2 = await asyncQuery(sql2)

            let sql3 = `SELECT a.*, b.status AS namaStatus FROM users a
            INNER JOIN STATUS AS b ON a.status = b.id WHERE a.uid = '${uid}'`
            let rows3 = await asyncQuery(sql3)

            let data = {
                uid : rows3[0].uid,
                status: "deactive"
            }

            res.status(200).send(data)

        }catch(err){
            console.log(err)
            res.status(400).send(err)
        }
    },
    activate: async(req,res) => {

        let uid = req.user.uid

        try{

            let sql = `SELECT * FROM users WHERE uid = '${uid}'`
            let rows = await asyncQuery(sql)

            if(rows.length === 0) return res.status(400).send("Akun tidak ditemukan !")
            if(rows[0].status === 3) return res.status(400).send("Akun anda sudah ditutup !")


            let sql2 = `UPDATE users SET status = 1  WHERE uid = '${uid}'`
            let rows2 = await asyncQuery(sql2)

            let sql3 = `SELECT a.*, b.status AS namaStatus FROM users a
            INNER JOIN STATUS AS b ON a.status = b.id WHERE a.uid = '${uid}'`
            let rows3 = await asyncQuery(sql3)

            let data = {
                uid : rows3[0].uid,
                status: "Activate"
            }

            res.status(200).send(data)

        }catch(err){
            console.log(err)
            res.status(400).send(err)
        }

    },
    accountClose: async(req,res) => {
        
        let uid = req.user.uid

        try{

            let sql = `SELECT * FROM users WHERE uid = '${uid}'`
            let rows = await asyncQuery(sql)

            if(rows.length === 0) return res.status(400).send("Akun tidak ditemukan !")

            let sql2 = `UPDATE users SET status = 3  WHERE uid = '${uid}'`
            let rows2 = await asyncQuery(sql2)

            let sql3 = `SELECT a.*, b.status AS namaStatus FROM users a
            INNER JOIN STATUS AS b ON a.status = b.id WHERE a.uid = '${uid}'`
            let rows3 = await asyncQuery(sql3)

            let data = {
                uid : rows3[0].uid,
                status: "closed"
            }

            res.status(200).send(data)

        }catch(err){
            console.log(err)
            res.status(400).send(err)
        }
    },
    registerAdmin: async(req,res) => {
        let uid = Date.now()

        const errors = validationResult(req)
        if (!errors.isEmpty()) return res.status(400).send(errors.array()[0].msg)

        try{
            
            let sql = `SELECT * FROM users WHERE username = '${req.body.username}' OR email = '${req.body.email}' `
            let rows = await asyncQuery(sql)

            if(rows.length) return res.status(400).send("Username atau Email tidak boleh sama !")

            let sql2 = `INSERT INTO users (uid,username,email,password,role) VALUES ('${uid}','${req.body.username}','${req.body.email}','${req.body.password}',1)`
            let rows2 = await asyncQuery(sql2)

            let sql3 = `SELECT * FROM users WHERE username = '${req.body.username}' OR email = '${req.body.email}'`
            let rows3 = await asyncQuery(sql3)

            const token = createToken({
                uid: rows3[0].uid,
                role: rows3[0].role
            })

            rows3[0].token = token

            res.status(200).send(rows3[0])

        }catch(err){
            console.log(err)
            res.status(400).send(err)
        }
    }
}
