import React, { useState, useEffect} from 'react'
import './css/Contact.css'
import * as api from '../Api';
import PhoneInTalkOutlinedIcon from '@material-ui/icons/PhoneInTalkOutlined';
import EmailIcon from '@material-ui/icons/Email';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import ContactForm from '../component/ContactForm';
import ContactMap from '../component/ContactMap';
import Grid from '@material-ui/core/Grid';
function Contact({id}) {
	const [instDetail, setInstDetail] = useState({});
	const [status, setStatus] = useState(false);
	const [setDefImages] = useState({});

	useEffect(() => {

		api.fetchInstituteDetails(id)
		.then((data) => {
			if (data.status === "Success") {
			setInstDetail(data.response);
			setStatus(true);
			setDefImages(data.default_img);
			}
		})
		.catch((err) => {
			console.log(err);
		});

	}, []);
	if(status){
		return (
				<div style={{marginTop:"30px"}}>
					<div>
						<Grid container spacing={1}>
							<Grid item xs={12} >
								<ContactForm/>
							</Grid>
						</Grid>
					</div>

				</div>
			)
	}
	else{
		return null;
	}
	
}

export default Contact
