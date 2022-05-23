import React from 'react'
function Benefit(props) {
	return (
		<div className="benefit">
			<h1 className="text-center">Benefit</h1>
			<br/>
			<p dangerouslySetInnerHTML={{ __html: props.data }} />
			</div>
	)
}

export default Benefit
