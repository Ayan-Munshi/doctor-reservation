const mongoose = require("mongoose")

const doctorSchema = mongoose.Schema({
    name:String,
    appointments:[
        {
            patientName:String,
            PatientEmail:String,
            patientNumber:Number,
            date: String,
            timeSlot:String
        }
    ]
    
})

module.exports = mongoose.model('doctors',doctorSchema)
