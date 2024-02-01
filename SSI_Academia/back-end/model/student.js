import mongoose from "mongoose";

const Student = mongoose.model(
    "Student",
    new mongoose.Schema({
        name: {type: String, required: true},
        email: {type: String, required: true, unique: true},
        student_id: {type: String, required: true, unique: true},
        graduation_session: {type: String, required: true},
        date_of_birth: {type: String, required: true},
        cgpa: {type: String, required: true},
        date_of_issuance: {type: String, required: true},
        grades: {
            programming_language_II: String,
            data_structures: String,
            algorithms: String,
            data_communications: String,
            computer_networks: String,
            biology_101: String,
        },
    })
);


export {Student};
