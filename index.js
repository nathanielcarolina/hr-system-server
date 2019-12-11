const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

const SELECT_ALL_EMPLOYEES = 'SELECT * FROM show_emp_records';

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'hr_db'
});

connection.connect(err => {
    if (err) {
        console.log(err);
        return err;
    } else {
        console.log('Connected to the MySQL server');
    }
});

app.use(cors());

app.get('/employees', (req, res) => {
    connection.query(SELECT_ALL_EMPLOYEES, (err, results) => {
        if (err) {
            return res.send(err);
        } else {
            return res.json({
                data: results
            })
        }
    });
});

app.get('/employeesefhduc', (req, res) => {
    return res.json({
        data: [
            {
                "Emp_ID": 1,
                "department": "Administrative",
                "LName": "Sharma",
                "FName": "Shivam",
                "Position_Name": "Administrative Officer",
                "Emp_Status": "Full-time",
                "Manager_LName": "Smith",
                "Manager_FName": "Ben",
                "Total_Compensation": 68000,
                "Total_Availed_Leaves": 57,
                "Total_Remaining_Leaves": 30,
                "Rating_Date": "10/03/2019",
                "Rating": 95
            },
            {
                "Emp_ID": 2,
                "department": "Development",
                "LName": "Khona",
                "FName": "Raj",
                "Position_Name": "Software Developer",
                "Emp_Status": "Consultant",
                "Manager_LName": "Rogers",
                "Manager_FName": "Kenny",
                "Total_Compensation": 71000,
                "Total_Availed_Leaves": 67,
                "Total_Remaining_Leaves": 34,
                "Rating_Date": "25/04/2019",
                "Rating": 90
            },
            {
                "Emp_ID": 3,
                "department": "Finance",
                "LName": "Jain",
                "FName": "Abhijeet",
                "Position_Name": "Finance Officer",
                "Emp_Status": "Working Student",
                "Manager_LName": "Bush",
                "Manager_FName": "George",
                "Total_Compensation": 75000,
                "Total_Availed_Leaves": 40,
                "Total_Remaining_Leaves": 60,
                "Rating_Date": "10/07/2019",
                "Rating": 93
            },
            {
                "Emp_ID": 4,
                "department": "Human Resources",
                "LName": "Carolina",
                "FName": "Nathaniel",
                "Position_Name": "Human Resources Officer",
                "Emp_Status": "Working Student",
                "Manager_LName": "Anders",
                "Manager_FName": "Jörg",
                "Total_Compensation": 64000,
                "Total_Availed_Leaves": 46,
                "Total_Remaining_Leaves": 73,
                "Rating_Date": "10/03/2018",
                "Rating": 85
            },
            {
                "Emp_ID": 5,
                "department": "IT Support",
                "LName": "Ghule",
                "FName": "Snehal",
                "Position_Name": "IT Support Officer",
                "Emp_Status": "Full-time",
                "Manager_LName": "Müller",
                "Manager_FName": "Josef",
                "Total_Compensation": 83000,
                "Total_Availed_Leaves": 80,
                "Total_Remaining_Leaves": 92,
                "Rating_Date": "14/07/2018",
                "Rating": 89
            }
        ]
    })
});

app.get('/equipment', (req, res) => {
    return res.json({
        data: [
            {
                "Equipment_ID": 1,
                "Equipment_Name": "Dell Laptop",
                "Assigned_To": "Jain, Abhijeet"
            },
            {
                "Equipment_ID": 2,
                "Equipment_Name": "Apple Monitor 1",
                "Assigned_To": "Ghule, Snehal"
            },
            {
                "Equipment_ID": 3,
                "Equipment_Name": "Apple Mouse 1",
                "Assigned_To": "Ghule, Snehal"
            },
            {
                "Equipment_ID": 4,
                "Equipment_Name": "Apple Mouse 2",
                "Assigned_To": "Khona, Raj"
            },
            {
                "Equipment_ID": 5,
                "Equipment_Name": "Apple MacBook Pro",
                "Assigned_To": "Sharma, Shivam"
            }
        ]
    })
}) 

app.listen(4000, () => {
    console.log('HR-System server listening on Port 4000');
});