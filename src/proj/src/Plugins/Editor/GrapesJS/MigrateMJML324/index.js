const DEFAULT_SOCIAL_DISPLAY = 'facebook twitter google'
const DEFAULT_SOCIAL = ['facebook', 'twitter', 'google', 'instagram', 'linkedin', 'pinterest'];

export default class migrate {

	constructor(mjml, $) {

		let wrapper = '<mjml><mj-head><mj-font name="Lato" href="https://fonts.googleapis.com/css?family=Lato:400,700"></mj-font><mj-font name="Oswald" href="https://fonts.googleapis.com/css?family=Oswald:500,600,700"></mj-font></mj-head><mj-body></mj-body></mjml>';

		this.mjml = mjml;
		this.$ = $;
		this.$MJML = $(wrapper);
		this.error = false;

		try {
			this.$mjml = $(mjml);
		} catch (error) {
			this.error = true;
		}
	}

	fixImage() {
		const { $ } = this;
		this.$mjml.find('mj-image').each(function () {
			let thiz = $(this);
			let imgChild = thiz.children();

			if (imgChild.length !== 0) {
				thiz.html('');
				thiz.after(imgChild);
			}
		});
	}

	listAttributes($node) {

		var attrs = {};
		$node[0] && this.$.each($node[0].attributes, attribute => (attrs[attribute.name] = attribute.value));
		return attrs;
	}

	listAllNetworks = $social => {

		const attributes = ($social.attr('display') || DEFAULT_SOCIAL_DISPLAY).split(' ')
		delete $social.removeAttr('display');
		return attributes
	}

	removeContainerTag() {

		let $containerChild = this.$mjml.find('mj-container').children();
		let $body = this.$MJML.find('mj-body');

		this.$mjml = $containerChild.length !== 0 ? $body.append($containerChild) : $body;
	}

	migrateSocialSyntax() {

		let $social = this.$mjml.find('mj-social');
		const attributes = this.listAttributes($social);
		const networks = this.listAllNetworks($social);

		$social.html(' ');

		networks.forEach(network => {

			const nameMigrated = network
				.replace(':url', '-noshare')
				.replace(':share', '')

			const nameWithoutOpts = nameMigrated.replace('-noshare', '');

			let mjSocialElement = this.$('<mj-social-element>');
			mjSocialElement.attr("name", nameMigrated);
			// mjSocialElement.html(attributes[`${nameWithoutOpts}-content`]);
			$social.removeAttr(`${nameWithoutOpts}-content`);
			$social.css({ "font-size": "12px", "icon-size": "24px", "border-radius": "12px" })
			Object.keys(attributes).forEach(key => {

				if (key.indexOf(nameWithoutOpts) !== -1 && key.indexOf('content') && attributes[key] != 'null') {
					mjSocialElement.attr(key.replace(`${nameWithoutOpts}-`, ''), attributes[key]);
					$social.removeAttr(key);
				}

				DEFAULT_SOCIAL.forEach(social => {
					if (key.indexOf(social) !== -1)
						$social.removeAttr(key);
				})
			});

			$social.append(mjSocialElement);

		});
	}

	hasError() {
		return this.error;
	}

	isMJML3() {
		if (this.error === true || this.$mjml.has('mj-container').length === 0)
			return false;

		return true;
	}

	getMJML() {
		try {
			return this.$mjml[0].outerHTML;
		} catch (error) {
			return this.mjml;
		}
	}

	replaceImage(img, replaceImg) {

		const { $ } = this;

		this.$mjml.find('mj-image').each(function () {

			let src = $(this).attr('src');

			if (img === src)
				$(this).attr('src', replaceImg)
		})
	}

	fixButtonText() {
		const { $ } = this;

		this.$mjml.find('mj-button').each(function () {
			if ($(this).has('span').length !== 0) {
				this.innerText = ($(this).find('span'))[0].innerText;
			}
		});
	}

	addStyle(){
		this.$mjml.find('[data-cr-id="line_item"]').attr("css-class","line-item-list");
		this.$mjml.find('mj-head').html('<mj-style>@media (max-width: 480px){ .line-item-list div { width: 100% !important; text-align:center !important; } .line-item-list table { width: 100% !important; overflow: auto !important; } .line-item-list table img {width: 50px !important}}</mj-style><mj-font name="Lato" href="https://fonts.googleapis.com/css?family=Lato:400,700" id="ir54" /><mj-font name="Oswald" href="https://fonts.googleapis.com/css?family=Oswald:500,600,700" id="idzp" />');
	}

	run(cb) {

		if (this.error === true || !this.isMJML3()) return cb(this.error);

		this.removeContainerTag(this.$mjml);
		this.migrateSocialSyntax();
		this.fixButtonText();
		this.fixImage();
		this.addStyle();
		this.replaceImage('http://placehold.it/350x250/78c5d6/fff', process.env.REACT_APP_URI + '/assets/images/not-found.png');

		cb(null, this.$MJML[0].outerHTML);
	}
}