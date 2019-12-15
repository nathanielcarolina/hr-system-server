const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
app.use( bodyParser.urlencoded({ extended: true }) );
app.use( bodyParser.json() );

const SELECT_ALL_EMPLOYEES_ASC = 'SELECT * FROM show_emp_records ORDER BY LastName ASC';
const SELECT_EMPLOYEE = 'SELECT * FROM show_emp_records WHERE EmployeeID = ?';
const SELECT_ALL_DEPARTMENTS = 'SELECT * FROM department';
const SELECT_ALL_EMP_STATUS = 'SELECT * FROM emp_status';
const SELECT_ALL_POSITIONS = 'SELECT Position_ID, Position_Name FROM position WHERE Dept_ID = ?';
const SELECT_ADDRESS = 'SELECT * FROM address WHERE Person_ID = ?';
const SELECT_CANDIDATE_STATUS = 'SELECT * FROM show_pending_candidates ';


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




    // connection.query(SELECT_EMPLOYEE, [req.params.id], (err, results) => {
    //     if (err) {
    //         return res.send(err);
    //     } else {
    //         console.log(results);
    //         return res.json({
    //             data: results
    //         })
    //     }
    // });



app.get('/employee/:id', (req, res) => {
    connection.query(SELECT_EMPLOYEE, [req.params.id], (err, results) => {
        if (err) {
            return res.send(err);
        } else {
            console.log(results);
            return res.json({
                data: results
            })
        }
    });
});

app.get('/department/:id', (req, res) => {
    connection.query(SELECT_ALL_POSITIONS, [req.params.id], (err, results) => {
        if (err) {
            return res.send(err);
        } else {
            console.log(results);
            return res.json({
                data: results
            })
        }
    });
});

app.get('/address/:id', (req, res) => {
    connection.query(SELECT_ADDRESS, [req.params.id], (err, results) => {
        if (err) {
            return res.send(err);
        } else {
            console.log(results);
            return res.json({
                data: results
            })
        }
    });
});

app.get('/employees', (req, res) => {
    connection.query(SELECT_ALL_EMPLOYEES_ASC, (err, results) => {
        if (err) {
            return res.send(err);
        } else {
            return res.json({
                data: results
            })
        }
    });
});

app.get('/departments', (req, res) => {
    connection.query(SELECT_ALL_DEPARTMENTS, (err, results) => {
        if (err) {
            return res.send(err);
        } else {
            return res.json({
                data: results
            })
        }
    });
});

app.get('/employee-statuses', (req, res) => {
    connection.query(SELECT_ALL_EMP_STATUS, (err, results) => {
        if (err) {
            return res.send(err);
        } else {
            return res.json({
                data: results
            })
        }
    });
});

// Insert an candidate
app.post('/candidate', (req,res) => {
    let can = req.body;
    var candidateins = " SET @FName = ?; SET @LName = ?; SET @Email = ?; \
         SET @addr1 = ?; SET @addr2 = ?; SET @State = ?; \
        SET @City = ?;SET @Country = ?;SET @Zipcode = ?; \
        SET @Emp_Status_Name = ?;SET @Department = ?;SET @Position1 = ?; \
        SET @School = ?;SET @Degree = ?;SET @School_Start_Date = ?; SET @School_End_Date = ?; \
        SET @Company = ?;SET @Company_Position = ?;SET @Company_Start_Date = ?; \
        SET @Company_End_Date = ?; SET @Grades = ?;  SET @w_s1 = ?; SET @w_s2 = ?; \
        SET @DOB = ?;SET @Nationality = ?;SET @SSN = ?;SET @Contact = ?; \
        CALL newcandidateform(@FName,@LName,@Email,@addr1,@addr2,@State, \
            @City,@Country,@Zipcode,@Emp_Status_Name,@Department,@Position1, \
            @School,@Degree,@School_Start_Date,@School_End_Date,@Company, \
            @Company_Position,@Company_Start_Date,@Company_End_Date,@Grades,@w_s1,@w_s2,\
            @DOB,@Nationality,@SSN,@Contact);" ;

    mysqlConnection.query(candidateins, [can.FName, can.LName, can.Email, 
         can.addr1, can.addr2, can.State,
        can.City, can.Country, can.Zipcode, can.Emp_Status_Name, can.Department, can.Position1, 
        can.School, can.Degree, can.School_Start_Date, can.School_End_Date, can.Company, can.Company_Position, 
        can.Company_Start_Date, can.Company_End_Date, can.Grades, can.w_s1, can.w_s2,
        can.DOB, can.Nationality, can.SSN, can.Contact, ], (err, rows,)=>{
        if(err)
        console.log(err);
        else
        res.send(rows);
    })
});

app.post('/employee/edit/personal-information', (req, res) => {    

    //Need help in updating database (calling stored procedure) using information from req.body
    let emp = req.body;
    var employeeedit = "SET @Posi = ?; SET @Manag_ID = ?; SET @Empsta   = ?; \
    SET @percont = ?; SET @workcont = ?; SET @addr1 = ?; \
    SET @addr2 = ?; SET @cit = ?; SET @stat = ?; SET @zipc = ?; SET @countr = ?; \
    CALL Checkempdetailsandupdate(@Posi, @Manag_ID, @Empsta, @percont, @workcont, @addr1, @addr2, @cit, @stat, @zipc, @countr,  ); " ; 
    
mysqlConnection.query(employeeedit,[emp.Posi, emp.Manag_ID, emp.Emp.sta  , 
    emp.percont, emp.workcont, emp.addr1,
    emp.addr2, emp.cit, emp.stat, emp.zipc, emp.countr,
    ],(err, rows)=>{
        if(err)
        console.log(err)
        else
        res.send(rows);
    })
});

app.post('/employee/edit/payroll', (req, res) => {    

    //Need help in updating database (calling stored procedure) using information from req.body
    let body = req.body;
    console.log(req.body);
})
app.get('/candidatestatus', (req, res) => {
    connection.query(SELECT_CANDIDATE_STATUS, (err, results) => {
        if (err) {
            return res.send(err);
        } else {
            return res.json({
                data: results
            })
        }
    });
});

// app.get('/employee/edit/id4545', (req, res) => {
//     let testpost  = {Emp_ID: 102, Contact_Type_ID: 1, contact_Number: '222222222'};
//     connection.query('UPDATE person SET Personal_Contact = ? WHERE Person_ID = 11', [testpost.contact_Number], function (err, results) {
//         if (err) {
//             return res.send(err);
//         } else {
//             return res.json({
//                 data: results
//             })
//         }
//     });
// });

// app.get('/employeesXXXXX', (req, res) => {
//     return res.json({
//         data: [
//             {
//                 "Emp_ID": 1,
//                 "department": "Administrative",
//                 "LName": "Sharma",
//                 "FName": "Shivam",
//                 "Position_Name": "Administrative Officer",
//                 "Emp_Status": "Full-time",
//                 "Manager_LName": "Smith",
//                 "Manager_FName": "Ben",
//                 "Total_Compensation": 68000,
//                 "Total_Availed_Leaves": 57,
//                 "Total_Remaining_Leaves": 30,
//                 "Rating_Date": "10/03/2019",
//                 "Rating": 95
//             },
//             {
//                 "Emp_ID": 2,
//                 "department": "Development",
//                 "LName": "Khona",
//                 "FName": "Raj",
//                 "Position_Name": "Software Developer",
//                 "Emp_Status": "Consultant",
//                 "Manager_LName": "Rogers",
//                 "Manager_FName": "Kenny",
//                 "Total_Compensation": 71000,
//                 "Total_Availed_Leaves": 67,
//                 "Total_Remaining_Leaves": 34,
//                 "Rating_Date": "25/04/2019",
//                 "Rating": 90
//             },
//             {
//                 "Emp_ID": 3,
//                 "department": "Finance",
//                 "LName": "Jain",
//                 "FName": "Abhijeet",
//                 "Position_Name": "Finance Officer",
//                 "Emp_Status": "Working Student",
//                 "Manager_LName": "Bush",
//                 "Manager_FName": "George",
//                 "Total_Compensation": 75000,
//                 "Total_Availed_Leaves": 40,
//                 "Total_Remaining_Leaves": 60,
//                 "Rating_Date": "10/07/2019",
//                 "Rating": 93
//             },
//             {
//                 "Emp_ID": 4,
//                 "department": "Human Resources",
//                 "LName": "Carolina",
//                 "FName": "Nathaniel",
//                 "Position_Name": "Human Resources Officer",
//                 "Emp_Status": "Working Student",
//                 "Manager_LName": "Anders",
//                 "Manager_FName": "Jörg",
//                 "Total_Compensation": 64000,
//                 "Total_Availed_Leaves": 46,
//                 "Total_Remaining_Leaves": 73,
//                 "Rating_Date": "10/03/2018",
//                 "Rating": 85
//             },
//             {
//                 "Emp_ID": 5,
//                 "department": "IT Support",
//                 "LName": "Ghule",
//                 "FName": "Snehal",
//                 "Position_Name": "IT Support Officer",
//                 "Emp_Status": "Full-time",
//                 "Manager_LName": "Müller",
//                 "Manager_FName": "Josef",
//                 "Total_Compensation": 83000,
//                 "Total_Availed_Leaves": 80,
//                 "Total_Remaining_Leaves": 92,
//                 "Rating_Date": "14/07/2018",
//                 "Rating": 89
//             }
//         ]
//     })
// });

// app.get('/equipment', (req, res) => {
//     return res.json({
//         data: [
//             {
//                 "Equipment_ID": 1,
//                 "Equipment_Name": "Dell Laptop",
//                 "Assigned_To": "Jain, Abhijeet"
//             },
//             {
//                 "Equipment_ID": 2,
//                 "Equipment_Name": "Apple Monitor 1",
//                 "Assigned_To": "Ghule, Snehal"
//             },
//             {
//                 "Equipment_ID": 3,
//                 "Equipment_Name": "Apple Mouse 1",
//                 "Assigned_To": "Ghule, Snehal"
//             },
//             {
//                 "Equipment_ID": 4,
//                 "Equipment_Name": "Apple Mouse 2",
//                 "Assigned_To": "Khona, Raj"
//             },
//             {
//                 "Equipment_ID": 5,
//                 "Equipment_Name": "Apple MacBook Pro",
//                 "Assigned_To": "Sharma, Shivam"
//             }
//         ]
//     })
// }) 

app.listen(4000, () => {
    console.log('HR-System server listening on Port 4000');
});