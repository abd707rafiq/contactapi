const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const supplierSchema = new Schema({
    contactType: {
        type: String,
        enum: ['supplier', 'customer', 'both'],
        required: true
    },
    entity: {
        type: String,
        enum: ['individual', 'business'],

    },
    contactId: {
        type: String,
        default: new mongoose.Types.ObjectId().toString()
    },
    businessName:String,

    dateOfBirth: Date,
    prefix: String, // Prefix field
    firstName: String,
    middleName: String, // Middle Name field
    lastName: String,
    mobile:  String,
    alternateContactNumber:  String,

     // Optional field
    landline: String, // Optional field
    email: String,
    assignedTo: {
        type: String,
        enum: ['Demo Admin', 'Ismail Shah']
    },
    taxNumber: String,
    openingBalance: Number,
    advanceBalance:Number,
    payTerm: {
        type: String,
        enum: ['Month', 'Days']
    },
    addressLine1: String, // Address line 1
    addressLine2: String, // Address line 2
    city: String,
    state: String,
    country: String,
    zipCode: String, // Zip/Postal Code
    customField1: String, // Custom Field 1
    customField2: String, // Custom Field 2
    customField3: String, // Custom Field 3
    customField4: String, // Custom Field 4
    customField5: String, // Custom Field 5
    customField6: String, // Custom Field 6
    customField7: String, // Custom Field 7
    customField8: String, // Custom Field 8
    customField9: String, // Custom Field 9
    customField10: String,
    shippingAdress:String,

});

const Contact = mongoose.model("Supplier", supplierSchema);
module.exports = Contact;