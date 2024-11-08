const express = require('express');
const mongoConfig = require('./config/mongoConfig');
const { sequelize, testConnection } = require('./config/sqlConfig');
const authRoutes = require('./routes/authRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const patientRoutes = require('./routes/patientRoutes');
const appointmentRoutes = require('./routes/appointments');

const app = express();
app.use(express.json());

 // This is to check MySQL connection
app.get('/', (req, res) =>{
  return res.status(200).json({message:"Welcome"});
})
app.use('/auth', authRoutes);
app.use('/doctors', doctorRoutes);
app.use('/patients', patientRoutes);
app.use('/appointments', appointmentRoutes);
app.use("*",(req,res)=>{
    return res.json({message:"Wrong route"})
})
const PORT = process.env.PORT || 5005;

app.listen(PORT, async () => {
  await mongoConfig();
await testConnection();
  console.log("DB Connected")
    console.log(`Server running on port ${PORT}`);
});
