import React, {useState,useEffect} from 'react'
import {Link} from 'react-router-dom';
import * as api from '../Api';
function Headernew({id}) {
	const [instDetail, setInstDetail] = useState({});
	const [webDetail, setWebDetail] = useState({});
	const [status, setStatus] = useState(false);
	const [toggle,setToggle] = useState(0); 
	const [dynamicButtonItems,setDynamicButtonItems]=useState([]);
	const [dynamicButtonName, setDynamicButtonName] = useState([]);
	const [dyStatus, setdyStatus] = useState(false);
	useEffect(() => {
		api.fetchInstituteDetails(id)
		.then((data) => {
			if (data.status === "Success") {
			setInstDetail(data.response);
			setStatus(true);
			}
			if (!status) setToggle(toggle + 1);
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
		api.fetchDynamicButton('56609cdc79b2838b15c2950d5dbf654b')
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
	}, [toggle,status]);
	var url = "https://d2hp90zy5ktxok.cloudfront.net/website_logo/" + instDetail["Header Logo"];
	return (
		<div className="nav">
			<div>
				<img style={{width:"auto",height:"80px"}} src={url} alt=""/>
			</div>
			
			<div>
				<ul className="links">
					<li><Link to='/'>Home</Link></li>
					<li><Link to='/about'>About</Link></li>
					<li><Link to="/course">Course</Link></li>
					<li><Link to="/onlinetest">Online Test</Link></li>
					<li><Link to="/admission">Admission</Link></li>
					<li><Link to="/gallery">Our Gallery</Link></li>
					<li><Link to="/offer">Our Offering</Link></li>
					<li><Link to="/payonline">Pay Online</Link></li>
					{dyStatus ? (<li className="dropdown">
                                        <Link href="/instructor">{dynamicButtonName}</Link>
                                        {dynamicButtonItems.map((item,index)=>{
                                            return(<>
                                                <ul className="dropdown-menu clearfix">
                                            	        <li><Link href={item.url}>{item.title}</Link></li>
                                            	    </ul>
						</>)
                                        })}
                                    </li>):null}	
			        </ul>
			</div>
			<div>
				<div>
					<Link href="/alerts">
                                        	<button type="button" class="btn" >
                                        	        <i class="fa fa-exclamation-circle fa-2x" style={{color: 'white'}}></i>
                                        	</button>
                                        </Link>
				</div>
				<div>
					<Link href="/alerts">
                                        	<button type="button" class="btn btn-primary">Contact us</button>
                                        </Link>
				</div>
				<div>
					<Link href="/alerts">
                                        	<button type="button" href="https://www.speedlabs.in/" class="btn btn-primary">Speed Labs</button>
                                        </Link>
				</div>
			</div>
		</div>
	)
}

export default Headernew
