const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

app.get('/employees', (req, res) => {
    return res.json({
        data: [
            {
                "Emp_ID": 1,
                "department": "Administrative",
                "LName": "Sharma",
                "FName": "Shivam",
                "Position_Name": "Administrative Officer"
            },
            {
                "Emp_ID": 2,
                "department": "Development",
                "LName": "Khona",
                "FName": "Raj",
                "Position_Name": "Software Developer"
            },
            {
                "Emp_ID": 3,
                "department": "Finance",
                "LName": "Jain",
                "FName": "Abhijeet",
                "Position_Name": "Finance Officer"
            },
            {
                "Emp_ID": 4,
                "department": "Human Resources",
                "LName": "Carolina",
                "FName": "Nathaniel",
                "Position_Name": "Human Resources Officer"
            },
            {
                "Emp_ID": 5,
                "department": "IT Support",
                "LName": "Ghule",
                "FName": "Snehal",
                "Position_Name": "IT Support Officer"
            }
        ]
    })
});

app.listen(4000, () => {
    console.log('HR-System server listening on Port 4000');
});