import React from 'react'
import Footer from '../component/Footer'
import Header from '../component/Header'
import QuickTest from '../component/QuickTest'

function Quick() {
	return (
		<div>
			<Header/>
				<div style={{marginTop: "100px"}}>
				<QuickTest/>
				</div>	
			<Footer/>
		</div>
	)
}

export default Quick;