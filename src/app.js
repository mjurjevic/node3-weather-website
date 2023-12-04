const hbs = require('hbs');
const path = require('path')
const express = require('express');
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express();
const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath)
app.use(express.static(publicDirectoryPath));
hbs.registerPartials(partialsPath)

app.get('', (req,res) =>{
    res.render('index',{
        title: 'Weather App',
        name: 'Marko Jurjevic'
    })
}) // dva argumenta dohvatamo url i funkcija  takodje parametre prima request i response sta trazimo i odgovor  

app.get('/help', (req,res) =>{
    res.render('help',{    
        title:"Help",
        name: 'Marko Jurjevic'

    })
}) 

app.get('/about', (req,res) =>{
    res.render('about',{
        title:'About',
        name: 'Marko Jurjevic'
        
    })
}) 

// app.get('/myPage',(req,res) => {
//     res.render('myPage',{
//         title:'Ovo je moja strana',
//         error:'Page not found',
//         name:'Marko Jurjevic'
//     })
// })

// app.get('/myPage/*',(req,res) =>{
//     res.send('My page article is not found')
// })
app.get('/weather', (req,res) =>{
    
    if(!req.query.address){ //objekte pravi koje su u urlu sto smo dodali
        return res.send({
            error:'You must provide an address!'
        })
    } 

    geocode(req.query.address,(error,{ latitude, longitude, location}) =>{
        if(error)
        {
            return res.send({error})
        }   

        forecast(latitude,longitude, (error, forecastData) =>{
            if(error){
                return res.send({error})
            }

            res.send({
                forecast:forecastData,
                location,   
                address:req.query.address
            })
        })
    })
}) 

app.get('products', (req,res) => {

    if(!req.query.search){
        return res.send({
            error:'You must provide a seach term'
        })
    }
    console.log(req.query); //query hvata parametre unutar urla na browseru i stavlja ih kao u json
    res.send({
        products: {}
    })
})

app.get('/help/*', (req,res) =>{
    res.render('404',{
        title:'404',
        name:'Marko Jurjevic',
        errorMessage:'Help article not found'    
    })
})

app.get('*',(req,res) =>{ //koristimo * za sve ostale urlove
    res.render('404',{
        title:'404',
        name:'Marko Jurjevic',
        errorMessage:'Page not found.'
    })
})





app.listen(port, () =>{
    console.log('Server is up on port ' + port);
}) //startuje server a drugo je callback koja ce da radi nesto dok je startovan server