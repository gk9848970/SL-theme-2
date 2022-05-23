import React from 'react'
import ReactGA from 'react-ga';
import Link from "./Link";
import * as api from '../Api';
import { useState, useEffect } from 'react';
import { Accordion } from 'react-bootstrap';
import { Container, Row, Col } from 'react-bootstrap'

function Offer({ id }) {

    const [packages, setPackages] = useState([]);
    const [status, setStatus] = useState(false);
    const [config, setConfig] = useState({});
    const setView = () =>{
        ReactGA.event({
            category:"Button",
            action:"Offer Button Clicked",
            label:"User save there Offer list by clicking CLICK ME! button"
        })
    };
    useEffect(() => {
        api.fetchPackageDetails(id, 100)
            .then((data) => {
                if (data.status === "success") {
                    setPackages(data.response);
                    setStatus(true);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    if (status) {
        return (
            <div>
                <div className="msy-weOffer container-fluid">
                    <div className="msy-offer-carousel d-flex flex-column justify-content-between">
                        <div className="msy-offerHead">
                            <h1 className="text-center ">What we offer</h1>
                        </div>
                        <div className="mt-5 msy-weOffer-cont d-flex flex-wrap justify-content-between">
                            <Container>
                                <Row>
                                    {packages.slice(0, 3).map((card, index) => {
                                        return (<Col lg={4}>
                                            <div className="col-lg-4 offer_card">
                                                <div className="">
                                                    <h5 className="">{card.course_name}</h5>
                                                    <br />
                                                    <h5 className="">Price : ₹&nbsp;{card.course_price}</h5>
                                                    <br />
                                                    <h5 className="" ><i className="far fa-calendar-day" style={{height:'35px'}}></i>{ ": " +  card.course_start_date.slice(0, 10)}</h5>
                                                    <br />
                                                    <h5 className="" ><i className="fad fa-clock"></i>: {card.course_duration}</h5>
                                                    {/* <button className="btn text-white costumButton" id="apply-btn1" style={{  width: "50%", marginTop: "50px" }}><a href="http://35.244.8.93:4001/login/780169556366cd2f59c47f58e9158b9e">Apply</a></button> */}
                                                </div>
                                            </div>

                                        </Col>)
                                    })}

                                </Row>
                            </Container>


                        </div>
                        {/* <button class="btn msy-viewall msy-offer-viewall ">View All</button> */}
                    </div>
                    <div className="col-lg-12 text-center  mt-3">
                        <Link href="offering">
                            <button className="btn costumButton btn-lg " onClick={() =>  setView(false)}>View All</button>
                        </Link>
                    </div>

                </div>
               
            </div>
        )
    } else {
        return (<></>)
    }

}

export default Offer;
