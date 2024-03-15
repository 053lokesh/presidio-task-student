import StudentContext from "../../contexts/context";
import React, { useContext, useEffect, useState,useRef } from "react";
import "./Student_home_page.css"

export default function Student_home_page() {

  const studentContext = useContext(StudentContext);

  const {
    getStudentDetails,
    Student,
    SetStudentDetails,
    UpdateStudentDetails,
    DeleteStudentDetails,
    AddStudentDetails,
  } = studentContext;

  const [dataToSearch, searchData] = useState(null);
  const [searchedData, searchStudentDetails] = useState(null);
  const [studentToBeAdded, addStudent] = useState({});
  const [studentToBeUpdated, updateStudent] = useState('');
  const [updatedState, updateState] = useState(-1);
  const [averagePercentage, setAveragePercentage] = useState('');

  const searchStudenRef= useRef();


function onSearch(e){
      searchData(e.target.value);
  }

function searchStudent(){
     var searchValue = searchStudenRef.current.value;
     var searchIndex;
     if(dataToSearch=='name' || dataToSearch == null){
      searchIndex=0;
      //searchValue = searchValue.split(' ');
      const newdata = Student?.map((item,index)=>{
        return item[searchIndex].toLowerCase()==searchValue.toLowerCase() ? item :null
       })
       searchStudentDetails(newdata);
     } else if(dataToSearch=='standard'){
      searchIndex=3;
      const newdata = Student?.map((item,index)=>{
        return item[searchIndex]==searchValue ? item :null
       })
       searchStudentDetails(newdata);
     } else if(dataToSearch=='grade'){
      searchIndex=5;
      const newdata = Student?.map((item,index)=>{
        return item[searchIndex]==searchValue ? item :null
       })
       searchStudentDetails(newdata);
     }
}

const onInputChange = (e) => {
  addStudent({ ...studentToBeAdded, [e.target.name]: e.target.value });
};

const onAddClick = () => {
    // Check if any field is left empty or null
    if (
      !studentToBeAdded.name ||
      !studentToBeAdded.age ||
      !studentToBeAdded.dob ||
      !studentToBeAdded.standard ||
      !studentToBeAdded.percentage
    ) {
      alert("Please fill in all fields before adding the student.");
      return;
    }

      if(studentToBeAdded.percentage >= 90)
      {
        studentToBeAdded.grade = 'A+';
      } else if(studentToBeAdded.percentage >= 80  && studentToBeAdded.percentage < 90)
      {
        studentToBeAdded.grade = 'A';
      } else if(studentToBeAdded.percentage >= 70  && studentToBeAdded.percentage < 80)
      {
        studentToBeAdded.grade = 'B';
      } else if(studentToBeAdded.percentage >= 60  && studentToBeAdded.percentage < 70)
      {
        studentToBeAdded.grade = 'C';
      } else if(studentToBeAdded.percentage >= 50  && studentToBeAdded.percentage < 60)
      {
        studentToBeAdded.grade = 'D';
      } else if(studentToBeAdded.percentage < 50)
      {
        studentToBeAdded.grade = 'F';
      }
  
    // Add student details if all fields are filled
    AddStudentDetails(studentToBeAdded);
    window.location.reload(); // Refresh the page (consider a better approach)
  
};



function onSubmit(e) {
  // Check if any field is left empty or null
  if (
    !studentToBeUpdated.name ||
    !studentToBeUpdated.age ||
    !studentToBeUpdated.dob ||
    !studentToBeUpdated.standard ||
    !studentToBeUpdated.percentage
  ) {
    alert("Please fill in all fields before updating the student.");
    return;
  }

  if(studentToBeUpdated.percentage >= 90)
      {
        studentToBeUpdated.grade = 'A+';
      } else if(studentToBeUpdated.percentage >= 80  && studentToBeUpdated.percentage < 90)
      {
        studentToBeUpdated.grade = 'A';
      } else if(studentToBeUpdated.percentage >= 70  && studentToBeUpdated.percentage < 80)
      {
        studentToBeUpdated.grade = 'B';
      } else if(studentToBeUpdated.percentage >= 60  && studentToBeUpdated.percentage < 70)
      {
        studentToBeUpdated.grade = 'C';
      } else if(studentToBeUpdated.percentage >= 50  && studentToBeUpdated.percentage < 60)
      {
        studentToBeUpdated.grade = 'D';
      } else if(studentToBeUpdated.percentage < 50)
      {
        studentToBeUpdated.grade = 'F';
      }

  //e.preventDefault();
  //updateStudent({ ...studentToBeUpdated, [e.target.name]: e.target.value });
  if(updatedState!=-1)
  UpdateStudentDetails(studentToBeUpdated, updatedState);
  updateState(-1);
  window.location.reload();
}

function onEdit(index) {
  updateStudent(Student[index]);
  updateState(index);
}

const onDelete = (index) => {
  DeleteStudentDetails(index);
  window.location.reload();
};

function EditStudent() {

  function onInputChange(e) {
    updateStudent({ ...studentToBeUpdated, [e.target.name]: e.target.value });
  }

  return ( studentToBeUpdated && <tr>
      <td>
        <input
          type="text"
          name="name"
          id="name"
          value={studentToBeUpdated.name}
          onChange={onInputChange}
        />
      </td>
      <td>
        <input
          type="number"
          name="age"
          id="age"
          value={studentToBeUpdated.age}
          onChange={onInputChange}
        />
      </td>
      <td>
        <input
          type="date"
          name="dob"
          id="dob"
          value={studentToBeUpdated.dob}
          onChange={onInputChange}
        />
      </td>
      <td>
        <input
          type="number"
          name="standard"
          id="standard"
          value={studentToBeUpdated.standard}
          onChange={onInputChange}
        />
      </td>
      <td>
        <input
          type="number"
          name="percentage"
          id="percentage"
          value={studentToBeUpdated.percentage}
          onChange={onInputChange}
        />
      </td>
      <td>
      {studentToBeUpdated.grade}
      </td>
      <td>
        <button type="submit" onClick={() => onSubmit()} >
          {" "}
          Update
        </button>
      </td>
    </tr>

  );
}

function getAveragePercentage(){
  var total = 0;
  var count = 0;
  Student.map((item, index) => {
    if(item[4] == 'undefined' || item[4]==undefined)
    {
      item[4] = 0;
      count--;
    }
   total = parseInt(total) + parseInt(item[4]);
   count++;
  })

  var average = parseInt(total) / parseInt(count);
  setAveragePercentage(average);
}

useEffect(() => {
  getStudentDetails();
}, []);


    //html
    return (
      <>
      <div><h1 style={{ display: "block", textAlign: "center"}}>STUDENT MANAGEMENT APP</h1></div>
        <div style={{ display: "flex", maxWidth: "100%", flexWrap: "wrap" }}>
          <div className="search">
            <div
              style={{ display: "flex", maxWidth: "100%", flexWrap: "wrap" }}
            >
              <h3 style={{ display: "inline" }}>Search Student</h3>
              <br></br>
              <div
                style={{ display: "flex", maxWidth: "100%", flexWrap: "wrap" }}
              >
                <select
                  onChange={onSearch}
                  name="search"
                  id="search"
                  className="searchMargin"
                >
                  <option value="name">By Name</option>
                  <option value="standard">By Class</option>
                  <option value="grade">By Grade</option>
                </select>
                <div>
                  <input
                    type="text"
                    id="searchinput"
                    ref={searchStudenRef}
                    className="searchMargin"
                  />
                  <button
                    type="button"
                    className="button searchMargin"
                    onClick={() => searchStudent()}
                  >
                    Search Student
                  </button>
                </div>
              </div>
            </div>
            <div>
              <table>
                <tr className="tablehead">
                  <td>Name</td>
                  <td>Age</td>
                  <td>DOB</td>
                  <td>Class</td>
                  <td>Percentage</td>
                  <td>Grade</td>
                </tr>
                {searchedData &&
                  searchedData.map((item, index) => {
                    return (
                      item != null && (
                        <tr>
                          <td>{item[0]}</td>
                          <td>{item[1]}</td>
                          <td>{item[2]}</td>
                          <td>{item[3]}</td>
                          <td>{item[4]}</td>
                          <td>{item[5]}</td>
                        </tr>
                      )
                    );
                  })}
              </table>
            </div>
          </div>

          <div className="addstudent">
            <div>
              <h3 style={{ marginRight : '5px'}}>Add Student  </h3>
            </div>
            <br></br>
            <div>
              <form action="" method="post" className="card" />
              <table>
                <tr>
                  <td> Name: </td>
                  <td>
                    {" "}
                    <input
                      type="text"
                      name="name"
                      id=""
                      value={studentToBeAdded.name}
                      onChange={onInputChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td> Age: </td>
                  <td>
                    {" "}
                    <input
                      type="number"
                      name="age"
                      id=""
                      value={studentToBeAdded.age}
                      onChange={onInputChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td> DOB: </td>
                  <td>
                    {" "}
                    <input
                      type="date"
                      name="dob"
                      id=""
                      value={studentToBeAdded.dob}
                      onChange={onInputChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td> Class: </td>
                  <td>
                    {" "}
                    <input
                      type="number"
                      name="standard"
                      id=""
                      value={studentToBeAdded.standard}
                      onChange={onInputChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td> Percentage(%){" "} </td>
                  <td>
                    {" "}
                    <input
                      type="number"
                      name="percentage"
                      id=""
                      value={studentToBeAdded.percentage}
                      onChange={onInputChange}
                    />
                  </td>
                </tr>
              </table>
             
              {/* Grade{" "}
              <input
                type="text"
                name="grade"
                id=""
                value={studentToBeAdded.grade}
                onChange={onInputChange}
              /> */}
              <button
                className="button"
                onClick={() => {
                  return onAddClick();
                }}
              >
                {" "}
                AddStudent{" "}
              </button>
            </div>
          </div>

          <div className="studentDetails">
            <h1> Student details </h1>
            <br />
            <form  action="">
              <table>
                <tr className="tablehead">
                  <td>Name</td>
                  <td>Age</td>
                  <td>DOB</td>
                  <td>Class</td>
                  <td>Percentage</td>
                  <td>Grade</td>
                  <td>Actions</td>
                </tr>

                {Student &&
                  Student.map((item, index) => {
                    return updatedState === index ? (
                      <EditStudent />
                    ) : (
                      <tr>
                        <td>{item[0]}</td>
                        <td>{item[1]}</td>
                        <td>{item[2]}</td>
                        <td>{item[3]}</td>
                        <td>{item[4]}</td>
                        <td>{item[5]}</td>
                        <td>
                          <button
                            className="edit"
                            onClick={() => onEdit(index)}
                          >
                            Edit
                          </button>
                          <button
                            className="delete"
                            onClick={() => {
                              return onDelete(index);
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </table>
            </form>
          </div>

          <div className="addstudent">
            <div>
              <h3 style={{ marginRight : '5px'}}>Get Average Percentage  </h3>
            </div>
            <br></br>
            <div>
              <form action="" method="post" className="card" />
              <table>
                <tr>
                  <td> Average Percentage: </td>
                  <td>
                  {averagePercentage}
                  </td>
                </tr>
                
              </table>
              <button
                className="button"
                onClick={() => {
                  return getAveragePercentage();
                }}
              >
                {" "}
               Calculate Average{" "}
              </button>
            </div>
          </div>
        </div>
        <br />
      </>
    );
}