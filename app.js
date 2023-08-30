const express=require("express")
const app=express()
const connectDB=require("./db/connect")

const PORT=process.env.PORT || 5000
const contact_routes= require("./routes/Contact")
const group_routes=require("./routes/Customergroup")
const purchase_routes=require("./routes/PurchaseOrder")
app.get("/" , (req,res)=>{
    res.send("Hi whatsup");
});
//middleware
app.use(express.json());
app.use("/", contact_routes);
app.use("/",group_routes);
app.use("/",purchase_routes);


const start= async()=>{
    try{
        await connectDB();
        app.listen(PORT,()=>{
           console.log(`I am connected to port ${PORT}`);
        });

    }
    catch(error){
        console.log(error);
    }

}


start();