import React from 'react'
import './css/Classwisetest.css'
function Test() {
    function toggleSubject(cleck_el){
    var d=cleck_el;
    console.log(d);
       

}
    
    return (
        <div>
                <div className="msy-course-type w-100  ">
                    <div className="msy-course-type1 ">
                    <div className="msy-course-backbtn w-100 ">
                        <a href="#" className="text-left"><i className="fas fa-arrow-left" style={{color: 'black'}} /> CBSE Class 8th Test</a>
                    </div>
                    <div className="msy-test-cont w-100">
                        <div className="msy-test-btn  w-100">
                        <div className="btn msy-toggle-btn w-100 text-left d-flex justify-content-between" id="msy-subjects1" onclick={toggleSubject()}>
                            <span>History</span>
                            <span>
                            <i className="fas fa-angle-down" style={{color: '#000000', fontFamily: '"Font Awesome 5 Pro"'}} />
                            </span>
                        </div>
                        <div className="msy-subjectwise-test  flex-column justify-content-between" id="msy-subjects11">
                            <div className="msy-subjects d-flex justify-content-between align-items-center  ">
                            <span className="d-inline">Mughal</span>
                            <button className="btn d-inline">Take Test</button>
                            </div>
                            <div className="msy-subjects d-flex justify-content-between align-items-center ">
                            <span className="d-inline">Mughal</span>
                            <button className="btn d-inline">Take Test</button>
                            </div>
                            <div className="msy-subjects d-flex justify-content-between align-items-center ">
                            <span className="d-inline">Mughal</span>
                            <button className="btn d-inline">Take Test</button>
                            </div>
                            <div className="msy-subjects d-flex justify-content-between align-items-center ">
                            <span className="d-inline">Mughal</span>
                            <button className="btn d-inline">Take Test</button>
                            </div>
                        </div>
                        </div>
                        <div className="msy-test-btn w-100">
                        <div className="btn msy-toggle-btn w-100 text-left d-flex justify-content-between" id="msy-subjects2" onclick={toggleSubject()}>
                            <span>History</span>
                            <span>
                            <i className="fas fa-angle-down" style={{color: '#000000', fontFamily: '"Font Awesome 5 Pro"'}} />
                            </span>
                        </div>
                        <div className="msy-subjectwise-test  flex-column justify-content-between" id="msy-subjects12">
                            <div className="msy-subjects d-flex justify-content-between align-items-center  ">
                            <span className="d-inline">Mughal</span>
                            <button className="btn d-inline">Take Test</button>
                            </div>
                            <div className="msy-subjects d-flex justify-content-between align-items-center ">
                            <span className="d-inline">Mughal</span>
                            <button className="btn d-inline">Take Test</button>
                            </div>
                            <div className="msy-subjects d-flex justify-content-between align-items-center ">
                            <span className="d-inline">Mughal</span>
                            <button className="btn d-inline">Take Test</button>
                            </div>
                            <div className="msy-subjects d-flex justify-content-between align-items-center ">
                            <span className="d-inline">Mughal</span>
                            <button className="btn d-inline">Take Test</button>
                            </div>
                        </div>
                        </div>
                        <div className="msy-test-btn w-100">
                        <div className="btn msy-toggle-btn w-100 text-left d-flex justify-content-between" id="msy-subjects3" onclick={toggleSubject()}>
                            <span>History</span>
                            <span>
                            <i className="fas fa-angle-down" style={{color: '#000000', fontFamily: '"Font Awesome 5 Pro"'}} />
                            </span>
                        </div>
                        <div className="msy-subjectwise-test  flex-column justify-content-between" id="msy-subjects13">
                            <div className="msy-subjects d-flex justify-content-between align-items-center ">
                            <span className="d-inline">Mughal</span>
                            <button className="btn d-inline">Take Test</button>
                            </div>
                            <div className="msy-subjects d-flex justify-content-between align-items-center ">
                            <span className="d-inline">Mughal</span>
                            <button className="btn d-inline">Take Test</button>
                            </div>
                            <div className="msy-subjects d-flex justify-content-between align-items-center ">
                            <span className="d-inline">Mughal</span>
                            <button className="btn d-inline">Take Test</button>
                            </div>
                            <div className="msy-subjects d-flex justify-content-between align-items-center ">
                            <span className="d-inline">Mughal</span>
                            <button className="btn d-inline">Take Test</button>
                            </div>
                        </div>
                        </div>
                        <div className="msy-test-btn w-100">
                        <div className="btn msy-toggle-btn w-100 text-left d-flex justify-content-between" id="msy-subjects4" onclick={toggleSubject()}>
                            <span>History</span>
                            <span>
                            <i className="fas fa-angle-down" style={{color: '#000000', fontFamily: '"Font Awesome 5 Pro"'}} />
                            </span>
                        </div>
                        <div className="msy-subjectwise-test  flex-column justify-content-between" id="msy-subjects14">
                            <div className="msy-subjects d-flex justify-content-between align-items-center  ">
                            <span className="d-inline">Mughal</span>
                            <button className="btn d-inline">Take Test</button>
                            </div>
                            <div className="msy-subjects d-flex justify-content-between align-items-center ">
                            <span className="d-inline">Mughal</span>
                            <button className="btn d-inline">Take Test</button>
                            </div>
                            <div className="msy-subjects d-flex justify-content-between align-items-center ">
                            <span className="d-inline">Mughal</span>
                            <button className="btn d-inline">Take Test</button>
                            </div>
                            <div className="msy-subjects d-flex justify-content-between align-items-center ">
                            <span className="d-inline">Mughal</span>
                            <button className="btn d-inline">Take Test</button>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
        </div>
    )
}

export default Test
