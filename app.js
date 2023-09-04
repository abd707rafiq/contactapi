const express=require("express")
const app=express()
const connectDB=require("./db/connect")

const PORT=process.env.PORT || 3000
const contact_routes= require("./routes/Contact")
const group_routes=require("./routes/Customergroup")
const purchase_routes=require("./routes/PurchaseOrder")
const purchase_due=require("./routes/AddPurchases")
const purchase_return=require("./routes/PurchaseReturn")
app.get("/" , (req,res)=>{
    res.send("Hi whatsup");
});
//middleware
app.use(express.json());
app.use("/", contact_routes);
app.use("/",group_routes);
app.use("/",purchase_routes);
app.use("/",purchase_due);
app.use("/",purchase_return);


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