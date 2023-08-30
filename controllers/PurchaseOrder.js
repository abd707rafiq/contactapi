
const PurchaseOrder=require("../models/PurchaseOrder");
const Contact = require('../models/Supplier'); 

const getAllPurchaseOrder=async(req,res)=>{
    try{
        const purchaseOrder=await PurchaseOrder.find();
        res.status(200).json(purchaseOrder);
    }
    catch (error) {
        console.error('Error fetching customer groups:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }


}



const addPurchaseOrder = async (req, res) => {
    try {
        const purchaseOrderData = req.body;
        
        const supplierContacts = await Contact.find({ contactType: 'supplier' })
            .select('firstName businessName');
        
        const newPurchaseOrder = new PurchaseOrder(purchaseOrderData);
        const savedPurchaseOrder = await newPurchaseOrder.save();
        
        res.status(201).json({
            purchaseOrder: savedPurchaseOrder,
            supplierContacts: supplierContacts
        });
    } catch (error) {
        console.error('Error adding purchase order:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



module.exports={getAllPurchaseOrder,addPurchaseOrder};
