import React, { Component } from 'react';
// import { connect } from 'react-redux';

import _reduce from 'lodash/reduce';
import _template from 'lodash/template';
import _get from 'lodash/get';
import _replace from 'lodash/replace';
import _size from 'lodash/size';
import swal from 'sweetalert';
import _find from 'lodash/find';
import _each from 'lodash/each';
import _findIndex from 'lodash/findIndex';
import _isEqual from 'lodash/isEqual'
import $ from 'jquery';

import rtl_config from '../config/grapesjs'
import utils from '../utils';
import Editor from '../Plugins/Editor/';
import config from '../Plugins/Editor/GrapesJS/Plugins/Retainful/constants/replaceContent';
import axios from '../axios'; 
import { Button } from 'reactstrap';
import NavBar from '../components/NavBarEditor';
class grapesjs extends Component {

	constructor(props) {

		super(props);

		this.state = {
			editor: null,
			loading: false,
			appLoading: true,
			message: null,
			isPreviewActive: false,
			assets: [],
			src: null,
			templateId: null,
			toggleTestMailModal: false

		}

		this.onSave = this.onSave.bind(this);
		this.onPreview = this.onPreview.bind(this);
		this.onPublish = this.onPublish.bind(this);
		this.onViewComponent = this.onViewComponent.bind(this);
		this.handleUndo = this.handleUndo.bind(this);
		this.handleRedo = this.handleRedo.bind(this);
		this.onLoad = this.onLoad.bind(this);
		this.close = this.close.bind(this);
		this.onDelete = this.onDelete.bind(this);
		this.runCommands = this.runCommands.bind(this);
		this.setDeviceMobile = this.setDeviceMobile.bind(this);
		this.setDeviceDesktop = this.setDeviceDesktop.bind(this);
		this.setDeviceTablet = this.setDeviceTablet.bind(this);
		this.onImport = this.onImport.bind(this);
		this.FlashMessage = this.FlashMessage.bind(this);
		this.handleTestMail = this.handleTestMail.bind(this);
		this.setAppLoading = this.setAppLoading.bind(this);
		this.prepareHTML = this.prepareHTML.bind(this);
		this.getHTML = this.getHTML.bind(this);
		this.getEditor = this.getEditor.bind(this);
		this.onAssetRemoved = this.onAssetRemoved.bind(this)
		this.toggleTestMailHandler = this.toggleTestMailHandler.bind(this);
		this.onClose = this.onClose.bind(this);
	}

	componentDidMount() {

		const id = _get(this, "props.match.params.id", 52);

		this.setState({
			error: null,
			src: "/template.json",
			// src: process.env.REACT_APP_SERVER_URI + "/mail_template/json/" + id,
			templateId: id,
		});
	}

	runCommands(command) {
		const { editor } = this.state;
		const c = editor.Commands;
		c.run(command);
	}

	setDeviceDesktop() {
		this.runCommands('set-device-desktop');
	}

	setDeviceTablet() {
		this.runCommands('set-device-tablet');
	}

	setDeviceMobile() {
		this.runCommands('set-device-mobile');
	}

	getHTML() {
		return this.prepareHTML();
	}

	onSave() {
		const { editor } = this.state;
		editor.store();
	}

	toggleTestMailHandler() {
		this.setState({ toggleTestMailModal: !this.state.toggleTestMailModal })
	}

	handleTestMail() {
		this.toggleTestMailHandler();
	}

	onPreview() {
		const { editor } = this.state;
		const isPreviewActive = editor.Commands.isActive('preview');

		this.setState({ isPreviewActive: !isPreviewActive })

		if (!isPreviewActive)
			this.runCommands('preview');
		else
			editor.Commands.stop('preview');
	}

	onPublish() {

	}

	close() {
		let path = '/'

		// return history.push(path);
	}

	onClose() {

		const { editor } = this.state;
		let wrapper = editor.DomComponents.getWrapper();
		let couponBlockComponent;
		let couponBlock;

		_each(wrapper.findType('mj-text'), (v) => {

			couponBlock = couponBlock ? couponBlock : _get(v, "attributes.attributes['coupon-block']");

			if (couponBlock && !couponBlockComponent) {
				couponBlockComponent = v;
			}
		});

		if (false) {

			swal({
				title: 'Warning',
				text: "alert",
				icon: "warning",
				buttons: ["Continue to edit", "Save and Close Anyway"],
				dangerMode: true,
			})
				.then((willDelete) => {

					if (willDelete)
						return this.close();

					if (couponBlockComponent)
						editor.select(couponBlockComponent);
				})
				.catch(e => swal("something went wrong please try again", { icon: "error" }));

		} else {
			return this.close()
		}
	}

	onViewComponent() {
		this.runCommands('sw-visibility');
	}

	onDelete() {
		this.runCommands('clean-all');
	}

	handleRedo() {
		this.runCommands('redo');
	}

	handleUndo() {
		this.runCommands('undo');
	}

	onLoad(editor) {

		this.setState({ editor });
		const { user, match } = this.props;
		const type = ""; //match.params.type;


		const domComponents = editor.DomComponents;

		domComponents.addType('mj-image', {
			model: {
				defaults: {
					traits: [
						{
							type: "toggleImageModal",
							label: " ",
							name: "toggleImageModal",
						},
						{
							type: "href",
							label: "Link",
							name: "href",
						},
						{
							type: "alt",
							label: "Alt",
							name: "alt",
						},
					],
				}
			},
		});

		domComponents.addType('mj-section', {
			model: {
				defaults: {
					stylable: [
						'vertical-align', 'text-align',
						'padding', 'padding-top', 'padding-left', 'padding-right', 'padding-bottom',
						'background-color', 'background-url', 'background-repeat', 'background-size',
						'border-top', 'border-top-width', 'border-top-style', 'border-top-color',
						'border-right', 'border-right-width', 'border-right-style', 'border-right-color',
						'border-bottom', 'border-bottom-width', 'border-bottom-style', 'border-bottom-color',
						'border-left', 'border-left-width', 'border-left-style', 'border-left-color',
						'border-radius', 'border-top-left-radius', 'border-top-right-radius', 'border-bottom-left-radius', 'border-bottom-right-radius',
						'border', 'border-width', 'border-style', 'border-color'
					],
				}
			},
		});

		domComponents.addType('mj-column', {
			model: {
				defaults: {
					stylable: [
						'width',
						'padding', 'padding-top', 'padding-left', 'padding-right', 'padding-bottom',
						'background-color',
						'border-top', 'border-top-width', 'border-top-style', 'border-top-color',
						'border-right', 'border-right-width', 'border-right-style', 'border-right-color',
						'border-bottom', 'border-bottom-width', 'border-bottom-style', 'border-bottom-color',
						'border-left', 'border-left-width', 'border-left-style', 'border-left-color',
						'border', 'border-width', 'border-style', 'border-color'
					],
				}
			},
		});

		domComponents.addType('mj-divider', {
			model: {
				defaults: {
					stylable: [
						'padding', 'padding-top', 'padding-left', 'padding-right', 'padding-bottom',
						'width', 'container-background-color',
						'border-detached', 'border-style', 'border-color'
					],
				}
			},
		});

		domComponents.addType('mj-social-element', {
			model: {
				defaults: {
					traits: [
						{
							type: 'select',
							label: 'Icon',
							name: 'name',
							options: [
								{ value: 'facebook-noshare', name: 'Facebook' },
								{ value: 'twitter-noshare', name: 'Twitter' },
								{ value: 'google-noshare', name: 'Google' },
								{ value: 'instagram', name: 'Instagram' },
								{ value: 'web', name: 'Web' },
								{ value: 'youtube', name: 'Youtube' },
								{ value: 'pinterest-noshare', name: 'Pinterest' },
								{ value: 'linkedin-noshare', name: 'Linkedin' },
								{ value: 'snapchat', name: 'Snapchat' },
								{ value: 'vimeo', name: 'Vimeo' },
								{ value: 'tumblr-noshare', name: 'Tumblr' },
								{ value: 'github', name: 'Github' },
								{ value: 'soundcloud', name: 'SoundCloud' },
								{ value: 'medium', name: 'Medium' },
								{ value: 'dribbble', name: 'Dribbble' },
								{ value: 'xing-noshare', name: 'Xing' },
							]
						},
						{
							type: "href",
							label: "Link",
							name: "href",
						},
					],
				}
			},
		});

		domComponents.addType('mj-button', {
			model: {
				defaults: {
					traits: [
						{
							type: "button_text",
							label: "Text",
							name: "button_text",
						},
						{
							type: "href",
							label: "Link",
							name: "href",
						},
					],
					stylable: ['width', 'height',
						'background-color', 'container-background-color',
						'font-style', 'font-size', 'font-weight', 'font-family', 'color',
						'text-decoration', 'align',
						'vertical-align', 'text-transform',
						'padding', 'padding-top', 'padding-left', 'padding-right', 'padding-bottom',
						'border-top', 'border-top-width', 'border-top-style', 'border-top-color',
						'border-right', 'border-right-width', 'border-right-style', 'border-right-color',
						'border-bottom', 'border-bottom-width', 'border-bottom-style', 'border-bottom-color',
						'border-left', 'border-left-width', 'border-left-style', 'border-left-color',
						'border-radius', 'border-top-left-radius', 'border-top-right-radius', 'border-bottom-left-radius', 'border-bottom-right-radius',
						'border', 'border-width', 'border-style', 'border-color',],
				},
			}
		});

		let traits = [];

		if (type === 'acart') {
			if (user.type === 'shopify')
				traits = rtl_config.shopifyTraits;
			else if (user.type === 'woocommerce')
				traits = rtl_config.woocommerTraits;
		} else if (type === 'noc') {
			traits = rtl_config.nocTraits;
		}


		domComponents.addType('mj-text', {
			model: {
				defaults: {
					traits
				}
			},
		});
	}

	onImport() {
		this.runCommands('mjml-import');
	}

	FlashMessage(loading, message = null) {
		this.setState({ loading, message });
	}

	setAppLoading(loading) {
		this.setState({ appLoading: loading });
	}

	onAssetRemoved(e) {
		if (!e)
			return

		const { editor } = this.state;
		let cacheAttribute = e.attributes;
		let id = cacheAttribute.id;
		let selected_target = editor.getSelected();

		if (id) {
			// swalLoading.start();
			axios.delete('/v1/deleteAsset', {
				data: { id }
			})
				.then(response => {

					if (selected_target.attributes.src === cacheAttribute.src)
						selected_target.set('src', process.env.REACT_APP_URI + '/assets/images/not-found.png');

					const input = editor.$(document).find('input');
					input && input.val('');

					let assets = this.state.assets;
					let index = _findIndex(assets, { id: selected_target.attributes.id });

					this.setState(() => ({ assets: assets.splice(index, 1) }));

					this.onSave();
					swal.close();
				})
				.catch(error => {
					console.log(error);

					// swal.close();
					// swal({
					// 	title: "Failed!",
					// 	text: 'Failed to delete file.',
					// 	icon: "error",
					// })
					editor.AssetManager.add(cacheAttribute);
				})
		} else {
			if (selected_target.attributes.src === cacheAttribute.src)
				selected_target.set('src', process.env.REACT_APP_URI + '/assets/images/not-found.png');
		}
	}

	getDiscount(id) {
		return axios.get('/v1/discount/' + id);
	}

	createDiscount(params) {
		return axios.post('/v1/discount', params);
	}

	prepareHTML() {

		const { editor } = this.state;
		try {

			var compiled = _template('<html lang="en"><head><style type="text/css" data-premailer="ignore">@media all and (max-width:680px){.align-text div,.align-text p{text-align: left !important}div[style*="width:30%;"],div[style*="width:40%;"]{width: 100% !important;text-align: left !important}div[align=right],div[align=right] p,td[align=right] p{text-align: left !important}.hidden-xs{display: none}}</style>${head}</head><body>${body}</body></html>');

			let price_rule = {};

			let code = editor.runCommand("mjml-get-code");

			let html = $(
				_replace(
					code.html,
					/<style type=\"text\/css\">/g,
					'<style type="text/css" data-premailer="ignore">'
				)
			);

			let { props } = this;

			function templateReplace(compiled) {

				let app_id = props.user.app_id;

				const compiledObject = {
					shop_info: "e=" + _get(price_rule, "data.data"),
					discountcode: _get(window, "retainful.woocommerce.coupon"),
					app_id
				};

				return compiled(compiledObject);
			}

			html.find(".cr_sc_cnt").replaceWith(function () {
				let id = $(this).attr("data-cr-id");
				let replace_content = config.getReplaceContent({
					...props.user,
					editorType: "storeEmail"
				});

				let data = _find(replace_content, { id });

				if (data) {
					return templateReplace(_template(data.html));
				}

				return "";
			});

			html.find('a').each(function () {
				var newUrl = $(this).attr('href').replace($(this).attr('href'), templateReplace(_template($(this).attr('href'))));
				$(this).attr('href', newUrl);
			});

			let content = _reduce(
				html,
				(i, v) => {

					if ($(v).find('div').length !== 0) i.body.append(v);
					else i.head.append(v);

					return i;
				},
				{
					head: $("<head>"),
					body: $("<body>")
				}
			);
			// content.body.find('div:first').append("<div id='rtl_footer'></div>")
			content.head = content.head.html();
			content.body = content.body.html();

			return compiled(content)
				.replace(/&lt;/g, "<")
				.replace(/&gt;/g, ">")
				.replace(/&amp;/g, "&")
				.replace(/(\r\n|\n|\r)/gm, "");

		} catch (error) {
			// console.log(error);
		}
	}

	loadAssets() {
		return axios.get('/v1/assets/editor');
	}

	getEditor() {
		return this.statLoadere.editor;
	}

	render() {

		const { appLoading, loading, message, isPreviewActive, assets, src, templateId, toggleTestMailModal } = this.state;
		const { FlashMessage, setAppLoading, getDiscount, getHTML, onAssetRemoved, createDiscount, toggleTestMailHandler, loadAssets } = this;
		const { user, match } = this.props;
		// const loader = (appLoading) ? (<Loader />) : '';
        const loader = 'loading';
		const topLoader = (loading && message) ? (<div className="flash-message" style={{ fontWeight: '500' }}>{message}</div>) : '';
		const editorType = "storeEmail"

		return (

			// (utils.checkIsEdge_IE()) ?
			// 	(
			// 		<IsEdge>
			// 			<div className="text-center">
			// 				<span className="d-block">You are using Edge browser. It does not support modern javascript functions. Please use Chrome, Firefox or Safari for a better editing experience.</span>
			// 				<Button color="default" className="mt-3" onClick={this.close}><i className="fa fa-arrow-left"></i> Back</Button>
			// 			</div>
			// 		</IsEdge>
			// 	) :

				<div className="rtl_editor">
					{/* {loader} */}
					{src && <>
                    
                    <NavBar
						{...this.props}
						onSave={this.onSave}
						onPreview={this.onPreview}
						onPublish={this.onPublish}
						onDelete={this.onDelete}
						onViewComponent={this.onViewComponent}
						handleUndo={this.handleUndo}
						handleRedo={this.handleRedo}
						handleTestMail={this.handleTestMail}
						setDeviceMobile={this.setDeviceMobile}
						setDeviceDesktop={this.setDeviceDesktop}
						setDeviceTablet={this.setDeviceTablet}
						onImport={this.onImport}
						onClose={this.onClose}
						isPreviewActive={isPreviewActive}
					/>
						{/* <SideBar {...this.props} /> */}
						<div className="float-left" style={{ width: "96.5%", marginLeft: "3.5%" }}>
							<Editor
								onLoad={this.onLoad}
								asset={assets}
								urlLoad={"http://localhost:3004/template.json"}
								urlStore={src}
								config={
									{
										headers: {
											// Authorization: "Bearer " + localStorage.getItem("accessToken"),
											// "X-Shopify": localStorage.getItem("provider") ? true : "",
											// app_id: user.app_id,
											// "Content-Type": "application/json",
											// ...axios.defaults.headers.common
										},
										retainfulPluginOptions: {
											FlashMessage,
											setAppLoading,
											getHTML,
											onAssetRemoved,
											getDiscount,
											createDiscount,
											templateId,
											loadAssets,
											user,
											editorType,
											blockManager: {
												appendTo: "#cr-panel-block-manger"
											},
											styleManager: {
												appendTo: "#cr-panel-style-manager",
											},
											traitManager: {
												appendTo: "#cr-panel-trait-manager",
											},
											assetManager: {
												uploadFile: (e) => {

													const editor = this.getEditor();

													const onUploadError = (error) => {
														editor.trigger('asset:upload:end', {});
														const input = editor.$(document).find('input');
														input && input.val('');
														editor.trigger('asset:upload:error', error);
													}

													var selectedFile = e.dataTransfer ? e.dataTransfer.files : e.target.files;
													if (selectedFile && _size(selectedFile) !== 0) {

														const FileSize = (selectedFile[0].size / 1024 / 1024);

														if (FileSize > 1) {
															swal({
																title: "Failed!",
																text: "File size exceeds 1 MB",
																icon: "warning",
															});
															onUploadError("File size exceeds 1 MB");

														} else {

															const data = new FormData();

															data.append('image', selectedFile[0]);

															// swalLoading.start();

															utils.requestWithTimeOut(axios.post(process.env.REACT_APP_SERVER_URI + '/uploadAssets', data), 20000)
																.then(response => {

																	// swal.close();
																	editor.Assets.add([{
																		src: response.data.data.url,
																		name: response.data.data.originalName,
																		id: response.data.data.id
																	}]);
																})
																.catch(error => {
																	console.log(error);

																	// swal.close();
																	let status = _get(error, 'response.status');

																	// if (status === 408) {
																	// 	swal({
																	// 		title: "Failed!",
																	// 		text: 'Request timed out.',
																	// 		icon: "warning",
																	// 	});
																	// 	onUploadError('Request timed out.');
																	// } else {
																	// 	swal({
																	// 		title: "Failed!",
																	// 		text: 'Something went wrong.',
																	// 		icon: "error",
																	// 	});
																	// 	onUploadError('Something went wrong.');
																	// }
																});
														}
													} else {
														onUploadError('File not found.');
													}

												},
											}
										}
									}
								}
							/>
						</div></>
					}
					{topLoader} 
				</div>
		)
	}
}

// const mapStateToProps = ({ user, app }) => {
// 	return { user: user.info, app };
// }

// export default connect(mapStateToProps, null)(grapesjs);
export default grapesjs;