const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('./config');
const Admin = require('../models/admin'); 

router.post("/login", async (req, res) => {
  const { admin_id, password } = req.body;

  console.log('Login Request - Admin ID:', admin_id);

  if (!admin_id || !password) {
    return res.status(400).json({ error: "One or more fields are empty" });
  }

  try {
    const adminInDB = await Admin.findOne({ admin_id });

    if (!adminInDB) {
      console.log('Admin not found');
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const didMatch = await bcryptjs.compare(password, adminInDB.password_hash);

    console.log('Password Match:', didMatch);

    if (didMatch) {
      const token = jwt.sign({ _id: adminInDB._id }, JWT_SECRET, { expiresIn: '1h' });
      console.log('Generated Token:', token);
      res.json({ token });
    } else {
      console.log('Password mismatch');
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    console.error('Error finding admin in the database:', error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
