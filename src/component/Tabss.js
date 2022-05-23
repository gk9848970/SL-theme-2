import React from 'react'
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
function Tabss(props) {
	
	const { children, value, index, ...other } = props;
	
	return (
		<div>
			<div
				role="tabpanel"
				hidden={value !== index}
				id={`full-width-tabpanel-${index}`}
				aria-labelledby={`full-width-tab-${index}`}
				{...other}
				>
				{value === index && (
					<Box p={3}>
					<Typography>{children}</Typography>
					</Box>
				)}
			</div>

		</div>
	)
}

export default Tabss
