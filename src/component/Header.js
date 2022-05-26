import React from 'react'
import ReactGA from 'react-ga';
import Link from './Link';
import * as api from '../Api';
import { useState, useEffect, useRef } from 'react';
import JoditEditor from "jodit-react";
import ReactHtmlParser from 'react-html-parser';
import { AiFillCloseSquare } from "react-icons/ai";
import { Button, Modal, ModalBody, Form } from 'reactstrap';
function Header({ id, config }) {
    const [instDetail, setInstDetail] = useState({});
    const [webDetail, setWebDetail] = useState({});
    const [status1, setStatus1] = useState(false);
    // const [setDefImages] = useState("");
    const [dynamicButtonItems, setDynamicButtonItems] = useState([]);
    const [dynamicButtonName, setDynamicButtonName] = useState([]);
    const [dyStatus, setdyStatus] = useState(false);
    const [webDetails, setWebDetails] = useState(false);
    const [customTab, setCustomTab] = useState("");
    const [customLink, setCustomLink] = useState("");
    const [speedLabsBtn, setSpeedLabsBtn] = useState("")
    const [toggle, setToggle] = useState(0);

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalIsOpenEdit, setModalIsOpenEdit] = useState(false);
    const editor = useRef(null)
    const [content, setContent] = useState('')
    const [editedText, setEditedText] = useState('yes')
    const configEditor = {
        readonly: false // all options from https://xdsoft.net/jodit/doc/
    }
    var Buffer = require('buffer/').Buffer;
    const setSpeedlabss = () => {
        ReactGA.event({
            category: "More button",
            action: "All Form",
            label: "speedlabs"
        })
    }
    const setFaculty = () => {
        ReactGA.event({
            category: "FFFF form button",
            action: "Career form for student",
            label: "Career form for student"
        })
    }
    const setHome = () => {
        ReactGA.event({
            category: "Home Menu",
            action: "Home Menu clicked",
            label: "Home"
        })
    }
    const About = () => {
        ReactGA.event({
            category: "About menu",
            action: "About Menu click",
            label: "About"
        })
    }
    const Course = () => {
        ReactGA.event({
            category: "Course menu",
            action: "Courses menu click",
            label: "Our courses"
        })
    }
    const Offering = () => {
        ReactGA.event({
            category: "Offering menu",
            action: "Offering menu click",
            label: "Our Offer"
        })
    }
    const Gallery = () => {
        ReactGA.event({
            category: "Gallery menu",
            action: "Gallery menu click",
            label: "Our Gallery"
        })
    }

    useEffect(() => {

        api.fetchInstituteDetails(id)
            .then((data) => {
                console.log('Data ID',id)
                console.log('Data ID',data)
                if (data.status === "Success") {
                    setInstDetail(data.response);
                    setStatus1(true);
                    
                    // setDefImages(data.default_img);
                    if (data.response["Custom Tab Name"] !== undefined) {
                        setCustomTab(data.response["Custom Tab Name"])
                        // console.log("dfs", data.response["Custom Tab Name"])
                        setCustomLink(data.response["Custom Link"])
                    } else if (data.response["speedlabs_link"] !== undefined) {
                        setSpeedLabsBtn(data.response["speedlabs_link"])
                    }
                    console.log("prateek", data.response)
                }
                if (!status1) setToggle(toggle + 1);
            })
            .catch((err) => {
                console.log(err);
            });
        api.fetchWebData(id)
            .then((data) => {
                setWebDetail(data.detail);
                // console.log("My data:",data.institute_name)
            })
            .catch((err) => {
                console.log(err);
            });
        api.fetchDynamicButton(id)
            .then((data) => {
                if (data.status === "success") {
                    setDynamicButtonItems(data.response);
                    setDynamicButtonName(data.tab_name);
                    setdyStatus(true);

                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, [toggle, status1]);
    var url = "https://d2hp90zy5ktxok.cloudfront.net/website_logo/" + instDetail["Header Logo"];
    return (
        <div className="">
            <nav className="py-0 navbar navbar-expand-lg navbar-dark default-color">
                <div className="container">
                    <Link className="navbar-brand" href="/">
                        <div className="my-0">
                            <img className="navlogo" style={{ width: "auto", height: "90px" }} draggable="false" src={url} alt="" />
                        </div>
                    </Link>
                    {config.site_map === 'Y' ? (
                        <div className="brand-name-container" >
                            <span className="nav-logo">{webDetail.institute_name}</span>
                            
                            <br />
                            
                            {/* <p >{ReactHtmlParser(content)}</p>
                            <br />
                            <div >

                            <h6>Do you want to edit your Institute Name Text?</h6><Button onClick={() => setModalIsOpen(true)} className="btn btn-danger" style={{ color: 'white' }}>Edit Text</Button>

                                <Modal isOpen={modalIsOpen} className='main_modal_body' style={{backgroundColor: 'white'}}>
                                    <ModalBody className='modal_body'>
                                        <AiFillCloseSquare  className='main_AiOutlineClose' onClick={() => setModalIsOpen(false)} />
                                       
                                    </ModalBody>
                                    <Form className='form_main'>

                                        <JoditEditor
                                            ref={editor}
                                            value={content}
                                            config={configEditor}
                                            tabIndex={1} // tabIndex of textarea
                                            onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                                            onChange={newContent => {
                                                console.log(newContent)
                                            }}
                                        />


                                    </Form>
                                </Modal>
                            </div> */}
                            {/* {editedText==='yes'?(<><h6>{content}</h6></>):(<>h6</>)} */}
                            {/* <br /> */}
                            {/* {editText==='yes'?(<>
                                    <JoditEditor
                                        ref={editor}
                                        value={content}
                                        config={config}
                                        tabIndex={1} // tabIndex of textarea
                                        onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                                        onChange={newContent => {
                                            console.log(newContent)
                                        }}
                                    />
                                    <p>{ReactHtmlParser(content)}</p>
                                </>):(<>
                                Null</>)} */}
                            

                            
                        </div>) : null}
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent-333" aria-controls="navbarSupportedContent-333" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="text-left collapse navbar-collapse" id="navbarSupportedContent-333">
                        <ul style={{ textTransform: "capitalize" }} className="navbar-nav mr-auto">
                            {config.menu && config.menu[0] === 'Y' ? (<li className="nav-item" ><Link className="nav-link" href='/'>Home</Link></li>) : (null)}
                            {config.menu && config.menu[1] === 'Y' ? (<li className="nav-item" ><Link className="nav-link" href='/about' onClick={About(false)}>About</Link></li>) : (null)}
                            {config.menu && config.menu[2] === 'Y' ? (<li className="nav-item" ><Link className="nav-link" href="/course" onClick={Course(false)}>Course</Link></li>) : (null)}
                            {config.menu && config.menu[3] === 'Y' ? (<li className="nav-item" ><Link className="nav-link" href="/offering" onClick={Offering(false)}>Offerings</Link></li>) : (null)}
                            {config.menu && config.menu[4] === 'Y' ? (<li className="nav-item" ><Link className="nav-link" href="/gallery" onClick={Gallery(false)}>Gallery</Link></li>) : (null)}
                            {config.menu && config.menu[7] === 'Y' ? (<li className="nav-item" ><a className="nav-link" href={`${webDetail.sub_domain !== "" ? "http://" + webDetail.sub_domain : ""}`}>Online Test</a></li>) : (null)}
                            {config.menu && config.menu[10] === 'Y' ? (<li className="nav-item" ><Link className="nav-link" href="/payment">Pay Online</Link></li>) : (null)}
                            {customTab !== "" ? <li className="nav-item">
                                <a href={customLink} target="_blank" className="speedLabs-btn nav-link">{customTab}</a>
                            </li> : null}
                            {speedLabsBtn !== "" && customTab === "" ? <li className="nav-item">
                                <a href={speedLabsBtn} target="_blank" className="speedLabs-btn nav-link">SpeedLabs</a>
                            </li> : null}

                            {dyStatus ? (<li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" id="dynamic" data-toggle="dropdown">{dynamicButtonName}</a>
                                <div className="dropdown-menu dropdown-default" aria-labelledby="dynamic">
                                    {dynamicButtonItems.map((item, index) => {
                                        return (<>
                                            <a className="dropdown-item" href={item.url} target="_blank">{item.title}</a>
                                        </>)
                                    })}
                                </div>
                            </li>) : null}
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" id="navbarDropdownMenuLink-333" data-toggle="dropdown" onClick={() => setSpeedlabss(false)}>More</a>
                                <div className="dropdown-menu dropdown-default" aria-labelledby="navbarDropdownMenuLink-333">
                                    {config.menu && config.menu[6] === 'Y' ? (<Link className="dropdown-item" href="/career">Career Form</Link>) : (null)}
                                    {config.menu && config.menu[8] === 'true' ? (<Link className="dropdown-item" href="/franchise">Franchise Form</Link>) : (null)}
                                    <Link className="dropdown-item" href="/admission">Admission Form</Link>
                                    {config.cms_faculty_details === 'true' ? (<Link className="dropdown-item" href="/faculty" onClick={() => setFaculty(false)}>Faculty</Link>) : (null)}
                                    {config.menu && config.menu[11] === 'Y' ? (<Link className="dropdown-item" href="/contact">Contact Us</Link>) : (null)}
                                    {config.cms_alerts === 'true' ? (<Link className="dropdown-item" href="/alerts">Alerts</Link>) : (null)}
                                    <Link className="dropdown-item" href="/faq">FAQ</Link>
                                    <Link className="dropdown-item" href="/Acheivements">Acheivement</Link>
                                    {config.cms_basic_question === 'true' ? (<Link className="dropdown-item" href="/test">Quick Test </Link>) : (null)}
                                    {config.menu && config.menu[5] === 'Y' ? (<Link className="dropdown-item" href="/notificationpage">Notification</Link>) : (null)}
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Header
