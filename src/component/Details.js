import React, { useState } from 'react'
import { Tab, Tabs } from 'react-bootstrap';
import Benefit from './Benefit';
import Eligbility from './Eligbility';
import Overview from './Overview';
import './css/Details.css'
function Details(props) {
    // console.log(props);
    const [key, setKey] = useState('home');
    if(props.status===true){
        return (
            <div className="detail">
                <h3 className="text-center">{props.course.course_name}</h3>
                <p  dangerouslySetInnerHTML={{ __html: props.course.course_detail}} />
                <br />
                <div>
                    <Tabs
                        id="controlled-tab-example"
                        activeKey={key}
                        onSelect={(k) => setKey(k)}
                    >
                        <Tab eventKey="overview" title="Overview">
                            <Overview data={props.course.course_overview} />
                        </Tab>
                        <Tab eventKey="eligbility" title="Eligbility">
                            <Eligbility data={props.course.course_eligibility}/>
                        </Tab>
                        <Tab eventKey="benefits" title="Key Benefits" >
                            <Benefit data={props.course.course_key_benefits}/>
                        </Tab>
                    </Tabs>
                </div>

            </div>
        )

    }else{
        return(<></>)
    }
    
}

export default Details

