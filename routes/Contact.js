const express=require('express')
const router=express.Router();

const {getAllContacts,createSupplierContact,updateSupplierContact,deleteSupplierContact,getSupplierContactById,deleteAllSupplierContacts}=require("../controllers/Contact")

router.get('/contacts/:type',getAllContacts);
router.post('/contacts/supplier', createSupplierContact);
router.put('/contacts/supplier/:id', updateSupplierContact);
router.delete('/contacts/supplier/:id', deleteSupplierContact);
router.get('/contacts/supplier/:id', getSupplierContactById); 
router.delete('/contacts/supplier', deleteAllSupplierContacts);


module.exports=router;

  
  
  
  
  