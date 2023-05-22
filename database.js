// create a connection to the database
const mysql = require('mysql');
const express = require('express');
const cors = require('cors');
const cp = require('cookie-parser');
// const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const { check, validationResult } = require('express-validator');

const app = express();

app.use(express.json());

app.use(express.static('public'));

app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET", "PUT","DELETE"],
    credentials: true}));

app.use(cp());
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: '8889',
    password: 'root',
    database: 'laundry_system',
    multipleStatements: true
  });
  
  connection.connect((err) => {

    if(!err)
        console.log('Database is connected!');
    else
        console.log('Database not connected! : '+ JSON.stringify(err, undefined,2));
    });

   
    app.get("/", (req, res) => {
        res.json("hello");

      });

    // Services CRUD
    
   
    app.get("/services", (req, res) => {   
        const sql = "SELECT * FROM `Service`";   
        connection.query(sql, (err, data) => {        
            if(err) return res.json(err);        
            return res.json(data);    
        });
    });

    app.get("/services/:id", (req, res) => {   
        const {id} = req.params; 
        const sql = "SELECT * FROM Service WHERE ID = ?";   
         connection.query(sql, id, (err, data) => {        
            if(err) return res.json(err);        
            return res.json(data);    
        });
    });


    app.post('/services', (req, res) => {    
        const sql = "INSERT INTO Service (`Name`, `Description`, `QtyInStock`, `Price`, `CuponID`) VALUES (?)";    
        const values = [  req.body.name,       
             req.body.description, 
             req.body.qtyinstock, 
             req.body.price, 
             req.body.cuponid]    
        connection.query(sql, [values], (err, data) => {        
            if(err) return res.json("Error");       
            return res.json(data);   
             })
        })

    app.put('/services/:id', (req, res) => {    
        const sql = "UPDATE Service SET `Name` = ?, `Description` = ?, `QtyInStock` = ?, `Price` = ?, `CuponID` = ? WHERE id = ?";   
        const values = [  req.body.name,       
                req.body.description, 
                req.body.qtyinstock, 
                req.body.price, 
                req.body.cuponid]
        const id = req.params.id;    
        connection.query(sql, [...values, id], (err, data) => {        
            if(err) return res.json(err);       
                return res.json(data);   
                })
    })

    app.delete('/services/:id', (req, res) => {    
        const sql = "DELETE FROM Service WHERE id = ?";    
        const id = req.params.id;       
        connection.query(sql, [id], (err, data) => {       
             if(err) return res.json("Error");        
             return res.json(data);    
            })
        })

        
    // EmployeeLogin Verification and Logout

    const verifyUser = (req, res, next) => {
        const token = req.cookies.token;
        if(!token) {
            return res.json({Error: "You are no Authenticated"});
        } else {
            jwt.verify(token, "jwt-secret-key", (err, decoded) => {
                if(err) return res.json({Error: "Token wrong"});
                next();
            } )
        }
    }

    app.get('/verifiedUsers',verifyUser, (req, res) => {
        return res.json({Status: "Success"})
    })

    app.post('/adminlogin', (req, res) => {
        const sql = "SELECT * FROM Employee Where `LoginID` = ? AND  `Password` = ?";
        connection.query(sql, [req.body.loginid, req.body.password], (err, result) => {
            if(err) return res.json({Status: "Error", Error: "Error in running query"});
            if(result.length > 0) {
                const id = result[0].id;
                const token = jwt.sign({id}, "jwt-secret-key", {expiresIn: '1d'});
                res.cookie('token', token);
                return res.json({Status: "Success"})
            } else {
                return res.json({Status: "Error", Error: "Wrong Email or Password"});
            }
        })
    })

    app.get('/adminlogout', (req, res) => {
        res.clearCookie('token');
        return res.json({Status: "Success"});
    })

    // Cupons CRUD
    app.get("/cupons", (req, res) => {   
        const sql = "SELECT * FROM `Cupon`";   
        connection.query(sql, (err, data) => {        
            if(err) return res.json(err);        
            return res.json(data);    
        });
    });

    app.get("/cupons/:id", (req, res) => {   
        const {id} = req.params; 
        const sql = "SELECT * FROM Cupon WHERE ID = ?";   
         connection.query(sql, id, (err, data) => {        
            if(err) return res.json(err);        
            return res.json(data);    
        });
    });

    app.post('/cupons', (req, res) => {    
        const sql = "INSERT INTO Cupon (`DiscountAmount`, `MinPurchase`, `ServiceCode`, `Description`) VALUES (?)";    
        const values = [  req.body.discount,       
             req.body.minpurchase, 
             req.body.promocode, 
             req.body.description]    
        connection.query(sql, [values], (err, data) => {        
            if(err) return res.json(err);       
            return res.json(data);   
             })
        })

    app.put('/cupons/:id', (req, res) => {    
        const sql = "UPDATE Cupon SET `DiscountAmount` = ?, `MinPurchase` = ?, `ServiceCode` = ?, `Description` = ? WHERE id = ?";   
        const values = [ req.body.discount,       
            req.body.minpurchase, 
            req.body.promocode, 
            req.body.description]
        const id = req.params.id;    
        connection.query(sql, [...values, id], (err, data) => {        
            if(err) return res.json(err);       
                return res.json(data);   
                })
    })

    app.delete('/cupons/:id', (req, res) => {    
        const sql = "DELETE FROM Cupon WHERE id = ?";    
        const id = req.params.id;       
        connection.query(sql, [id], (err, data) => {       
             if(err) return res.json(err);        
             return res.json(data);    
            })
    })

    //Orders READ, UPDATE, DELETE
    // app.get("/orders", (req, res) => {   
    //     const sql = "SELECT * FROM `Order`";   
    //     connection.query(sql, (err, data) => {        
    //         if(err) return res.json(err);        
    //         return res.json(data);    
    //     });
    // })

    // app.get("/orders/:id", (req, res) => {   
    //         const {id} = req.params; 
    //         const sql = "SELECT * FROM `Order` WHERE ID = ?";   
    //         connection.query(sql, id, (err, data) => {        
    //             if(err) return res.json(err);        
    //             return res.json(data);    
    //         });
    //     })
        
    app.get("/orders", (req, res) => {   
        const sql = "SELECT ol.`ID`,  DATE_FORMAT(ol.OrderDate, '%m-%d-%Y') as orderdate, DATE_FORMAT(ol.RequiredDate, '%m-%d-%Y') as reqdate, DATE_FORMAT(ol.ProcessDate, '%m-%d-%Y') as processdate, ol.Status, ol.Status, cl.FirstName,cl.LastName FROM `Order` ol JOIN `Customer` cl ON ol.CustomerID= cl.ID;";   
        connection.query(sql, (err, data) => {        
            if(err) return res.json(err);        
            return res.json(data);    
        });
    })

    app.get("/orders/:id", (req, res) => {   
        const {id} = req.params; 
        const sql = "SELECT ol.*, cl.FirstName,cl.LastName FROM `Order` ol JOIN `Customer` cl ON ol.CustomerID= cl.ID WHERE ol.ID = ?";   
        connection.query(sql, id, (err, data) => {        
            if(err) return res.json(err);        
            return res.json(data);    
        });
    })

    app.put('/orders/:id', (req, res) => {    
        const sql = "UPDATE `Order` SET `ProcessDate` = ?, `Status` = ? WHERE id = ?";   
        const values =
         [  req.body.processdate, 
            req.body.status]
        const id = req.params.id;    
        connection.query(sql, [...values, id], (err, data) => {        
            if(err) return res.json(err);       
                return res.json(data);   
                })
    })
    //Payment Read and Delete
    app.get("/payments", (req, res) => {   
        const sql = "SELECT DATE_FORMAT(pl.PaymentDate, '%Y-%m-%d') as pdate, pl.ID, pl.Amount , pl.PaymentStatus, pl.PaymentType, cl.FirstName, cl.LastName FROM `Payment` pl JOIN `Customer` cl ON pl.CustomerID= cl.ID";   
        connection.query(sql, (err, data) => {        
            if(err) return res.json(err);        
            return res.json(data);    
        });
    });

    app.get("/payments/:id", (req, res) => {   
        const {id} = req.params; 
        const sql = "SELECT * FROM `Payment` WHERE ID = ?";   
         connection.query(sql, id, (err, data) => {        
            if(err) return res.json(err);        
            return res.json(data);    
        });
    });

    app.put('/payments/:id', (req, res) => {    
        const sql = "UPDATE `Payment` SET `PaymentStatus` = ? WHERE ID = ?";   
        const values = [ req.body.status]
        const id = req.params.id;    
        connection.query(sql, [...values, id], (err, data) => {        
            if(err) return res.json(err);       
                return res.json(data);   
                })
    })

    //get info for Catalog: Service and Cupons

    //404 Notice
    app.get("/:universalURL", (req, res) => {
        res.send("404 URL NOT FOUND");
    });

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Listening on port ${port}..`));