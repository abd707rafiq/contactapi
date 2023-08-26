const mongoose = require('mongoose');
const Contact = require('../models/Supplier'); 

uri = "mongodb+srv://admin:@cluster0.7ru5mzm.mongodb.net/";
const connectDB = () => {
  
  return mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
    
    const contactType = 'supplier' || 'customer'; 
const entity = 'business' || 'individual'; 
const assignedTo= 'Demo Admin' || 'Ismail Shah';
const payTerm= 'Month'||'Days'
const newContact = new Contact({
    contactType: contactType,
    entity: entity,
    assignedTo:assignedTo,
    payTerm:payTerm
 
});


    
  })
  .catch(error => {
    console.error('Error connecting to MongoDB:', error);
  });
};

module.exports = connectDB;
