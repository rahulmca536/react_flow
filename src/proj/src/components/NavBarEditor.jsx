import React from 'react'
import { Navbar, Nav } from "react-bootstrap";
import PropTypes from 'prop-types';

export default function Editor(props) {
	return (


<div class="w-full">
<nav class="bg-gray-100 ">
  <div class="mx-auto px-4 sm:px-6 lg:px-6">
    <div class="flex items-center justify-between md:h-16">

      <div class="flex items-center">
        <div class="hidden md:block">
          <ul class=" flex items-baseline space-x-8">
						<li style={{ borderLeft: "1px solid #e8e8e8" }} onClick={props.setDeviceMobile}>
							<i className="fa fa-mobile" aria-hidden="true"></i>
						</li>
						<li style={{ borderLeft: "1px solid #e8e8e8" }} onClick={props.setDeviceTablet}>
							<i className="fa fa-tablet" aria-hidden="true"></i>
						</li>
						<li onClick={props.setDeviceDesktop}>
							<i className="fa fa-desktop" aria-hidden="true"></i>
						</li>
			
          </ul>
        </div>
      </div>
      <div class="hidden md:block">
	  <ul class=" flex items-baseline space-x-8">
						{/* <li style={{ borderLeft: "1px solid #e8e8e8" }} onClick={props.onViewComponent}>
							<i className="fa fa-square-o"></i>
						</li> */}
						<li style={{ borderLeft: "1px solid #e8e8e8" }} onClick={props.onDelete}>
							<i className="fa fa-trash"></i>
						</li>
						<li style={{ borderLeft: "1px solid #e8e8e8", display: 'none' }} onClick={props.onImport}>
							<i className=" fa fa-download"></i>
						</li>
						<li onClick={props.handleUndo}>
							<i className="fa fa-undo"></i>
						</li>
						<li onClick={props.handleRedo}>
							<i className="fa fa-repeat"></i>
						</li>
						<li onClick={props.handleTestMail}><i className="fa fa-paper-plane-o"></i> Send test email</li>
						<li onClick={props.onPreview}> {props.isPreviewActive ? <><i className="fa fa-eye-slash"></i> Close Preview</> : <><i className="fa fa-eye"></i> Preview</>}</li>
						<li onClick={props.onSave}><i className="fa fa-floppy-o"></i> Save</li>
						<li onClick={props.onClose}><i className="fa fa-times"></i>  Close</li>
						{/* <li
							onClick={ props.onPublish }
							style={{
								background: "#3799ec",
								color: "white",
								fontWeight: 500
							}}
						>
							Save & Close
					</li> */}
					</ul>
      </div>


    </div>
  </div>


</nav>
</div>








	)
}

Editor.propTypes = {
	onSave: PropTypes.func,
	onPreview: PropTypes.func,
	onPublish: PropTypes.func,
	onDelete: PropTypes.func,
	onViewComponent: PropTypes.func,
	handleRedo: PropTypes.func,
	handleUndo: PropTypes.func,
}