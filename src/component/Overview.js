import React from 'react'
import './css/Overview.css'
function Overview(props) {
	return (
		<div className="overview">
			<h1 className="text-center">Overview</h1>
			<br/>
			<p dangerouslySetInnerHTML={{ __html: props.data }}/>
		</div>
	)
}

export default Overview
