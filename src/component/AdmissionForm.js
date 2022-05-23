import React, { useState, useEffect } from 'react'
import * as api from './../Api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Dropdown } from 'react-bootstrap'
import ReactGA from 'react-ga';
function AdmissionForm({ email, id, clientName }) {

    useEffect(() => {
        window.scrollTo(0, 0)
        getCourses()
    }, [])
    const [gender, setGender] = useState('');
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [buttonState, setButtonState] = useState("Submit Now");
    const [user, setuser] = useState({
        user_full_name: "",
        dob: "",
        user_email: "",
        user_address: "",
        user_city: "",
        user_state: "",
        mobile_number: "",
        qualification: "",
        previous_year_percentage: "",
        admission_for: "",
        father_mother_name: "",
        clientMail: email,
        clientName: clientName
    })
    let namee, valuee;
    const handleSubmit = (e) => {
        ReactGA.event({
            category:"Admission form submit",
            action:"Admission form for student",
            label:"Institute Admission form for student"
        })
        namee = e.target.name;
        valuee = e.target.value;
        setuser({ ...user, [namee]: valuee });
        console.log("My DOB :",user.dob)
    }
    const [isDeclaration, setIsDeclaration] = useState(false);


    const [eduArr, setEduArr] = useState([])
    const [selected, setSelected] = useState("Select Course")
    const getCourses = async () => {
        const res = await api.fetchCourseDetails(id);
        // console.log("All Courses", res.response);
        setEduArr(res.response);
    };

    function isValidform() {
        var flag = 1;
        for (var key in user) {
            if (user[key] === "") {
                flag = 0;
            }
        }
        if (isDeclaration === false) {
            flag = 0;
        }
        if (selectedFiles.length < 3) {
            flag = 0;
        }
        return flag;
    }
    const clearForm = () => {
        let obj = {
            user_full_name: "",
            user_dob: "",
            user_email: "",
            user_address: "",
            user_city: "",
            user_state: "",
            // user_state: "",
            mobile_number: "",
            qualification: "",
            previous_year_percentage: "",
            admission_for: "",
            father_mother_name: "",
            user_country: ""
        }
        setuser(obj)
        // console.log(selectedFiles)
        document.getElementById("file_0").value = ""
        document.getElementById("file_1").value = ""
        document.getElementById("file_2").value = ""
        setSelectedFiles([])
        setSelected("Select Course")
        setGender('')
        setIsDeclaration(false)
    }

    const changeHandler = (e) => {
        namee = e.target.name;
        valuee = e.target.files[0]
        setSelectedFiles([...selectedFiles, valuee]);
        // console.log(valuee);
    };

    const handleSubmission = (e) => {
        e.preventDefault();
        setButtonState("Submitting...");
        const formData = new FormData();
        // console.log(user);
        for (var selectedFile of selectedFiles) {
            formData.append('files', selectedFile);
        }
        formData.append('gender', gender);
        for (var key in user) {
            formData.append(key, user[key]);
        }
        if (isValidform() === 1) {
            api.sendAdmissionData(formData)
                .then((data) => {
                    if (data.message === "Successfully Sent!") {
                        toast.success("Your Form Submitted Successfully", {
                            position: "bottom-right"
                        });
                        clearForm()
                        setButtonState("Submit Now");
                    } else {
                        console.log(data.message);
                        toast.error("Form Submission Failed", {
                            position: "bottom-right"
                        });
                        setButtonState("Submit Now");
                    }
                })
                .catch((err) => {
                    toast.error("Form Submission Failed", {
                        position: "bottom-right"
                    });
                    setButtonState("Submit Now");
                    console.log(err);
                });
        } else {
            toast.error("Fill all the * marked fields and accept Declaration", {
                position: "bottom-right"
            });
            setButtonState("Submit Now");
        }

    };

    
    return (
        <div className="container mt-5 mb-5" >
            <div style={{ marginTop: '100px', fontFamily: 'Georgia, Times New Roman, Times, serif' }} className="text-center">
                <h2>Admission Form</h2>
                <h4 style={{ color: 'grey', fontWeight: '450' }}>Fill This Admission Form</h4>
            </div>

            <div className="container formm boox p-5" style={{ backgroundColor: 'white', borderRadius: '15px' }}>
                <form encType="multipart/form-data" noValidate className="ng-untouched ng-pristine ng-invalid">
                    <div className="row">
                        <div className="col-sm-12 col-xs-12">
                            <div className="form-group">
                                <label className="control-label">Full Name*</label>
                                <input className="form-control form-item ng-untouched ng-pristine ng-invalid" formcontrolname="user_full_name" name="user_full_name" onChange={handleSubmit} value={user.user_full_name} required type="text" /></div>
                        </div>
                        <div className="col-sm-12 col-xs-12">
                            <br />
                            <label className="mr-2">Gender*</label>
                            &nbsp;
                            <input label="Male" type="radio" checked={gender === 'Male'} value="Male" name="gender" onClick={() => setGender('Male')} />

                            <label className="mr-2">MALE</label>
                            &nbsp;
                            <input label="Female" type="radio" checked={gender === 'Female'} value="Female " name="gender" onClick={() => setGender('Female')} />

                            <label className="mr-2">FEMALE</label>
                            &nbsp;
                            <input label="Prefernottosay" type="radio" checked={gender === 'Prefernottosay'} name="gender" value="Prefernottosay" onClick={() => setGender('Prefernottosay')} />

                            <label className="mr-2">PREFER NOT TO SAY</label>
                        </div>
                        <div className="col-sm-6 col-xs-12">
                            <div>
                                <br />
                                <label>Upload Photo*</label><span style={{ fontSize: '10px' }}>(size should not be more that 100KB )</span>
                                <input className="mt-3 btn btn-danger btn-sm uploadButton" id="file_0" type="file" name="file0" onChange={changeHandler} />
                            </div>

                        </div>
                        <div className="col-sm-6 col-xs-12">
                            <div className="form-group"><br /><label className="control-label">Father /
                                Mother's Name*</label><input className="form-control form-item ng-untouched ng-pristine ng-invalid" formcontrolname="fname" name="father_mother_name" required type="text" value={user.father_mother_name} onChange={handleSubmit} /></div>
                        </div>
                        <div className="clearfix" />
                        <div className="col-sm-6 col-xs-12">
                            <div className="form-group"><br /><label className="control-label">Date of birth*</label>
                                <div className="dateDropdown"><input className="form-control form-item ng-untouched ng-pristine ng-invalid" formcontrolname="date" name="dob" value={user.user_dob} type="date" onChange={handleSubmit} /></div>
                            </div>
                        </div>
                        <div className="col-sm-6 col-xs-12">
                            <div className="form-group"><br /><label className="control-label">Email <i className="fa fa-star starred" /></label>
                                <input className="form-control form-item ng-untouched ng-pristine ng-invalid" formcontrolname="user_email" name="user_email" required type="email" value={user.user_email} onChange={handleSubmit} /></div>
                        </div>
                        <div className="col-sm-6 col-xs-12">
                            <div className="form-group"><br /><label className="control-label">Address
                                <i className="fa fa-star starred" /></label><input className="form-control form-item ng-untouched ng-pristine ng-invalid" formcontrolname="user_address" onChange={handleSubmit} name="user_address" required type="text" value={user.user_address} /></div>
                        </div>
                        <div className="col-sm-6 col-xs-12">
                            <div className="form-group"><br /><label className="control-label">City <i className="fa fa-star starred" /></label>
                                <input className="form-control form-item ng-untouched ng-pristine ng-invalid" formcontrolname="user_city" name="user_city" onChange={handleSubmit} value={user.user_city} required type="text" /></div>
                        </div>
                        <div className="col-sm-6 col-xs-12">
                            <div className="form-group"><br />
                                <label className="control-label">State <i className="fa fa-star starred" /></label>
                                <input className="form-control form-item " formcontrolname="user_state" name="user_state" onChange={handleSubmit} value={user.user_state} required type="text" /></div>
                        </div>
                        <div className="col-sm-6 col-xs-12">
                            <div className="form-group"><br />
                                <label className="control-label">Country <i className="fa fa-star starred" /></label>
                                <input className="form-control form-item " formcontrolname="user_country" name="user_country" onChange={handleSubmit} value={user.user_country} required type="text" /></div>
                        </div>


                        <div className="col-sm-6 col-xs-12">
                            <div className="form-group"><br /><label className="control-label">Phone
                                Number
                                <i className="fa fa-star starred" /></label><input className="form-control form-item ng-untouched ng-pristine ng-invalid" formcontrolname="mobile_number" onChange={handleSubmit} name="mobile_number" required type="text" value={user.mobile_number} /></div>
                        </div>
                        <div className="col-sm-6 col-xs-12">
                            <div className="form-group"><br /><label className="control-label">Qualification
                                <i className="fa fa-star starred" /></label><input className="form-control form-item ng-untouched ng-pristine ng-invalid" formcontrolname="qualification" onChange={handleSubmit} name="qualification" required type="text" value={user.qualification} /></div>
                        </div>
                        <div className="col-sm-6 col-xs-12">
                            <div className="form-group"><br /><label className="control-label">Previous
                                Year
                                Percentage (e.g. 85%, 78.83%) <i className="fa fa-star starred" /></label><input className="form-control form-item ng-untouched ng-pristine ng-invalid" formcontrolname="previous_year_percentage" name="previous_year_percentage" onChange={handleSubmit} required type="text" value={user.previous_year_percentage} /></div>
                        </div>
                        <div className="col-sm-6 col-xs-12">
                            <div className="form-group">
                                <br />
                                <label className="control-label">Admission For
                                    <i className="fa fa-star starred " /></label>
                                <Dropdown>
                                    <Dropdown.Toggle className="costumButton" variant="success" id="dropdown-basic">
                                        {selected}
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        {eduArr.map((el, i) => {
                                            return (
                                                <Dropdown.Item onClick={() => {
                                                    setSelected(el.course_name)
                                                    setuser({ ...user, admission_for: el.course_name })
                                                }}>{el.course_name}</Dropdown.Item>
                                            )
                                        })}
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </div>
                        <div className="col-sm-12 col-xs-12">
                            <div className="row">
                                <div className="controls">
                                    <div className>
                                        <div>
                                            <br />
                                            <label> Upload Documents (if any)</label><span style={{ fontSize: '12px' }}>(size not be more that 1mb )</span>
                                            <br />
                                            <input className="mt-3 mr-3 btn btn-danger btn-sm uploadButton" id="file_1"  type="file" name="file1" onChange={changeHandler} />

                                            <input className="mt-3 btn btn-danger btn-sm uploadButton" id="file_2"  type="file" name="file2" onChange={changeHandler} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br />
                        <div className="col-sm-12 col-xs-12">
                            <div className="bg">
                                <div   >
                                    <br />
                                    <h4>Declaration <i className="fa fa-star starred" />
                                    </h4>
                                    <div className="chiller_cb">
                                        <input id="myCheckbox" type="checkbox" className="mr-2" onClick={() => setIsDeclaration(!isDeclaration)} />
                                        <label htmlFor="myCheckbox">&nbsp;I confirm that the information given above is true to the best of my knowledge and belief</label><br />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="text-center col-lg-12">
                            <br />
                            <div className="text-center costumButton" style={{ border: '1px solid grey', borderRadius: '10px', height: '30px',width:"43%"}}>
                                <a type="submit" style={{ fontWeight: '500', fontSize: '20px', color: 'white' }} onClick={handleSubmission}>{buttonState}<i className="fa fa-arrow-circle-up" /></a>
                            </div>
                        </div>

                    </div>
                </form>
                <ToastContainer />
            </div>


        </div>
    )
}

export default AdmissionForm;













// import React, { useState } from 'react'
// import { useEffect } from 'react';
// function AdmissionForm({ id }) {
//     const [gender, setGender] = useState('');
//     const [user, setuser] = useState({
//         name: "", email: "", father_mother_name: "", dateofbirth: "", address: "", selectedFile: null, city: "", state: "", phone: "", qualification: "", admission_for: "", previous_year_percentage: ""
//     })
//     useEffect(() => {
//         window.scrollTo(0, 0)
//     }, [])
//     //console.log(gender);
//     let namee, valuee;
//     const handleSubmit = (e) => {

//         namee = e.target.name;
//         valuee = e.target.value;
//         setuser({ ...user, [namee]: valuee });
//     }


//     const [selectedFile1, setSelectedFile1] = useState("");
//     const [selectedFile2, setSelectedFile2] = useState("");
//     const [selectedFile3, setSelectedFile3] = useState("");
//     const [isFilePicked, setIsFilePicked] = useState(false);

//     const changeHandler1 = (event) => {

//         setSelectedFile1(event.target.files[0]);
//         setIsFilePicked(true);
//     };
//     const changeHandler2 = (event) => {
//         setSelectedFile2(event.target.files[0]);
//         setIsFilePicked(true);
//     };
//     const changeHandler3 = (event) => {
//         setSelectedFile3(event.target.files[0]);
//         setIsFilePicked(true);
//     };

//     const handleSubmission = (e) => {
//         e.preventDefault();
//         const formData = new FormData();

//         formData.append("source1", selectedFile1);
//         formData.append("source2", selectedFile2);
//         formData.append("source3", selectedFile3);

//         console.log(formData);
//         const { name, email, father_mother_name, dateofbirth, address, selectedFile, city, state, phone, qualification, admission_for, previous_year_percentage } = user;
//         //         "POST param: user_full_name, gender, dob, user_email, user_address, user_city, user_state, user_country, mobile_number, qualification, previous_year_percentage, admission_for, clientMail, clientName 
//         // File param: file_one, file_two, file_three"
//         console.log(name, email, father_mother_name, dateofbirth, address, selectedFile, city, state, phone, qualification, admission_for, previous_year_percentage)

//         fetch(
//             "http://35.244.8.93:3000/AdmissionForm",
//             {
//                 method: "POST",
//                 headers: { "Content-Type": "multipart/form-data" },
//                 body: formData, name, gender, email, father_mother_name, dateofbirth, address, selectedFile, city, state, phone, qualification, admission_for, previous_year_percentage
//             }
//         )
//             .then((response) => response.json())
//             .then((result) => {
//                 console.log("Success:", result);
//             })
//             .catch((error) => {
//                 console.error("Error:", error);
//             });
//     };

//     console.log(user);

//     return (
//         <div className="form">
//             <h1>Admission Form</h1>
//             <div className="container formm">
//                 <form _ngcontent-nra-c4 encType="multipart/form-data" noValidate className="ng-untouched ng-pristine ng-invalid">
//                     <div _ngcontent-nra-c4 className="row">
//                         <div _ngcontent-nra-c4 className="col-sm-12 col-xs-12">
//                             <div _ngcontent-nra-c4 className="form-group"><label _ngcontent-nra-c4 className="control-label">Full Name
//                                 (IN CAPITAL)
//                                 <i _ngcontent-nra-c4 className="fa fa-star starred" /></label><input _ngcontent-nra-c4 className="form-control form-item ng-untouched ng-pristine ng-invalid" formcontrolname="user_full_name" name="name" onChange={handleSubmit} value={user.name} required type="text" /></div>
//                         </div>
//                         <div _ngcontent-nra-c4 className="col-sm-12 col-xs-12">
//                             <br />
//                             <label>Gender</label>
//                             &nbsp;&nbsp;
//                             <input label="Male" type="radio" checked={gender === 'Male'} value="Male" name="gender" onClick={() => setGender('Male')} />
//                             &nbsp;
//                             <label>MALE</label>
//                             &nbsp;&nbsp;
//                             <input label="Female" type="radio" checked={gender === 'Female'} value="Female " name="gender" onClick={() => setGender('Female')} />
//                             &nbsp;
//                             <label>FEMALE</label>
//                             &nbsp;&nbsp;
//                             <input label="Prefernottosay" type="radio" checked={gender === 'Prefernottosay'} name="gender" value="Prefernottosay" onClick={() => setGender('Prefernottosay')} />
//                             &nbsp;
//                             <label>PREFER NOT TO SAY</label>
//                         </div>
//                         <div _ngcontent-nra-c4 className="col-sm-6 col-xs-12">
//                             <div>
//                                 <br />
//                                 <label>Upload Photo </label><span _ngcontent-nra-c4 style={{ fontSize: '12px' }}>(size
//                                     should not be more that 100KB )</span>
//                                 <input type="file" name="file_one" onChange={changeHandler1} />
//                                 {isFilePicked ? (
//                                     <div>
//                                         <p>Filename: {selectedFile1.name}</p>
//                                         <p>Filetype: {selectedFile1.type}</p>
//                                         <p>Size in bytes: {selectedFile1.size}</p>

//                                         <button onClick={handleSubmission}>Add a photo</button>
//                                     </div>
//                                 ) : null}
//                             </div>

//                         </div>
//                         <div _ngcontent-nra-c4 className="col-sm-6 col-xs-12">
//                             <div _ngcontent-nra-c4 className="form-group"><br /><label _ngcontent-nra-c4 className="control-label">Father /
//                                 Mother's Name <i _ngcontent-nra-c4 className="fa fa-star starred" /></label><input _ngcontent-nra-c4 className="form-control form-item ng-untouched ng-pristine ng-invalid" formcontrolname="fname" name="father_mother_name" required type="text" value={user.father_mother_name} onChange={handleSubmit} /></div>
//                         </div>
//                         <div _ngcontent-nra-c4 className="clearfix" />
//                         <div _ngcontent-nra-c4 className="col-sm-6 col-xs-12">
//                             <div _ngcontent-nra-c4 className="form-group"><br /><label _ngcontent-nra-c4 className="control-label">Please
//                                 enter
//                                 the date of birth</label>
//                                 <div _ngcontent-nra-c4 className="dateDropdown"><input _ngcontent-nra-c4 className="form-control form-item ng-untouched ng-pristine ng-invalid" formcontrolname="date" name="dateofbirth" value={user.dateofbirth} type="date" onChange={handleSubmit} /></div>
//                             </div>
//                         </div>
//                         <div _ngcontent-nra-c4 className="col-sm-6 col-xs-12">
//                             <div _ngcontent-nra-c4 className="form-group"><br /><label _ngcontent-nra-c4 className="control-label">Email <i _ngcontent-nra-c4 className="fa fa-star starred" /></label><input _ngcontent-nra-c4 className="form-control form-item ng-untouched ng-pristine ng-invalid" formcontrolname="user_email" name="email" required type="email" value={user.email} onChange={handleSubmit} /></div>
//                         </div>
//                         <div _ngcontent-nra-c4 className="col-sm-6 col-xs-12">
//                             <div _ngcontent-nra-c4 className="form-group"><br /><label _ngcontent-nra-c4 className="control-label">Address
//                                 <i _ngcontent-nra-c4 className="fa fa-star starred" /></label><input _ngcontent-nra-c4 className="form-control form-item ng-untouched ng-pristine ng-invalid" formcontrolname="user_address" onChange={handleSubmit} name="address" required type="text" /></div>
//                         </div>
//                         <div _ngcontent-nra-c4 className="col-sm-6 col-xs-12">
//                             <div _ngcontent-nra-c4 className="form-group"><br /><label _ngcontent-nra-c4 className="control-label">City <i _ngcontent-nra-c4 className="fa fa-star starred" /></label><input _ngcontent-nra-c4 className="form-control form-item ng-untouched ng-pristine ng-invalid" formcontrolname="user_city" name="city" onChange={handleSubmit} value={user.city} required type="text" /></div>
//                         </div>
//                         <div _ngcontent-nra-c4 className="col-sm-6 col-xs-12">
//                             <div _ngcontent-nra-c4 className="form-group"><br /><label _ngcontent-nra-c4 className="control-label">State <i _ngcontent-nra-c4 className="fa fa-star starred" /></label><input _ngcontent-nra-c4 className="form-control form-item ng-untouched ng-pristine ng-invalid" formcontrolname="user_state" name="state" onChange={handleSubmit} value={user.state} required type="text" /></div>
//                         </div>
//                         <div _ngcontent-nra-c4 className="col-sm-6 col-xs-12">
//                             <div _ngcontent-nra-c4 className="form-group"><br /><label _ngcontent-nra-c4 htmlFor="inputState">Country</label><select _ngcontent-nra-c4 className="form-control form-item ng-untouched ng-pristine ng-valid" formcontrolname="user_country" name="country" onChange={handleSubmit} id="inputqualification">
//                                 <option _ngcontent-nra-c4 selected>india</option>
//                             </select></div>
//                         </div>
//                         <div _ngcontent-nra-c4 className="col-sm-6 col-xs-12">
//                             <div _ngcontent-nra-c4 className="form-group"><br /><label _ngcontent-nra-c4 className="control-label">Phone
//                                 Number
//                                 <i _ngcontent-nra-c4 className="fa fa-star starred" /></label><input _ngcontent-nra-c4 className="form-control form-item ng-untouched ng-pristine ng-invalid" formcontrolname="mobile_number" onChange={handleSubmit} value={user.phone} name="phone" required type="text" /></div>
//                         </div>
//                         <div _ngcontent-nra-c4 className="col-sm-6 col-xs-12">
//                             <div _ngcontent-nra-c4 className="form-group"><br /><label _ngcontent-nra-c4 className="control-label">Qualification
//                                 <i _ngcontent-nra-c4 className="fa fa-star starred" /></label><input _ngcontent-nra-c4 className="form-control form-item ng-untouched ng-pristine ng-invalid" formcontrolname="qualification" onChange={handleSubmit} name="qualification" value={user.qualification} required type="text" /></div>
//                         </div>
//                         <div _ngcontent-nra-c4 className="col-sm-6 col-xs-12">
//                             <div _ngcontent-nra-c4 className="form-group"><br /><label _ngcontent-nra-c4 className="control-label">Previous
//                                 Year
//                                 Percentage (e.g. 85%, 78.83%) <i _ngcontent-nra-c4 className="fa fa-star starred" /></label><input _ngcontent-nra-c4 className="form-control form-item ng-untouched ng-pristine ng-invalid" formcontrolname="previous_year_percentage" name="previous_year_percentage" onChange={handleSubmit} value={user.previous_year_percentage} required type="text" /></div>
//                         </div>
//                         <div _ngcontent-nra-c4 className="col-sm-6 col-xs-12">
//                             <div _ngcontent-nra-c4 className="form-group"><br /><label _ngcontent-nra-c4 className="control-label">Admission
//                                 For
//                                 (e.g. IIT-JEE Coaching) <i _ngcontent-nra-c4 className="fa fa-star starred" /></label><input _ngcontent-nra-c4 className="form-control form-item ng-untouched ng-pristine ng-invalid" formcontrolname="admission_for" name="admission_for" value={user.admission_for} onChange={handleSubmit} required type="text" /></div>
//                         </div>
//                         <div _ngcontent-nra-c4 className="col-sm-12 col-xs-12">
//                             <div _ngcontent-nra-c4 className="row">
//                                 <div _ngcontent-nra-c4 className="controls">
//                                     <div _ngcontent-nra-c4 className>
//                                         <div>
//                                             <br />
//                                             <label> Upload Documents (if any)</label><span _ngcontent-nra-c4 style={{ fontSize: '12px' }}>(size
//                                                 should
//                                                 not be more that 1mb )</span>
//                                             <br />
//                                             <input type="file" name="file_two" onChange={changeHandler2} />
//                                             {isFilePicked ? (
//                                                 <div>
//                                                     <p>Filename: {selectedFile2.name}</p>
//                                                     <p>Filetype: {selectedFile2.type}</p>
//                                                     <p>Size in bytes: {selectedFile2.size}</p>

//                                                     <button onClick={handleSubmission}>Add</button>
//                                                 </div>
//                                             ) : null
//                                             }

//                                             <input type="file" name="file_three" onChange={changeHandler3} />
//                                             {isFilePicked ? (
//                                                 <div>
//                                                     <p>Filename: {selectedFile3.name}</p>
//                                                     <p>Filetype: {selectedFile3.type}</p>
//                                                     <p>Size in bytes: {selectedFile3.size}</p>

//                                                     <button onClick={handleSubmission}>Add</button>
//                                                 </div>
//                                             ) : null
//                                             }
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                         <br />
//                         <div _ngcontent-nra-c4 className="col-sm-12 col-xs-12">
//                             <div _ngcontent-nra-c4 className="bg">
//                                 <div _ngcontent-nra-c4>
//                                     <br />
//                                     <h4 _ngcontent-nra-c4>Declaration <i _ngcontent-nra-c4 className="fa fa-star starred" />
//                                     </h4>
//                                     <div _ngcontent-nra-c4 className="chiller_cb"><input _ngcontent-nra-c4 defaultChecked id="myCheckbox" type="checkbox" /><label _ngcontent-nra-c4 htmlFor="myCheckbox">I confirm
//                                         that the information
//                                         given above is true to the best of my knowledge and belief</label><br /><span _ngcontent-nra-c4 /></div>
//                                 </div>
//                             </div>
//                         </div>

//                         <div _ngcontent-nra-c4 className="col-xs-12"><br /><button _ngcontent-nra-c4 className=" btn btn-primary btn11" type="submit" onClick="handleSubmission">Submit</button></div>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     )
// }

// export default AdmissionForm;
