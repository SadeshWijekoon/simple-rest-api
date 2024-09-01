const express = require('express');

const app = express();
app.use(express.json())
const port = 3000;

let movies = [
  {
    id:'1',
    title :'Inception',
    director:'Christoper Nolen',
    release_date:'2016-07-16',
  },
  {
    id:'2',
    title :'The Irishman',
    director:'Martin',
    release_date:'2019-09-27',
  },
]

// get the movie
 app.get('/movie',(req,res)=>{
    res.json(movies)
 })

 // get the movie by filtering 
 app.get('/movie/:id',(req,res)=>{
    const found = movies.find(movie=>movie.id===req.params.id)
    if (found){
        res.json(found)
    } else{
        res.sendStatus(400)
    }
 })
  // add the movie
  app.post('/movie',(req,res)=>{
   
   const update ={...req.body, id:String(movies.length+1) }
   movies.push(update)
   res.json(update)
  })

  // update a movie
  app.put('/movie/:id',(req,res)=>{
    const found = movies.some(movie=>movie.id===req.params.id)
    if (found){
        movies.forEach(movie=>{
            if(movie.id===req.params.id){
                movie.title=req.body.title,
                movie.director=req.body.director,
                movie.release_date=req.body.release_date
            }else{
                movie
            }
        })
        res.json(movies)
    }else{
        res.sendStatus(400)
    }

    // delete a movie
    app.delete('/movie/:id',(req,res)=>{
        const found = movies.findIndex(movie=>movie.id===req.params.id)
        if(found){
            movies.splice(found,1)
            res.json(movies)
        }
    })
  })

 app.listen(port,()=>{
    console.log(`server is started on ${port}`);
    
 })

