//db server integration
const mongoose=require(`mongoose`)

//connecting with mongoDB Atlas
// mongoose.connect(process.env.BASE_URL,{
//     useUnifiedTopology:true,
//     useNewUrlParser:true
// })
mongoose.connect(process.env.BASE_URL,{
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(()=>{
    console.log("mongodb connected....");
}).catch(()=>{
    console.log("mongogb not connected.......");
})











