const mongoose= require("mongoose")
const initdata = require("./data.js")
const Listing= require("../models/listing.js")


const MONGO_URL='mongodb://127.0.0.1:27017/wanderlust';

async function main() {
  await mongoose.connect(MONGO_URL);
}

main().then((res)=>{
    console.log(" database is connected")
}).catch((err)=>{
    console.log("some error occupied",err)
})

const initDB = async () =>{
  await  Listing.deleteMany({});
  initdata.data=initdata.data.map((obj)=> ({...obj,owner:'6a12b3c0132d0d7f1f34050c'}));
  await Listing.insertMany(initdata.data);
  console.log("data was initialized")
}

initDB();