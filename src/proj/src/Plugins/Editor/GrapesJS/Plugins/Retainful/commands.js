export default (editor, opt = {}) => {
	var cmd = editor.Commands;

	cmd.add('undo', {
		run: function (e, sender) {
			// sender.set('active', 0);
			e.UndoManager.undo();
		}
	});

	cmd.add('redo', {
		run: function (e, sender) {
			// sender.set('active', 0);
			e.UndoManager.redo();
		}
	});

	cmd.add('clean-all', {

		run: function (e, sender) {
			try {

				editor.DomComponents.clear();
				setTimeout(_ => {
					localStorage.removeItem('gjs-assets');
					localStorage.removeItem('gjs-components');
					localStorage.removeItem('gjs-css');
					localStorage.removeItem('gjs-html');
					localStorage.removeItem('gjs-styles');
				}, 0);

				editor.addComponents(`<mjml>
										<mj-head>
										<mj-style>
											@media (max-width: 480px){ .line-item-list div { width: 100% !important; text-align:center !important; } .line-item-list table { width: 100% !important; overflow: auto !important; } }
										</mj-style>
										<mj-font name="Lato" href="https://fonts.googleapis.com/css?family=Lato:400,700" id="ir54" />
										<mj-font name="Oswald" href="https://fonts.googleapis.com/css?family=Oswald:500,600,700" id="idzp" />
										</mj-head>
										<mj-body></mj-body>
									</mjml>`);

				if (window.retainful)
					window.retainful.shopify = {};
			} catch (error) {
			}
		}
	});
};