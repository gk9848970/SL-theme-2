import React from 'react'
import * as api from '../Api'
import { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
function Offering({ id }) {
    const [packages, setPackages] = useState([]);
    const [status, setStatus] = useState(false);
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
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
            <div className="container">
                <div className="heading">
                    <p className="">What we offer</p>
                </div>
                <br />
                <Container>
                    <Row>
                        {packages.map((card, index) => {
                            return (<Col>
                                <div className="col-lg-4 offer_card">
                                    <div className="">
                                        <h5 className="">{card.course_name}</h5>
                                        <br />
                                        <h5 className="">Price : ₹&nbsp;{card.course_price}/-</h5>
                                        <br />
                                        <h5 className="" ><i class="far fa-calendar-day" style={{height:'35px'}}></i> {": " + card.course_start_date.slice(0, 10)}</h5>
                                        <br />
                                        <h5 className="" ><i class="fad fa-clock"></i>: {card.course_duration}</h5>
                                        {/* <button className="btn text-white costumButton " id="apply-btn1" style={{ width: "50%", marginTop: "50px" }}><a href="http://35.244.8.93:4001/login/780169556366cd2f59c47f58e9158b9e">Apply</a></button> */}
                                    </div>
                                </div>
                            </Col>)
                        })}
                    </Row>
                </Container>


            </div>

        )
    } else {
        return (<></>)
    }

}
export default Offering;