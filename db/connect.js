const mongoose = require('mongoose');
const Contact = require('../models/Supplier'); // Import your Contact model here
/// you should use your uri

const connectDB = () => {
  
  return mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');

    // Create a new contact
    
    const contactType = 'supplier' || 'customer'; // This will always result in 'supplier'
const entity = 'business' || 'individual'; // This will always result in 'business'

const newContact = new Contact({
    contactType: contactType,
    entity: entity,
    // Other fields
});


    newContact.save()
      .then(savedContact => {
        console.log('Contact saved:', savedContact);
      })
      .catch(error => {
        console.error('Error saving contact:', error);
      });
  })
  .catch(error => {
    console.error('Error connecting to MongoDB:', error);
  });
};

module.exports = connectDB;
