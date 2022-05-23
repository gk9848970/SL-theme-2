import React from 'react'
import './css/Eligbility.css'
function Eligbility(props) {
	return (
		<div className="eligbility">
			<h1 className="text-center">Eligbility</h1>
			<br/>
			<p dangerouslySetInnerHTML={{ __html: props.data }} />
		</div>
	)
}

export default Eligbility
