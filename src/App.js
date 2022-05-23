import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './component/Header';
import Footer from './component/Footer';
import ContactForm from './component/ContactForm';
import ContactMap from './component/ContactMap';
import Home from './pages/Home';
import Course from './pages/Course';
import Aboutus from './pages/Aboutus';
import AdmissionForm from './component/AdmissionForm';
import FranchiseForm from './component/FranchiseForm';
import Exipre from './component/Exipre';
import Blogs from './pages/Blogs';
import Batch from './component/Batch';
import CareerForm from './component/CareerForm';
import Alerts from './pages/Alerts';
import Offering from './pages/Offering';
import AllImageGallery from './pages/allImageGallery';
import Facultyy from './pages/Facultyy';
import NotificationPage from './pages/NotificationPage';
import FAQ from './pages/FAQ';
import Acheivements from './pages/Acheivements';
import CourseDescription from './pages/CourseDescription';
import NotificationDescription from './pages/NotificationDescrption';
import FacultyDescription from './component/FacultyDescription';
import BlogDescription from './pages/BlogDescription';
import VideoPage from './pages/VideoPage';
import * as api from './Api';
import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { GrFormClose } from 'react-icons/gr';
import PayOnline from './component/PayOnline';
import QuickTest from './component/QuickTest';
import Expire from './component/Exipre';
import Privacy from './component/Privacy';
import Refund from './component/Refund';
import Term from './component/Term';
import {  googleAnalyticsActions1 } from '../src/google-analytics/google-analytics-init';
function MyVerticallyCenteredModal(props) {
  googleAnalyticsActions1.initGoogleAnalytics("UA-216573674-1")
  return (
    <Modal
      {...props}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
      style={{
        backgroundColor: 'transparent',
      }}
    >
      {' '}
      <div
        style={{
          width: '90%',
          margin: 'auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        <GrFormClose
          onClick={props.onHide}
          style={{
            color: '#ffffff',
            fontSize: '250%',
            border: '3px solid #ffffff',
            borderRadius: '50%',
            position: 'absolute',
            top: '-40px',
            right: '-40px',
          }}
        />
        <img
          src={props.imgurl}
          style={{
            maxHeight: 'auto',
            width: '100%',
            margin: 'auto',
          }}
          alt=''
        />
      </div>
    </Modal>
  );
}

function App() {
  const [id, setId] = useState('');
  // const [id, setId] = useState("81c318711abc5110e0fbd3d374e9103c");
  const [status, setStatus] = useState(false);
  const [config, setConfig] = useState({});
  const [detail, setDetail] = useState({});
  const [configStatus, setConfigStatus] = useState(false);
  const [primary, setPrimary] = useState('#777777');
  const [secondary, setSecondary] = useState('#777777');
  const [ternary, setTernary] = useState('#777777');
  const [icon, setIcon] = useState('#777777');
  const [modalShow, setModalShow] = useState(true);
  const [popupImage, setPopupImage] = useState('');
  const [imagePopStatus, setImagePopStatus] = useState(false);
  const [expire, setExpire] = useState('');
  const [isColor, setIsColor] = useState(false);
  // const [payment, setPayment] = useState(" ");
  const [domain, setDomain] = useState('');
  useEffect(() => {
    setDomain(window.location.href)
    // setDomain('http://yle.educms.in')
    // setDomain('https://www.vidyamrutham.com/')
    // setDomain('https://www.omaircomputeracademy.com/');
    // setDomain('http://mylearnopedia.com/');
    setDomain('http://suryamodelschool.com/');
    // setDomain('http://commerce2.educms.in/');
    // setDomain('https://www.exploremaths.org/');
    // setDomain('http://coachingparadise.in/')
    // setDomain('https://www.edubell.in/')
    //  setDomain('http://science2.educms.in/');
    // setDomain('https://site35.mycareerlift.com/');
    // setDomain('https://akshaj.co.in/');
    // setDomain('http://Kotaacademy.in/');
    getWebHash();
  }, [domain]);
  const getWebHash = async () => {
    let str = domain.split('/');
    let temp = str[2];
    if (temp != '') {
      api
        .fetchWebHash(temp)
        .then((data) => {
          if (data.status === 'success') {
            console.log("My Hash ID:",data.response[0].inst_hash);
            setId(data.response[0].inst_hash);
            setExpire(data.response[0].expiry_date);
            setStatus(true);
            // console.log('date',data.response[0].expiry_date)
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  useEffect(() => {
    api.fetchStatus(id).then((data) => {
      // console.log('emails',detail.email1);
      if (data) {
        setConfig(data.config);
        setDetail(data.detail);
        setConfigStatus(true);
        document
          .getElementById('favicon')
          .setAttribute('href', data.detail['header_logo']);
        document.title = data.detail.web_title;
      }
    });
  }, [id, configStatus]);

  useEffect(() => {
    api
      .fetchInstituteDetails(id)
      .then((data) => {
        if (data.status === 'Success') {
          // console.log("App", data.response);
          setPrimary(`#${data.response.Primary}`);
          setSecondary(`#${data.response.Secondary}`);
          setTernary(`#${data.response.Ternary}`);
          setIcon(`#${data.response.icon}`);
          setIsColor(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id, isColor]);

  useEffect(() => {
    api
      .fetchImagePopUp(id)
      .then((data) => {
        if (data.status === 'success') {
          setModalShow(true);
          setPopupImage(data.response[0].image);
        } else {
          setModalShow(false);
        }
        setImagePopStatus(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id, imagePopStatus]);

  
  //on refreshing
    const packexpire = setTimeout(() => {
      return(
        <div className="expy_card expire">
              <h1 style={{paddingTop: '25px',marginLeft:'40%'}}>Package Expire</h1>
              <p style={{fontSize:'22px',padding: '30px',marginLeft:'23%'}}>Your Package is expired please contact your administrator</p>
        </div>
      )
    }, 1000);
  
  


      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth()+1; 
      var yyyy = today.getFullYear();
      if(dd<10) 
      {
            dd='0'+dd;
      } 
      if(mm<10) 
      {
            mm='0'+mm;
      } 
      var today1 = new Date(yyyy+'-'+mm+'-'+dd) ;
      // console.log(today);

      // Expiry
      var expire_result=expire;
      // console.log("Result_expired :",expire_result)
      var result= new Date(expire);
      var d2 = result.getDate();
      var m2 = result.getMonth()+1; 
      var y2 = result.getFullYear();
      // var d2=7;
      // var m2=11;
      // var y2=2021;
      
      // console.log("d2",d2)
      // console.log("y2",y2)
      // console.log("m2",m2)
      if(d2<10) 
      {
            d2='0'+d2;
      } 
      if(m2<10) 
      {
            m2='0'+m2;
      } 
      var Expiry_date =new Date(y2+'-'+m2+'-'+d2);
      // console.log("Current Date :\t",today);
      // console.log("Expired Date :",Expiry_date);
      // console.log(Expiry_date>today1);
      
      // if(yyyy<= y2 && ( (mm<=m2) && (dd<=d2 || mm!=m2 ) ))   //2021<=2021 && ((12<=11) && ((8<=1) || 12!=11)))
     // if(yyyy<=y2 &&  ( (mm<=m2) ||  ((dd<=d2) && (mm!=m2))  ) )
      //if((yyyy <= y2 ) && (yyyy != y2 && (((mm<=m2) || (dd>=d2) || mm!=m2)) ) )
      // if((dd<d2) && ((yyyy <= y2 ) && ((((mm<=m2) || (dd>=d2) || mm!=m2)) ) )) final
      
      // if(( (dd<d2 && mm<=m2) && (yyyy<=y2) ) && ((yyyy <= y2 ) &&  ( (mm<=m2) || (dd>=d2) || (mm!=m2) )  ))
      
          //location.reload();
          
          // const [state, setState] = useState({
          //   timePassed: false
          // })
          // setTimeout(() => {setState({timePassed: true})}, 1000);
              
      
          // window.onload = function(){
          // setTimeout(function(){
          // alert("Hello");
          // }, 1000);
          // };
    
   
          {/*
          window.location.reload();
          setTimeout(() => {
          console.log('you can see me after 2 seconds')
          }, 2000);*/}

      return Expiry_date<today1 ?(<div>
    <Expire/>
    </div>):( 
        status && isColor && imagePopStatus ? <div
        className='App'
        style={{
          '--primaryColor': primary,
          //"--primaryColor": "#FF7600",
          '--secondaryColor': secondary,
          //"--secondaryColor": "#CD113B",
          '--ternaryColor': ternary,
          //"--ternaryColor": "#52006A",
          '--iconColor': icon,
        }}
      >
         
        <Router>
          <Header id={id} config={config} />
          <div className="home_main_img">
          
          <Switch>
            <Route exact path='/'>
              <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                imgurl={popupImage}
              />
              <Home id={id} config={config} />
            </Route>
            <Route exact path='/course'>
              {config.cms_course === 'true' ? <Course id={id} /> : null}
            </Route>
            <Route exact path='/courses/:slug'>
              {config.cms_course === 'true' ? (
                <CourseDescription id={id} />
              ) : null}
            </Route>
            <Route exact path='/offering'>
              {config.cms_facilities === 'true' ? <Offering id={id} /> : null}
            </Route>
            <Route exact path='/about'>
              {config.cms_institute_details === 'true' ? (
                <Aboutus id={id} />
              ) : null}
            </Route>
            <Route exact path='/batch'>
              {config.cms_batch === 'true' ? <Batch id={id} /> : null}
            </Route>
            <Route exact path='/blogs'>
              {config.cms_blogs === 'true' ? <Blogs id={id} /> : null}
            </Route>
            <Route exact path='/blogs/:blog_id'>
              {config.cms_blogs === 'true' ? <BlogDescription id={id} /> : null}
            </Route>
            <Route exact path='/admission'>
              {config.cms_admission === 'true' ? (
                <AdmissionForm email={detail.email1} id={id} />
              ) : null}
            </Route>
            <Route exact path='/franchise'>
              <FranchiseForm email={detail.email1} />
              {/* {config.cms_franchise === 'true' ? (
                <FranchiseForm email={detail.email1}/>
              ) : null} */}
            </Route>
            <Route exact path='/career'>
              <CareerForm email={detail.email1} />
            </Route>
            <Route exact path='/contact'>
              {config.cms_contact_details === 'true' ? (
                <>
                  <ContactForm id={id} />
                  <ContactMap id={id} />
                </>
              ) : null}
            </Route>
            <Route exact path='/alerts'>
              {config.cms_alerts === 'true' ? <Alerts id={id} /> : null}
            </Route>
            <Route exact path='/gallery'>
              {config.cms_images === 'true' ? <AllImageGallery id={id} /> : null}
            </Route>
            {/* <Route exact path='/payment'>
              {config.cms_pay_online === 'true' ? <PayOnline id={id} /> : null}
            </Route> */}
            <Route exact path='/payment'>
              <PayOnline id={id} />
            </Route>
            <Route exact path='/videopage'>
              {config.cms_video === 'true' ? <VideoPage id={id} /> : null}
            </Route>
            <Route exact path='/faculty'>
              {config.cms_faculty_details === 'true' ? (
                <Facultyy id={id} />
              ) : null}
            </Route>
            <Route exact path='/faculty/:facultyName'>
              <FacultyDescription id={id} />
            </Route>
            <Route exact path='/notificationpage'>
              {config.cms_notification === 'true' ? (
                <NotificationPage id={id} />
              ) : null}
            </Route>
            <Route exact path='/notification/:id'>
              {config.cms_notification === 'true' ? (
                <NotificationDescription id={id} />
              ) : null}
            </Route>
            <Route exact path='/faq'>
              <FAQ id={id} />
            </Route>
            <Route exact path='/Acheivements'>
              <Acheivements id={id} />
            </Route>
            <Route exact path='/privacypolicy'>
              <Privacy id={id} />
            </Route>
            <Route exact path='/terms'>
              <Term id={id} />
            </Route>
            <Route exact path='/refund'>
              <Refund id={id} />
            </Route>
            <Route exact path='/test'>
              {config.cms_basic_question === 'true' ? (
                <QuickTest id={id} />
              ) : null}
            </Route>
          </Switch>
          </div>
          <Footer id={id} config={config} />
        </Router>
      </div>
     : <div>Loading ...</div>
   
  )
  
  
}

export default App;
