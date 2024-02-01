import axios from "axios";

async function deleteStudent(studentId) {
    try {
        const response = await axios.delete(
            `https://localhost:3030/api/students/${studentId}`
        );
        if (response.status === 204) {
            console.log("Student deleted successfully");
        }
    } catch (err) {
        if (err.response && err.response.status === 404) {
            console.error("Student not found");
        } else {
            console.error(
                "Tried to Delete Student but got error. Error deleting student:",
                err.message
            );
        }
    }
}

async function getAllStudent() {
    const apiUrl = `https://localhost:3030/api/students`;
    let studentList = null;

    await axios.get(apiUrl)
        .then((response) => {
            studentList = response.data;
        })
        .catch((error) => {
            console.error("Error fetching student data: ", error);
        });

    return studentList;
}

export {deleteStudent, getAllStudent};
