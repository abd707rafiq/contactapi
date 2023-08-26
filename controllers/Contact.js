


// get all contacts according to thier contacttype
const Contact = require('../models/Supplier')
const getAllContacts = async (req, res) => {
  const contactType = req.params.type;
  const showAdvanceBalance = req.query.advanceBalance === 'true';
  const showOpeningBalance = req.query.openingBalance === 'true';
  const showPurchaseDue=req.query.purchaseDue==='true';
  const showPurchaseReturn=req.query.purchaseReturn ==='true';
  // for contacttype supplier
  if (contactType === 'supplier') {
    try {
      let contacts;
      if (showAdvanceBalance || showOpeningBalance || showPurchaseDue ||showPurchaseReturn) {
        const query = {
          contactType: 'supplier'
        };

        if (showAdvanceBalance) {
          query.advanceBalance = { $gt: 0 };
        }

        if (showOpeningBalance) {
          query.openingBalance = { $gt: 0 };
        }
        if (showPurchaseDue) {
          query.purchaseDue = { $gt: 0 };
        }
        if(showPurchaseReturn){
          query.purchaseReturn={$gt:0};
        }
      
        
        contacts = await Contact.find(query);
        
      } else {
        contacts = await Contact.find({ contactType: 'supplier' });
      }
      res.status(200).json(contacts);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
// for contact type cutomer
// fileration for customer contact is not added yet

  else if (contactType === 'customer') {
    try{
      let contacts;
       contacts=await Contact.find({contactType:'customer'});
       res.status(200).json(contacts);
    }catch(error){
      console.error('Error fetching contacts ',error);
      res.status(500).json({error:'INternal server error'});
    }

    
  } 
  
  else {
    res.status(400).json({ error: 'Invalid contact type' });
  }

};
//crud for supplier
/// add new supplier

const createSupplierContact = async (req, res) => {

  try {
    const newContactData = req.body;
    const newSupplierContact = new Contact({
      contactType: 'supplier',
      ...newContactData
    });
    const savedSupplierContact = await newSupplierContact.save();
    res.status(201).json(savedSupplierContact);
  } catch (error) {
    console.error('Error creating supplier contact:', error);

  }

}

// update supplier contact by itd id

const updateSupplierContact = async (req, res) => {
  const contactId = req.params.id;
  try {
    const updatedContactData = req.body;
    const updatedSupplierContact = await Contact.findByIdAndUpdate(
      contactId,
      { ...updatedContactData },
      { new: true }
    );
    if (updatedSupplierContact) {
      res.json(updatedSupplierContact);
    } else {
      res.status(404).json({ error: 'Supplier Contact not found' });
    }
  } catch (error) {
    console.error('Error updating supplier contact:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

//delete supplier contact
const deleteSupplierContact = async (req, res) => {
  const contactId = req.params.id;
  try {
    const deletedSupplierContact = await Contact.findByIdAndDelete(contactId);
    if (deletedSupplierContact) {
      res.json({ message: 'Supplier Contact deleted successfully' });
    } else {
      res.status(404).json({ error: 'Supplier Contact not found' });
    }
  } catch (error) {
    console.error('Error deleting supplier contact:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/// view supplier contact by its id
const getSupplierContactById = async (req, res) => {
  const contactId = req.params.id;
  try {
    const supplierContact = await Contact.findById(contactId);
    if (supplierContact) {
      res.status(200).json(supplierContact);
    } else {
      res.status(404).json({ error: 'Supplier Contact not found' });
    }
  } catch (error) {
    console.error('Error fetching supplier contact by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// its optional delete all supplier contacts
const deleteAllSupplierContacts = async (req, res) => {
  try {
    const result = await Contact.deleteMany({ contactType: 'supplier' });
    if (result.deletedCount > 0) {
      res.json({ message: 'All Supplier Contacts deleted successfully' });
    } else {
      res.status(404).json({ error: 'No Supplier Contacts found to delete' });
    }
  } catch (error) {
    console.error('Error deleting all supplier contacts:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



// customer crud operation

const createCustomerContact= async(req,res)=>{
  try{
    const newContactData=req.body;
    const newCustomerData=new Contact({
      contactType:'customer',
      ...newContactData

    })
    const savedCustomerData=await newCustomerData.save();
    res.status(201).json(savedCustomerData);

  }catch(error){
    console.log(error)('Customer data add',error);
  }



}
const updateCustomerContact=async(req,res)=>{
  const contactId=req.params.id;
  try{
    const updatedContactData=req.body;
    const updateCustomerContact=await Contact.findByIdAndUpdate(
      contactId,
      {...updatedContactData},
      {new:true}
    );
    if(updateCustomerContact){
      res.json(updateCustomerContact);
    }else{
      res.status(404).json('Customer contact not found');
    }
  }catch(error){
    console.error("Error updating customer contact",error);
    res.status(500).json({error: 'Internal server error'});
  }

}
// delete custoemr by id
const deleteCustomerContact=async(req,res)=>{
  const contactId=req.params.id;
  try {
    const deletedCustomerContact = await Contact.findByIdAndDelete(contactId);
    if (deletedCustomerContact) {
      res.json({ message: 'Customer Contact deleted successfully' });
    } else {
      res.status(404).json({ error: 'Customer Contact not found' });
    }
  } catch (error) {
    console.error('Error deleting Customer contact:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }

}

// get customer by id
const getCustomerContactById=async(req,res)=>{
  const contactId=req.params.id;
  try {
    const customerContact = await Contact.findById(contactId);
    if (customerContact) {
      res.status(200).json(customerContact);
    } else {
      res.status(404).json({ error: 'customer Contact not found' });
    }
  } catch (error) {
    console.error('Error fetching customer contact by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }


}
// deele all customers
const deleteAllCustomerContacts = async (req, res) => {
  try {
    const result = await Contact.deleteMany({ contactType: 'customer' });
    if (result.deletedCount > 0) {
      res.json({ message: 'All Supplier Contacts deleted successfully' });
    } else {
      res.status(404).json({ error: 'No Supplier Contacts found to delete' });
    }
  } catch (error) {
    console.error('Error deleting all supplier contacts:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



module.exports = {
  getAllContacts, createSupplierContact, updateSupplierContact,
  deleteSupplierContact,
  getSupplierContactById,
  deleteAllSupplierContacts,
  createCustomerContact,
  updateCustomerContact,
  deleteCustomerContact,
  getCustomerContactById,
  deleteAllCustomerContacts

};