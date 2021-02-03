const mysql = require('../db')
const {asyncQuery,generateQueryBody} = require('../helpers/queryHelp')
const { validationResult } = require('express-validator')

module.exports = {
    getMovies: async(req,res) => {
        
        let uid = req.user.uid
        
        try{

            let sql = `SELECT * FROM users WHERE uid = '${uid}'`
            let rows = await asyncQuery(sql)

            if(rows.length === 0) return res.status(400).send("Akun tidak ditemukan !")
            if(rows[0].role != 2 || rows[0].status !=1) return res.status(400).send("Akun harus role user dan harus aktif")

            let sql2 = `SELECT a.id, b.name, b.release_date, b.release_month, b.release_year,
            b.duration_min, b.genre, b.description,
            c.location,
            d.time,
            e.status AS status_name
            FROM schedules a
            INNER JOIN movies AS b ON a.movie_id = b.id
            INNER JOIN locations AS c ON a.location_id = c.id
            INNER JOIN show_times AS d ON a.time_id = d.id
            INNER JOIN movie_status AS e ON b.status = e.id
            ORDER BY a.id `

            let rows2 = await asyncQuery(sql2)

            res.status(400).send(rows2)


        }catch(err){
            console.log(err)
            res.status(400).send(err)
        }
    },
    getMovie: async(req,res) => {

        let uid = req.user.uid
        let status = req.query.status
        let time = req.query.time
        let location = req.query.location

        try{

            let sql = `SELECT * FROM users WHERE uid = '${uid}'`
            let rows = await asyncQuery(sql)

            if(rows.length === 0) return res.status(400).send("Akun tidak ditemukan !")
            if(rows[0].role != 2 || rows[0].status !=1) return res.status(400).send("Akun harus role user dan harus aktif")
            
            let sql2 = `SELECT a.id, b.name, b.release_date, b.release_month, b.release_year,
            b.duration_min, b.genre, b.description,
            c.location,
            d.time,
            e.status AS status_name
            FROM schedules a
            INNER JOIN movies AS b ON a.movie_id = b.id
            INNER JOIN locations AS c ON a.location_id = c.id
            INNER JOIN show_times AS d ON a.time_id = d.id
            INNER JOIN movie_status AS e ON b.status = e.id
            WHERE
            (c.location = '${location}' AND d.time = '${time}' AND e.status = '${status}') OR 
            (c.location = '${location}' AND d.time = '${time}') OR
            (c.location = '${location}' AND e.status = '${status}') OR
            (d.time = '${time}' AND e.status = ''${status}') OR
            (c.location = '${location}' OR d.time = '${time}' OR e.status = '${status}') `
            let rows2 = await asyncQuery(sql2)

            res.status(200).send(rows2)

        
        }catch(err){
            console.log(err)
            res.status(400).send(err)
        }
    },
    addMovie: async(req,res) => {

        let uid = req.user.uid
        let nameMovie = req.body.name
        
        try{

            let sql = `SELECT * FROM users WHERE uid = '${uid}'`
            let rows = await asyncQuery(sql)

            if(rows.length === 0) return res.status(400).send("Akun tidak ditemukan !")
            if(rows[0].role != 1 || rows[0].status !=1) return res.status(400).send("Akun harus role admin dan harus aktif")

            let sql2 = `INSERT INTO movies (name,release_date,release_month,release_year,duration_min,genre,description)
            VALUES ('${nameMovie}',${req.body.release_date},${req.body.release_month},${req.body.release_year},${req.body.duration_min},'${req.body.genre}','${req.body.description}')
            `
            let rows2 = await asyncQuery(sql2)
            let data = rows2

            res.status(200).send(data)

        }catch(err){
            console.log(err)
            res.status(400).send(err)
        }
    },
    statusMovie: async(req,res) => {

        let uid = req.user.uid
        let id = req.params.id

        try{
            let sql = `SELECT * FROM users WHERE uid = '${uid}'`
            let rows = await asyncQuery(sql)

            if(rows.length === 0) return res.status(400).send("Akun tidak ditemukan !")
            if(rows[0].role != 1 || rows[0].status !=1) return res.status(400).send("Akun harus role admin dan harus aktif")

            let sql2 = `UPDATE movies SET status = '${req.body.status}' WHERE ID = ${id}`
            let rows2 = await asyncQuery(sql2)

            let sql3 = `SELECT * FROM movies WHERE id = ${id}`
            let rows3 = await asyncQuery(sql3)

            let data = {
                id : rows3[0].id,
                message : "Status has been changed"
            }

            res.status(200).send(data)

        }catch(err){
            console.log(err)
            res.status(400).send(err)
        }
    },
    schedule: async(req,res) => {
        let uid = req.user.uid
        let id = req.params.id

        let location = req.body.location_id
        let time = req.body.time_id

        try{

            let sql = `SELECT * FROM users WHERE uid = '${uid}'`
            let rows = await asyncQuery(sql)

            if(rows.length === 0) return res.status(400).send("Akun tidak ditemukan !")
            if(rows[0].role != 1 || rows[0].status !=1) return res.status(400).send("Akun harus role admin dan harus aktif")

            let getData = `SELECT * FROM schedules WHERE id = ${id}`
            let checkRows = await asyncQuery(getData)

            let tempLocation = location
            let tempTime = time

            if(tempLocation === undefined){
                tempLocation = checkRows[0].location_id
            }

            if(tempTime === undefined){
                tempTime = checkRows[0].time_id
            }
            
            let sql2 = `UPDATE schedules SET location_id = ${tempLocation}, time_id = ${tempTime}`
            let rows2 = await asyncQuery(sql2)

            let sql3 = `SELECT * FROM schedules WHERE id = ${id}`
            let rows3 = await asyncQuery(sql3)

            let data = {
                id : rows3[0].id,
                message : "Schedule has been added"
            }

            res.status(200).send(data)

        }catch(err){
            console.log(err)
            res.status(400).send(err)
        }

    }
}