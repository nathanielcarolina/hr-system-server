const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
app.use( bodyParser.urlencoded({ extended: true }) );
app.use( bodyParser.json() );

const SELECT_ALL_EMPLOYEES_ASC = 'SELECT * FROM show_emp_records ORDER BY LastName ASC';
const SELECT_EMPLOYEES_BY_DEPT = 'SELECT * FROM show_emp_records WHERE Dept_ID = ? ORDER BY LastName ASC';
const SELECT_EMPLOYEE = 'SELECT * FROM show_emp_records WHERE EmployeeID = ?';
const SELECT_ALL_DEPARTMENTS = 'SELECT * FROM department';
const SELECT_ALL_EMP_STATUS = 'SELECT * FROM emp_status';
const SELECT_ALL_POSITIONS = 'SELECT Position_ID, Position_Name FROM position WHERE Dept_ID = ?';
const SELECT_ADDRESS = 'SELECT * FROM address WHERE Person_ID = ?';
const SELECT_CANDIDATE_STATUS = 'SELECT * FROM show_pending_candidates WHERE NOT Hiring_Status = "Hired"';
const UPDATE_CANDIDATE_STATUS = 'UPDATE candidate SET Hiring_Status_ID = ? WHERE Candidate_ID = ?';
const SELECT_PERFORMANCES = 'SELECT * FROM performance ORDER BY Rating_Date DESC';
const SELECT_EQUIPMENT_STATUS = 'select * from show_equipment';
const SELECT_PERF_BY_EMP = 'SELECT * FROM performance WHERE Emp_ID = ?';
const SELECT_PERFORMANCES = 'SELECT * FROM performance ORDER BY Rating_Date DESC';


const INSERT_PERFORMANCE = 'INSERT INTO performance (Emp_ID, Manager_ID, Rating, Comments, Rating_Date) VALUES (?, ?, ?, ?, ?)';
const SELECT_CONTACT = 'SELECT * FROM contact WHERE Emp_ID = ?';
const SELECT_PAYROLL = 'SELECT * FROM payroll WHERE Emp_ID = ?';
const SELECT_LEAVES = 'SELECT * FROM leave_mgmt WHERE Emp_ID = ?';


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'hr_db',
    multipleStatements: true
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

app.get('/contact/:id', (req, res) => {
    connection.query(SELECT_CONTACT, [req.params.id], (err, results) => {
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

app.get('/payroll/:id', (req, res) => {
    connection.query(SELECT_PAYROLL, [req.params.id], (err, results) => {
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

app.get('/leaves/:id', (req, res) => {
    connection.query(SELECT_LEAVES, [req.params.id], (err, results) => {
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

app.get('/performance/:id', (req, res) => {
    connection.query(SELECT_PERF_BY_EMP, [req.params.id], (err, results) => {
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

app.get('/performances', (req, res) => {
    connection.query(SELECT_PERFORMANCES, (err, results) => {
        if (err) {
            return res.send(err);
        } else {
            return res.json({
                data: results
            })
        }
    });
});

app.post('/performance/new', (req, res) => {    
    let body = req.body;
    // connection.query(INSERT_PERFORMANCE, [
    //     body.EmployeeID, 
    //     body.RatedBy, 
    //     body.Rating, 
    //     body.Comments, 
    //     body.RatingDate
    // ], (err, rows) => {
    //     if (err)
    //         console.log(err);
    //     else
    //         res.send(rows);

let newPerformance = "\
    SET @emp = ?; \
    SET @Mang_ID = ?; \
    SET @Rate = ?; \
    SET @Comm = ?; \
    SET @ratdate = ?; \
    CALL CheckPerformanceDetailsAndUpdate(\
    @emp, \
    @Mang_ID, \
    @Rate, \
    @Comm, \
    @ratdate);";
    connection.query(newPerformance, [
        body.EmployeeID,
        body.RatedBy, 
        body.Rating, 
        body.Comments, 
        body.RatingDate
    ], (err, rows) => {
        if(err)
            console.log(err);
        else
            res.send(rows);
    })
});

app.get('/department-employees/:deptID', (req, res) => {
    connection.query(SELECT_EMPLOYEES_BY_DEPT, [req.params.deptID], (err, results) => {
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
app.post('/candidate/new', (req,res) => {
    let can = req.body;
    var candidateins = " SET @FName = ?; SET @LName = ?; SET @Email = ?; \
         SET @addr1 = ?; SET @addr2 = ?; SET @State = ?; \
        SET @City = ?;SET @Country = ?;SET @Zipcode = ?; \
        SET @Empstatusid = ?; SET @deptid = ?; SET @posi = ?; \
        SET @School = ?;SET @Degree = ?;SET @School_Start_Date = ?; SET @School_End_Date = ?; \
        SET @Company = ?;SET @Company_Position = ?;SET @Company_Start_Date = ?; \
        SET @Company_End_Date = ?; SET @Grades = ?;  SET @w_s1 = ?; SET @w_s2 = ?; \
        SET @DOB = ?;SET @Nationality = ?;SET @SSN = ?;SET @Contact = ?; SET @remarks = ?; \
        CALL newcandidateform(@FName,@LName,@Email, @addr1,@addr2,@State, \
            @City,@Country,@Zipcode,@Empstatusid, @deptid, @posi, \
            @School,@Degree,@School_Start_Date,@School_End_Date,@Company, \
            @Company_Position,@Company_Start_Date,@Company_End_Date,@Grades,@w_s1,@w_s2,\
            @DOB,@Nationality,@SSN,@Contact,@remarks);" ;

    connection.query(candidateins, [
        can.FName, 
        can.LName, 
        can.PersonalEmail, 
        can.Address1, 
        can.Address2, 
        can.State,
        can.City, 
        can.Country, 
        can.Zip, 
        can.EmployeeStatus, 
        can.Department, 
        can.Position, 
        can.School, 
        can.School_Degree, 
        can.School_StartDate, 
        can.School_EndDate, 
        can.Company, 
        can.Company_Position, 
        can.Company_StartDate, 
        can.Company_EndDate, 
        null, 
        "S", 
        "W",
        can.DOB, 
        "German", 
        can.SSN, 
        can.PersonalContact,
        can.Remarks
    ], (err, rows)=>{
        if(err)
            console.log(err);
        else
            res.send(rows);
    })
});

app.post('/separation', (req,res) => {
    let sep = req.body;
    var separate = "SET @emps = ?; SET @dor = ?; SET @lwd = ?; SET @fnf = ?; \
    SET @rol = ?; SET @eqpreturn = ?;\
    CALL insertonseparation(@emps, @dor, @lwd, @fnf, \
        @rol, @eqpreturn);" ;
    connection.query(separate,[
        sep.emps, sep.dor, sep.lwd, sep.fnf, 
sep.rol, sep.eqpreturn] ,(err, rows)=>{
    if(err)
        console.log(err);
    else
        res.send(rows);
})

});



// "FName":null,
// "LName":null,
// "MName":null,
// "PersonalEmail":null,
// "PersonalContact":null,
// "DOB":null,
// "SSN":null,
// "Address1":null,
// "Address2":null,
// "City":null,
// "State":null,
// "Zip":null,
// "Country":"Deutschland",
// "Department":null,
// "Position":null,
// "EmployeeStatus":null,
// "School":null,
// "School_Degree":null,
// "School_StartDate":null,
// "School_EndDate":null,
// "Company":null,
// "Company_Position":null,
// "Company_StartDate":null,
// "Company_EndDate":null
 
app.post('/employee/edit/personal-information', (req, res) => {    
    let emp = req.body;
    console.log(emp);
    var employeeEditPersonalInformation = "\
        SET @emps = ?; \
        SET @Posi = ?; \
        SET @Manag_ID = ?; \
        SET @Empsta = ?; \
        SET @percont = ?; \
        SET @workcont = ?; \
        SET @addr1 = ?; \
        SET @addr2 = ?; \
        SET @cit = ?; \
        SET @stat = ?; \
        SET @zipc = ?; \
        SET @countr = ?; \
        CALL Checkempdetailsandupdate(\
        @emps, \
        @Posi, \
        @Manag_ID, \
        @Empsta, \
        @percont, \
        @workcont, \
        @addr1, \
        @addr2, \
        @cit, \
        @stat, \
        @zipc, \
        @countr);"; 
    connection.query(employeeEditPersonalInformation, [
        emp.EmployeeID, 
        emp.Position, 
        emp.Manager, 
        emp.EmployeeStatus, 
        emp.PersonalContact, 
        emp.WorkContact, 
        emp.Address1, 
        emp.Address2, 
        emp.City, 
        emp.State, 
        emp.Zip, 
        "Deutschland"
        // emp.Department ?        
    ], (err, rows) => {
        if (err) {
            console.log(err);
        }
        else {
            // console.log(rows);
            res.send(rows);
        }
    })
});

app.post('/employee/edit/payroll', (req, res) => {    
    let body = req.body;
    let employeeEditPayroll = "\
        SET @emp = ?; \
        SET @Compen = ?; \
        SET @B = ?; \
        SET @ShiftD = ?; \
        SET @BankName = ?; \
        SET @IBANDet = ?; \
        SET @BICDet = ?; \
        SET @IncrementVal = ?; \
        CALL CheckPayrollDetailsAndUpdate(\
        @emp, \
        @Compen, \
        @B, \
        @ShiftD, \
        @BankName, \
        @IBANDet, \
        @BICDet, \
        @IncrementVal);";
    connection.query(employeeEditPayroll, [
        body.EmployeeID, 
        body.Compensation, 
        body.Bonus, 
        " ", 
        body.BankName, 
        body.IBAN, 
        body.BIC, 
        body.Increment       
    ], (err, rows)=>{
        if (err)
            console.log(err);
        else
            res.send(rows);
    })
});

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

app.post("/candidatestatus/edit/:candidateID/:hiringStatusID", (req, res) => {
    connection.query(UPDATE_CANDIDATE_STATUS, [
        req.params.hiringStatusID, 
        req.params.candidateID
    ], (err, rows) => {
        if (err)
            console.log(err);
        else
            console.log(rows);
            res.send(rows);
    })
});

app.get('/equipment', (req, res) => {
    connection.query(SELECT_EQUIPMENT_STATUS, (err, results) => {
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