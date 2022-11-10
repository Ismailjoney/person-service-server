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

async function run() {
    try {
        const serViceCollection = client.db("personService").collection("Service");
        const feedbackCollection = client.db("personService").collection("feedback");
        // const addServiceCollection = client.db("personService").collection("addServices");

        // get only 3  data
        app.get('/Service', async (req, res) => {
            const query = {}
            const cursor = serViceCollection.find(query)
            const service = await cursor.limit(3).toArray();
            res.send(service);
        })

        //add new service in services collection
        app.post('/Service', async(req,res)=>{
            console.log(`hggd`)
            console.log(req.body)
            const  add = req.body;
            const resualt =  await serViceCollection.insertOne(add);
            res.send(resualt);
        })

        //all data get
        app.get('/allServices', async (req, res) => {
            const query = {}
            const cursor = serViceCollection.find(query)
            const allServices = await cursor.toArray();
            res.send(allServices);
        })


        // get specific data details
        app.get(`/details/:id`, async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const details = await serViceCollection.findOne(query);
            res.send(details)
        })

        //feedback api create data
        app.post('/feedback', async (req, res) => {
            const feedback = req.body;
            const resualt = await feedbackCollection.insertOne(feedback);
            res.send(resualt)
        })

        //get data from specific id
        app.get('/feedback', async (req, res) => {
            console.log(req.query.service)
            let query = {}
            if (req.query.service) {
                query = {
                    service: req.query.service
                }
            }
            const cursor = feedbackCollection.find(query)
            const feedback = await cursor.toArray();
            res.send(feedback);
        })

        
    }
    finally {

    }
}
run().catch(err => console.log(err))








app.get('/', (req, res) => {
    res.send(`Single service running`)
})

app.listen(port, () => {
    console.log(`the port is running ${port}`);
})