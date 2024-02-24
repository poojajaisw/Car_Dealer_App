const mongoose = require('mongoose');

const dealerSchema = new mongoose.Schema({
  dealership_email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  dealership_name: {
    type: String,
    required: true,
  },
  dealership_location: {
    type: String,
    required: true,
  },
  dealership_info: {
    type: String,
    required: true,
  },
  cars: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Car', // Reference to your Car model
    },
  ],
  deals: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Deal', // Reference to your Deal model
    },
  ],
  sold_vehicles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SoldVehicle', // Reference to your SoldVehicle model
    },
  ],
});

const Dealer = mongoose.model('Dealer', dealerSchema);

module.exports = Dealer;
