import React, { Component } from 'react';
import PropTypes from 'prop-types';

import GrapesJS from './GrapesJS';

export default class Editor extends Component {
	
	render() {
		return (
			<div>
				<GrapesJS {...this.props}/>
			</div>
		)
	}
	
}


Editor.propTypes = {
	onLoad: PropTypes.func.isRequired
}