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

function MyVerticallyCenteredModal(props) {
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

function App1() {
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
    // setDomain('https://commerce.educms.in/');
    // setDomain('https://edulyn.educms.in')
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
            setId(data.response[0].inst_hash);
            setExpire(data.response[0].expiry_date);
            setStatus(true);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  useEffect(() => {
    api.fetchStatus(id).then((data) => {
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
      today = yyyy+'-'+mm+'-'+dd ;
      console.log(today);
      
  return status && isColor && imagePopStatus ? (
    <div
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
          <Route exact path='/test'>
            {config.cms_basic_question === 'true' ? (
              <QuickTest id={id} />
            ) : null}
          </Route>
        </Switch>
        <Footer id={id} config={config} />
      </Router>
    </div>
  ) : (
    <div>Loading ...</div>
  );
  
  
}

export default App1;
