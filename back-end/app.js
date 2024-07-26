const cookieParser = require("cookie-parser")
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const cors = require("cors")
const doctorModel = require("./models/doctor")


app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Add this line to handle JSON request bodies


app.use(cors({
    origin: 'http://localhost:5173', // Your React app's URL
    methods: 'GET,POST',
    allowedHeaders: 'Content-Type'
  }));

  

const port = 3000

mongoose.connect("mongodb://127.0.0.1:27017/doctor").then(() => console.log("db connected"))
.catch((err) => console.log(err.message))



app.post('/create_doc', async (req, res) => {
  try {
      const { doc_name } = req.body;
      const doc = await doctorModel.create({ name: doc_name });
      res.json(doc); // Send the created doc back to the client
  } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.get('/', async(req, res) => {
  // if (latestDoctor) {
  //     res.json(latestDoctor); // Sending the stored data
  // } else {
  //     res.status(404).json({ error: 'No doctor created yet' });
  // }
  const doctors = await doctorModel.find()
  res.json(doctors)

});



app.post("/create_reservation/:docID", async(req, res) => {
   const { firstName,lastName,email,number,selectedDate, selectedTime } = req.body;
  // console.log("First Name:", firstName,lastName,email,number,selectedDate, selectedTime);
  // res.status(200).send("Data received");

  doctor = await doctorModel.findOne({_id:req.params.docID})
  if(doctor) {
    const appointmentExists = doctor.appointments.some(appointment =>
      appointment.date === selectedDate && appointment.timeSlot === selectedTime
    );
    if(appointmentExists) console.log("slot already booked please try another time")

    else{
      const newAppointment = {
        patientName: `${firstName} ${lastName}`,
        date: selectedDate,
        timeSlot: selectedTime,
        patientNumber:number,
        patientEmail:email
      };
  
      // Adding manually the new appointment to the doctor's appointments array
      doctor.appointments.push(newAppointment);
      await doctor.save();
  
      console.log(`Appointment created successfully for Dr. ${doctor.name}`);
    }

     
    }
});


app.listen(port,() => {
    console.log("server is online on port number", port)
})