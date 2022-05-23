import React from 'react'
import Link from "./Link";
import ReactGA from 'react-ga';
import * as api from '../Api';
import { useState, useEffect } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Avatar } from "@material-ui/core";
import { ArrowBackIos, ArrowForwardIos } from "@material-ui/icons";
import testimonialImage from '../images/testimonial.png';
const PreviousBtn = (props) => {
  // console.log(props);
  const { className, onClick } = props;
 
  return (
    <div className={className} onClick={onClick}>
      <ArrowBackIos style={{ color: "white", fontSize: "45px" }} />
    </div>
  );
};
const NextBtn = (props) => {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <ArrowForwardIos style={{ color: "white", fontSize: "45px" }} />
    </div>
  );
};

function Review({id}) {

    const [testimonials, setTestimonials] = useState([]);
    const [status, setStatus] = useState(false);
    const Testi = () =>{
      ReactGA.event({
        category:"Testimonial Button",
        action:"Testimonial Review",
        label:"Review of our client "
    })
  }
    useEffect(() => {
        api.fetchTestimonials(id)
            .then((data) => {
                if (data.status === "success") {
                    setTestimonials(data.response);
                    setStatus(true);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
     return (
        <div>
        <div className=" text-center msy-offerHead">
         <h1 style={{ marginBottom: 20 }}>Testimonials</h1>
        </div>
    <div
      className="testimonial pt-5"
      style={{ display: "flex", justifyContent: "center"}}
    >
    
      <div style={{ width: "60%", textAlign: "center" }}>
       
        <Slider prevArrow={<PreviousBtn />} onClick={Testi(false)} nextArrow={<NextBtn />} dots>
        {
            testimonials.map((testimonial,index)=>{
                return(
                     <Card data={testimonial} />
                )
            })
        }
          
         
        </Slider>
      </div>
    </div>
    </div>
  );
};

const Card = ({data}) => {
    
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        textAlign: "center",
        color: "white",
      }}
    >
      <Avatar
        imgProps={{ style: { borderRadius: "50%" } }}
        src={data.img_url && data.img_url.length >0 ? (data.img_url):(testimonialImage)}
        style={{
          width: 120,
          height: 120,
          border: "3px solid white",
          padding: 7,
          marginBottom: 20,
        }}
      />
      <p style={{color: "white"}} dangerouslySetInnerHTML={{ __html: data.desc }}>
      </p>
      <p style={{ fontStyle: "italic", marginTop: 25 }}>
        <span style={{ fontWeight: 500, color: "white" }}>{data.fname+" "+data.lname}</span> ,
       {data.title}
      </p>
    </div>
  );
    
}

export default Review;