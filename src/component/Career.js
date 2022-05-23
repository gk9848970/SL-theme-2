import { Container } from '@material-ui/core'
import Grid from '@material-ui/core/Grid';
import React from 'react'
import CareerForm from './CareerForm';
import Dev from './img/dev.svg'
function Career() {
	return (
		<div>
			<div className="careerHeading">
				<h1>Career Form</h1><br/>
				<p>Fill the Career Form</p>
			</div>
				<Container className="career_formm" style={{ backgroundColor: '#F8F8FF',width: '80%'}}>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<img src={Dev} alt="Admission" className="svg2"/>
						</Grid>
						<Grid item xs={12} sm={6} >
							<CareerForm/>
						</Grid>		
					</Grid>
				</Container>
				<br/>
				<br/>
			
		</div>
	)
}

export default Career
