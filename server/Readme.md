Dependencies:

Express: Web framework for Node.js.

Cors: Middleware to enable Cross-Origin Resource Sharing.

fs: File system module to read and write files.

Body-parser: Middleware to parse incoming request bodies.


Express Setup:

Creates an Express application.
Uses body-parser and cors middlewares for request parsing and enabling cross-origin requests.

Routes:

GET "/": Reads student details from a file (student.txt) where data is saved in CSV format and returns the data as JSON.

GET "/getstudentbyclass/:id": It will retrieve the student details by standard from the file and return the filtered data as JSON.

GET "/getstudentbyname/:id": It will retrieve the student details by class from the file and return the filtered data as JSON.

POST "/addstudent": Add a new student detail in the file and return the updated data as JSON format.

PUT "/updatestudent": Updates an existing student record in the file based on the provided index and returns the updated data as JSON.

DELETE "/deletestudent/:id": Deletes student record from the file based on the provided name and returns the updated data as JSON.

File Operations:

Reads and writes student records to/from a file (student.txt).

File content is processed to create a structured representation of student data.

Server Initialization:

Listens on port 5000 for incoming requests.

Outputs server listening message on successful initialization.

Usage:

To add, update, delete, or retrieve student data, clients can make HTTP requests to the corresponding endpoints.
Note:

This code uses a simple text file (student.txt) to store student records, with each line representing a record and space-separated values for different attributes (name, age, dob, salary, department).
