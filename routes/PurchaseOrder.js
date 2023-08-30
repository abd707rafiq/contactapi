const express=require('express');
const router=express.Router();

const {getAllPurchaseOrder,addPurchaseOrder}=require("../controllers/PurchaseOrder");
router.get('/purchase-order',getAllPurchaseOrder);
router.post('/purchase-order/create',addPurchaseOrder);




module.exports=router;