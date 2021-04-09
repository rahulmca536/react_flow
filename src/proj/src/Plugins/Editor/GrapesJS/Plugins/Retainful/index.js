import grapesjs from 'grapesjs';

import loadBlocks from './blocks';
// import loadComponents from './components';
import loadCommands from './commands';
// import loadButtons from './buttons';
import loadStyle from './style';
import loadEvents from './events';
import loadTrait from './trait'

export default grapesjs.plugins.add('retainful', (editor, opt) => {

	const opts = {
		editor,
		resetStyleManager: true,
		...opt,
	};

	[
		loadBlocks,
	// 	loadComponents,
		loadCommands,
	// 	loadButtons,
		loadStyle,
		loadEvents,
		loadTrait
	].forEach(module => module(editor, opts));

});