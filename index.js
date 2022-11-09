const express = require(`express`)
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000;

//middleware
app.use(cors())
app.use(express.json());

//singleServicePerson
// woACBICuRwoABbKw




const uri = "mongodb+srv://singleServicePerson:woACBICuRwoABbKw@cluster0.i8hxp3j.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
 
async function run (){
    try {
        const serViceCollection = client.db("personService").collection("Service");
        const feedbackCollection = client.db("personService").collection("feedback");

        // get only 3  data
        app.get('/Service',async(req,res)=>{
            const query = {}
            const cursor = serViceCollection.find(query)
            const  service = await cursor.limit(3).toArray();
            res.send(service);
        })
        
        //all data get
        app.get('/allServices',async(req,res)=>{
            const query = {}
            const cursor = serViceCollection.find(query)
            const  allServices = await cursor.toArray();
            res.send(allServices);
        })
        // get specific data details
        app.get(`/details/:id`, async (req,res) => {
            const id = req.params.id;
            console.log(id)
            const query = {_id: ObjectId(id)};
            const  details = await serViceCollection.findOne(query);
            console.log(details)
            res.send(details)
        })

        //feedback api create data
        app.post('/feedback', async(req,res)=>{
            console.log(req.query.email)
            let query = {}
            if(req.query.email){
                 query = {
                    email: req.query.email
                 }
        }
            const feedback =  feedbackCollection.find(query);
            const resualt = await feedbackCollection.insertOne(feedback);
            res.send(resualt)
        })
        
    //get data
        app.get('/feedback',async(req,res)=>{
            const query ={}
            const cursor = feedbackCollection.find(query)
            const  allFeedback = await cursor.toArray();
   
            res.send(allFeedback);
        })
    }
    finally{

    }
}
run().catch(err => console.log(err))








app.get('/',(req,res)=> {
    res.send(`Single service running`)
})

app.listen(port, () => {
    console.log(`the port is running ${port}`);
})