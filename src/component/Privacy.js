import React from 'react';
import { useState, useEffect } from 'react';
import * as api from '../Api';


function Privacy({ id, config}) {
    const [webDetail, setWebDetail] = useState({});
    const [ domain, setDomain] = useState('');

    api.fetchWebData(id)
            .then((data) => {
                setWebDetail(data.detail);
            })
            .catch((err) => {
                console.log(err);
            });

    useEffect(() => {
        setDomain(window.location.href);
        // setDomain('https://commerce.educms.in/');
    },[domain])

    return (
        <div style={{marginTop:'60px'}}>
            <div style={{padding:'100px'}}>
                <b><u>Privacy Policy</u></b>
                <p>
                The user agrees that by entering this website either directly or from any third party website, the user shall be automatically be governed by this privacy policy of {webDetail.institute_name}. 
                </p>
                <p>
                Thank you for visiting {domain}, the website of {webDetail.institute_name}. We respect your privacy and consider it an important element of our business. Our privacy policy is straightforward: We do not collect personal information about you when you visit our website(s) unless you volunteer to provide that information to us. This is broadly how we handle the information we gather. 
                </p>
                <p>
                Information Collected and Stored Automatically
                </p>
                <p>
                If you visit our website(s) just to browse, read pages or download information, but do not register for any of our services, we gather and store certain information about your visit automatically. This information cannot and does not identify you personally.
                </p>
                <p>
                The kind of information that is gathered automatically include the type of browser you are using (e.g. Google Chrome, Internet Explorer), the type of Operating System you are using (e.g. Windows ’10 or Mac OS) and the domain name of your Internet Service Provider (e.g. AIrtel Broadband, Hathway, Tikona Online, BSNL), the date and time of your visit and the pages you visit. We sometimes use this non-personally identifiable information to improve our website(s) design, content and primarily to give you a better browsing experience. 
                </p>
                <p>
                Personal Information Collected
                </p>
                <p>
                We collect personal information from you only if you provide it voluntarily. The type of personally identifiable information that may be collected by us include name, address, e-mail address and information about your interests in and use of various services. For example, you might submit your name and e-mail address to subscribe to our newsletters or to take part in our discussion forum or to send us your feedback. You might also enter another person’s e-mail address and name and yours when you use our ‘Mail This Story’ feature. The information you provide is not given or sold to any private organisations or private persons. 
                </p>
                <p>
                    Collection of Information by Third-Party Sites and Sponsors 
                </p>
                <p>
                Our website(s) sometimes contain links to other websites whose privacy policies may be different to ours. Visitors should consult the other sites’ privacy notices as we have no control over information that is submitted to, or collected by, these third parties. 
                </p>
                <p>
                We also use a reputable third party to serve the advertisements that you see on our pages. In the course of serving advertisements, our third-party advertiser may place or recognise a unique “cookie” on your browser and may use information (not including your name, address, e-mail address) about your visits to this and other websites in order to provide advertisements about goods and services of interest to you.
                </p>
                <p>
                Links to Other Sites
                </p>
                <p>
                Our website(s) has links to other website(s) in the World Wide Web. The privacy policies of these website(s) is not under our control. Once you leave our servers, use of any information you provide is governed by the privacy policy of the operator of the site you are visiting. It is advisable to read their privacy policies for further information.
                </p>
                <p>
                QUESTIONS/ GRIEVANCE REDRESSAL
                </p>
                <p>
                Redressal Mechanism: Any complaints, abuse or concerns with regards to the processing of information provided by you or breach of these terms shall be immediately informed to the designated Grievance Officer as mentioned below via in writing or through email signed with the electronic signature too.
                </p>

            </div>
        </div>
    )
}

export default Privacy;

