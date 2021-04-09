import React, { PureComponent } from 'react'
import GrapesJS from 'grapesjs';
import _isFunction from 'lodash/isFunction';
// import gjsmjml from 'grapesjs-mjml';
import '../GrapesJS/Plugins/CKEditor';
import '../GrapesJS/Plugins/Retainful';

import { Tabs, Tab } from 'react-bootstrap'

import 'grapesjs/dist/css/grapes.min.css';

export default class GrapesjsEditor extends PureComponent {

	static container = null;

	static getEditor = () => GrapesJS.editors[0] || null;

	id = 'grapesjs-react';
	containerId = `grapesjs-react-editor-container`;

	constructor(props) {
		super(props);

		this.state = {
			tabKey: 'trait',
			openTab:2
		}

		this.changeTab = this.changeTab.bind(this);
	}

	componentWillUnmount() {
		let editor = GrapesjsEditor.getEditor();
		editor && editor.destroy();
	}

	renderEditor = () => this.initEditor();

	loadCKEditor(callback) {
		const existingScript = document.getElementById("rflckeditor");
		if (!existingScript) {
			const script = document.createElement("script");
			script.src = "../../../../ckeditor/ckeditor.js";
			script.id = "rflckeditor";
			document.body.appendChild(script);

			script.onload = () => {
				window.CKEDITOR.dtd.$editable.a = 1;
				if (callback) callback();
			};
		}
		if (existingScript && callback) callback();
	}

	ToFixCanvas = () => {

		let $ = GrapesjsEditor.getEditor().$;
		let $document = GrapesjsEditor.getEditor().Canvas.getDocument();

		$($document)
			.find("#wrapper")
			.children()
			.each((v, k) => {
				if (k !== 0) $(v).remove();
			});
	};

	rendered = () => !!GrapesjsEditor.container;

	getContainer = () => {
		if (GrapesjsEditor.container) {
			return GrapesjsEditor.container;
		}
		return document.getElementById(this.containerId);
	};

	componentDidMount() {
		this.loadCKEditor(_ => this.renderEditor());
	}

	initEditor = () => {

		const { containerId, getContainer } = this;
		const { onLoad, urlLoad, urlStore } = this.props;
		const { retainfulPluginOptions, headers } = this.props.config;

		let options = {
			container: "#" + containerId,
			fromElement: true,
			height: '93vh',
			plugins: ['gjs-plugin-ckeditor', 'grapesjs-mjml', 'retainful'],
			pluginsOpts: {
				'gjs-plugin-ckeditor': {
					position: "center",
					options: {
						language: "en",
						skin: "bootstrapck",
						autoParagraph: true,
						shortcode: {
							name: "Tags",
							value: []
						},
						extraPlugins: ["colorbutton", "font"]
					}
				},
				['grapesjs-mjml']: {
					categoryLabel: 'Elements'
				},
				'retainful': {
					url: window.location.href,
					changeTab: this.changeTab,
					...retainfulPluginOptions,
				}
			},
			storageManager: {
				type: "remote",
				fromElement: false,
				id: "gjs-",
				contentTypeJson: true,
				urlLoad: urlLoad,
				urlStore: urlStore,
				headers: {
					"Content-Type": "application/json",
					...headers
				},
				...retainfulPluginOptions.storageManager
			},
			assetManager: {
				uploadName: 'image',
				multiUpload: 0,
				uploadText: `
				  <div>Drop files here</div>
				  <div>or</div>
				  <div>
					<label htmlFor="file-upload" class="custom-file-upload" style=" padding: 10px; ">
					<i class="fa fa-cloud-upload"></i> Browse File </label>
				  </div>
				`,
				assets: [],
				showUrlInput: 0,
				...retainfulPluginOptions.assetManager
			},
			blockManager: {
				...retainfulPluginOptions.blockManager
			},
			styleManager: {
				...retainfulPluginOptions.styleManager
			},
			traitManager: {
				...retainfulPluginOptions.traitManager
			}
		};

		GrapesJS.init(options);

		GrapesjsEditor.container = getContainer();

		let editor = GrapesjsEditor.getEditor();

		_isFunction(onLoad) && onLoad(editor);

		editor.Panels.removePanel("views");
	};

	changeTab(k) {
		this.setState({ tabKey: k })
	}

	render() {

		const { id, containerId } = this;
		const { tabKey } = this.state;
		const { openTab } = this.state;

		return (
			<>
				<div
					id={id}
					ref={div => this.componentContainer = div}
					style={{ width: "80%", float: "left" }}

				>
					<div id={containerId} />
				</div>




				<div style={{ width: "20%", float: "left", fontSize: '13px' }}>

					<Tabs
						id="gjs-custom-panel-nav"
						className="gjs-custom-panel-nav"
						activeKey={tabKey}
						onSelect={(k) => this.changeTab(k)}
					>
						<Tab eventKey="blocks" title={<><i className="fa fa-th-large"></i> Blocks</>}>
							<div id="cr-panel-block-manger" style={{ overflow: 'scroll', height: '86vh' }}></div>
						</Tab>
						<Tab eventKey="styles" title={<><i className="fa fa-paint-brush"></i> Styles</>}>
							<div id="cr-panel-style-manager" style={{ overflow: 'scroll', height: '86vh' }}></div>
						</Tab>
						<Tab eventKey="trait" title={<><i className="fa fa-paint-brush"></i> Trait</>}>
							<div id="cr-panel-trait-manager" style={{ overflow: 'scroll', height: '86vh' }}></div>
						</Tab>
					</Tabs>

				</div>
			</>
		)
	}
}
