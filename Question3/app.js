let express = require('express');
let app = express();
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const dotenv = require('dotenv');
dotenv.config()
let port = process.env.PORT || 8320;
const mongoUrl = process.env.mongoLiveUrl;
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());

//get
app.get('/',(req,res)=>{
    res.send("Welcome to Amazon")
})

//categories
app.get('/category',(req,res)=>{
    db.collection('categories').find().toArray((err,result)=>{
        if(err) throw err;
        res.send(result)
    })
})


//products as per categories
app.get('/getProducts/',(req,res)=>{
    let query={};
    let catId=Number(req.query.category_id);
    if(catId){
        query={category_id:catId}
    }
    console.log(">>>catId",catId)
    db.collection('data').find(query).toArray((err,result)=>{
        if(err) throw err;
        res.send(result)
    })
})



//connection with db
MongoClient.connect(mongoUrl, (err, client)=>{
    if(err) console.log(`Error while connecting`);
    db = client.db('amazonproject');
    app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})
})
