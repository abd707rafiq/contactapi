
const Contact=require('../models/Supplier')
const getAllContacts=async(req,res)=>{
    const contactType = req.params.type;
    const showContactsWithTax = req.query.taxNumber === 'true';
const showOpeningBalance = req.query.openingBalance === 'true';

console.log('showContactsWithTax:', showContactsWithTax);
console.log('showOpeningBalance:', showOpeningBalance);

if (contactType === 'supplier') {
    try {
        let contacts;
        if (showContactsWithTax || showOpeningBalance) {
            const query = {
                contactType: 'supplier'
            };

            if (showContactsWithTax) {
                query.taxNumber = { $gt: 0 };
            }

            if (showOpeningBalance) {
                query.openingBalance = { $gt: 0 };
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
    
    
      else if (contactType === 'customer') {
        
        res.status(200).json({msg:"i am all customer"});
      } else if (contactType === 'customer group') {
        
        res.status(200).json({msg:"i am all customer group"});
      }
      else if (contactType === 'import') {
        
        res.status(200).json({msg:"i am import"});
      }
      else {
        res.status(400).json({ error: 'Invalid contact type' });
      }

};


const createSupplierContact= async (req,res)=>{
    
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

// controllers/Contact.js

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
  
module.exports={getAllContacts,createSupplierContact,updateSupplierContact,
    deleteSupplierContact,
    getSupplierContactById,
    deleteAllSupplierContacts


};