const express=require("express")
var cors = require('cors');
const app=express()
app.use(cors());



const connectDB=require("./db/connect")

const PORT=process.env.PORT || 5000
const contact_routes= require("./routes/Contact")
const group_routes=require("./routes/Customergroup")
const purchase_routes=require("./POS-Project/pos-ui/src/PurchaseOrder")
const purchase_due=require("./routes/AddPurchases")
const purchase_return=require("./routes/PurchaseReturn")
const recipe_s=require("./routes/Recipe")
const production_m=require("./routes/Production")
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
app.use("/",recipe_s);
app.use("/",production_m);


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