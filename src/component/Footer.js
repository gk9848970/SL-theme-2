import React from 'react'
import Link from "./Link";
import * as api from '../Api';
import { useState, useEffect } from 'react';
import ReactGA from 'react-ga';
function Footer({ id, config }) {

    const [instDetail, setInstDetail] = useState({});
    const [status1, setStatus1] = useState(false);
    const [defImage, setDefImages] = useState("");
    const [webDetail, setWebDetail] = useState({});
    const setwhatsApp = () =>{
        ReactGA.event({
            category:"WhatsApp Visit",
            action:"User clicked whatsapp for some details",
            label:"User clicked whatsapp for details"
        })
    };
    const footerLink = () =>{
        ReactGA.event({
            category:"Useful link Button",
            action:"Some clicked from user",
            label:"User gets page"
        })
    };
    const setIcon = () =>{
        ReactGA.event({
            category:"social media visit",
            action:"User visit social media for some details",
            label:"User visit social media for some details"
        })
    };
 
    useEffect(() => {
        api.fetchInstituteDetails(id)
            .then((data) => {
                if (data.status === "Success") {
                    setInstDetail(data.response);
                    setStatus1(true);
                    setDefImages(data.default_img);
                    console.log("data", data.response)
                }
            })
            .catch((err) => {
                console.log(err);
            });

            api.fetchWebData(id)
            .then((data) => {
                setWebDetail(data.detail);
            })
            .catch((err) => {
                console.log(err);
            });

    }, []);
    var footerUrl = "https://d2hp90zy5ktxok.cloudfront.net/website_logo/" + instDetail["Footer Logo"];

    return (
        <div>
            <a href={"https://wa.me/91"+ instDetail["Contact1"]} className="whatsapp_float" target="_blank" onClick={setwhatsApp(false)}> <i className="fa fa-whatsapp whatsapp-icon" /></a>
            <div style={{ color: "white" }} className="  msy-footer">
                <div className="container msy-footer-cont ">
                    <div className="row msy-footer1">
                        <div className="col-lg-6 text-center mb-5">
                            <div className="row">
                                <div className="col-lg-12">
                                    <img style={{ width: "200px", height: "auto" }} draggable="false" src={footerUrl} alt="" />
                                </div>
                                <div className="col-lg-12">
                                    <p className="mt-3" dangerouslySetInnerHTML={{ __html: instDetail["Footer Text"] }} />
                                </div>

                            </div>

                        </div>
                        <div className="col-lg-6 row msy-footer-item text-left">
                            <div className="col-lg-12 text-center mb-3">
                                <h1>Useful Links</h1>
                            </div>
                            <div style={{ paddingLeft: "70px" }} className=" col-md-6">
                                {config.menu && config.menu[0] === 'Y' ? (
                                    <div className="col-lg-12 footer-link">
                                        <i className="fas fa-angle-right footerIcon"></i>
                                        <Link className="footerItem" href="/" onClick={footerLink(false)}>Home</Link>
                                    </div>
                                ) : (null)}

                                {config.menu && config.menu[1] === 'Y' ? (
                                    <div className="col-lg-12 footer-link">
                                        <i className="fas fa-angle-right footerIcon"></i>
                                        <Link className="footerItem" href="/about" onClick={footerLink(false)}>About</Link>
                                    </div>

                                ) : (null)}


                                {config.menu && config.menu[2] === 'Y' ? (
                                    <div className="col-lg-12 footer-link">
                                        <i className="fas fa-angle-right footerIcon"></i>
                                        <Link className="footerItem" href="/course" onClick={footerLink(false)}>Course</Link>
                                    </div>

                                ) : (null)}


                                {config.menu && config.menu[3] === 'Y' ? (
                                    <div className="col-lg-12 footer-link">
                                        <i className="fas fa-angle-right footerIcon"></i>
                                        <Link className="footerItem" href="/offering">Our Offering</Link>
                                    </div>
                                ) : (null)}

                                {config.menu && config.menu[4] === 'Y' ? (
                                    <div className="col-lg-12 footer-link">
                                        <i className="fas fa-angle-right footerIcon"></i>
                                        <Link className="footerItem" href="/gallery">Photo Gallery</Link>
                                    </div>
                                ) : (null)}

                                {config.menu && config.menu[5] === 'Y' ? (
                                    <div className="col-lg-12 footer-link">
                                        <i className="fas fa-angle-right footerIcon"></i>
                                        <Link className="footerItem" href="/notificationpage" onClick={footerLink(false)}>Notification</Link>
                                    </div>
                                ) : (null)}
                                <div className="col-lg-12 footer-link">
                                    <i className="fas fa-angle-right footerIcon"></i>
                                    <Link className="footerItem" href="/refund" onClick={footerLink(false)}>Refund Policy</Link>
                                </div>
                                <div className="col-lg-12 footer-link">
                                    <i className="fas fa-angle-right footerIcon"></i>
                                    <Link className="footerItem" href="/terms" onClick={footerLink(false)}>Terms & Condition</Link>
                                </div>


                            </div>
                            <div style={{ paddingLeft: "70px" }} className="col-md-6">

                                {config.menu && config.menu[6] === 'Y' ? (
                                    <div className="col-lg-12 footer-link">
                                        <i className="fas fa-angle-right footerIcon"></i>
                                        <Link className="footerItem" href="/career" onClick={footerLink(false)}>Careers</Link>

                                    </div>
                                ) : (null)}

                                {config.menu && config.menu[7] === 'Y' ? (
                                    <div className="col-lg-12 footer-link">
                                        <i className="fas fa-angle-right footerIcon"></i>
                                        <Link className="footerItem" href={`${webDetail.sub_domain !== "" ? "http://" + webDetail.sub_domain : ""}`} onClick={footerLink(false)}>Online Test</Link>
                                    </div>
                                ) : (null)}

                                {config.menu && config.menu[9] === 'Y' ? (
                                    <div className="col-lg-12 footer-link">
                                        <i className="fas fa-angle-right footerIcon"></i>
                                        <Link className="footerItem" href="/blogs" onClick={footerLink(false)}>Blog</Link>
                                    </div>
                                ) : (null)}

                                {config.menu && config.menu[11] === 'Y' ? (
                                    <div className="col-lg-12 footer-link">
                                        <i className="fas fa-angle-right footerIcon"></i>
                                        <Link className="footerItem" href="/contact" onClick={footerLink(false)}>Contact Us</Link>
                                    </div>
                                ) : (null)}

                                <div className="col-lg-12 footer-link">
                                    <i className="fas fa-angle-right footerIcon"></i>
                                    <Link className="footerItem" href="/admission" onClick={footerLink(false)}>Admission form</Link>
                                </div>
                                    {/* {config.cms_batch === 'true' ?(<>
                                        <div className="col-lg-12">
                                    <i className="fas fa-angle-right footerIcon"></i>
                                    <><Link className="footerItem" href="/batch" onClick={footerLink(false)}>Batch Management</Link></>
                                    
                                </div></>)
                                    :(null)} */}
                                {/* <div className="col-lg-12">
                                    <i className="fas fa-angle-right footerIcon"></i>
                                    <><Link className="footerItem" href="/batch" onClick={footerLink(false)}>Batch Management</Link></>
                                    
                                </div> */}
                                <div className="col-lg-12 footer-link">
                                    <i className="fas fa-angle-right footerIcon"></i>
                                    <Link className="footerItem" href="/privacypolicy" onClick={footerLink(false)}>Privacy Policy</Link>
                                </div>
                            </div>


                        </div>
                        <div className="msy-footer-bar">

                        </div>
                        <div className="msy-footer-social ">
                            <ul className="">

                                {/* {config.social[0]=='Y'?():(null)} */}
                                {config.social && config.social[0] === 'Y' ? (<li className=""><a target="_blank" href={instDetail.facebook} className="fab fa-facebook text-center" onClick={setIcon(false)}></a></li>) : (null)}
                                {config.social && config.social[1] === 'Y' ? (<li className=""><a target="_blank" href={instDetail.twitter} className="fab fa-twitter text-center" onClick={setIcon(false)}></a></li>) : (null)}
                                {config.social && config.social[2] === 'Y' ? (<li className=""><a target="_blank" href={instDetail.linkedin} className="fab fa-linkedin text-center" onClick={setIcon(false)}></a></li>) : (null)}
                                {config.social && config.social[3] === 'Y' ? (<li className=""><a target="_blank" href={instDetail.instagram} className="fab fa-instagram  text-center" onClick={setIcon(false)}></a></li>) : (null)}
                                {config.social && config.social[4] === 'Y' ? (<li className=""><a target="_blank" href={instDetail.youtube} className="fab fa-youtube text-center" onClick={setIcon(false)}></a></li>) : (null)}
                                {config.social && config.social[5] === 'Y' ? (<li className=""><a target="_blank" href={instDetail['app url']} className="fab fa-google-play text-center" onClick={setIcon(false)}></a></li>) : (null)}
                                {config.social && config.social[6] === 'Y' ? (<li className=""><a target="_blank" href={instDetail['app url']} className="fab fa-telegram-plane text-center" onClick={setIcon(false)}></a></li>) : (null)}


                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer
