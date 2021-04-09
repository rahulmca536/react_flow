export default (editor, config = {}) => {
  editor.on('load', function () {

    let blockManager = editor.BlockManager;
    const sections = {
      category: 'Section',
    }
    const elements = {
      category: 'Elements',
    }

    blockManager.add('mj-1-column', {
      label: '1 Column',
      content: `<mj-section background-color="#ffffff">
      <mj-column><mj-text padding-top="0%" padding-bottom="0%">
      <p>Content 1</p></mj-text></mj-column>
		  </mj-section>`,
      attributes: { class: 'gjs-fonts gjs-f-b1' },
      ...sections,
    });

    blockManager.add('mj-2-columns', {
      label: '2 Columns',
      content: `<mj-section background-color="#ffffff">
			<mj-column><mj-text padding-top="0%" padding-bottom="0%"><p>Content 1</p></mj-text></mj-column>
			<mj-column><mj-text padding-top="0%" padding-bottom="0%"><p>Content 2</p></mj-text></mj-column>
		  </mj-section>`,
      attributes: { class: 'gjs-fonts gjs-f-b2' },
      ...sections,
    });

    blockManager.add('mj-3-columns', {
      label: '3 Columns',
      content: `<mj-section background-color="#ffffff">
              <mj-column>
              <mj-text padding-top="0%" padding-bottom="0%">
                <p>Content 1</p>
              </mj-text>
            </mj-column>
            <mj-column>
              <mj-text padding-top="0%" padding-bottom="0%">
                <p>Content 2</p>
              </mj-text>
            </mj-column>
            <mj-column>
              <mj-text padding-top="0%" padding-bottom="0%">
                <p>Content 3</p>
              </mj-text>
            </mj-column>
		  </mj-section>`,
      attributes: { class: 'gjs-fonts gjs-f-b3' },
      ...sections,
    });

    blockManager.add('mj-image', {
      label: 'Image',
      content: `<mj-image padding="0" src="${process.env.REACT_APP_URI+'/assets/images/not-found.png'}" alt=""> </mj-image>`,
      attributes: { class: 'fa fa-image' },
      ...elements,
    });

    //Adding extra columns
    blockManager.add('mj-3/7-columns', {
      label: '2 Columns (3/7)',
      content: `<mj-section background-color="#ffffff">
              <mj-column width="30%"><mj-text style="padding-top: 0% ; padding-bottom: 0% "><p>Content 1</p></mj-text></mj-column>
              <mj-column width="70%"><mj-text style="padding-top: 0% ; padding-bottom: 0% "><p>Content 2</p></mj-text></mj-column>
            </mj-section>`,
      attributes: { class: 'gjs-fonts gjs-block gjs-f-b37' },
      ...sections
    });
    blockManager.add('mj-7/3-columns', {
      label: `<svg style="padding-top:11px" id="svgcontent" width="44.999990279997895" height="34.999992439998366" x="825.000004860001" y="272.50000378000084" overflow="hidden" xmlns="http://www.w3.org/2000/svg" xmlns:se="http://svg-edit.googlecode.com" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 45 35"><g style="pointer-events:none"><g id="canvasGrid" width="100%" height="100%" x="0" y="0" overflow="visible" display="none"><rect width="100%" height="100%" x="0" y="0" stroke-width="0" fill="url(#gridpattern)" style="pointer-events: none; display:visible;"></rect></g></g><g style="pointer-events:all"><rect fill="#fff" stroke-width="2" x="1" y="1.0000000596046448" width="24.50000025693213" height="33" id="svg_2" stroke-dasharray="none" opacity="0.9500000000000001" rx="0" stroke="#555"></rect><rect fill="#fff" stroke-width="2" x="32.50003508516447" y="1.0000000596046448" width="10.999998929114973" height="33" id="svg_4" stroke-dasharray="none" opacity="0.9500000000000001" rx="0" stroke="#555"></rect></g></svg><div class="gjs-block-label" style="padding-top: 10px">2 Columns(7/3)</div>`,
      content: `<mj-section background-color="#ffffff">
              <mj-column width="70%"><mj-text style="padding-top: 0% ; padding-bottom: 0% "><p>Content 1</p></mj-text></mj-column>
              <mj-column width="30%"><mj-text style="padding-top: 0% ; padding-bottom: 0% "><p>Content 2</p></mj-text></mj-column>
            </mj-section>`,
      attributes: { class: 'gjs-fonts gjs-block gjs-f-b73' },
      ...sections
    });
    blockManager.add('mj-4-columns', {
      label: `<svg style="padding-top:11px"id="svgcontent" width="57.991405777149154" height="34.99481383103828" x="818.5042971114254" y="272.50259308448085" overflow="hidden" xmlns="http://www.w3.org/2000/svg" xmlns:se="http://svg-edit.googlecode.com" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 58 35"><g style="pointer-events:none"><g id="canvasGrid" width="100%" height="100%" x="0" y="0" overflow="visible" display="none"><rect width="100%" height="100%" x="0" y="0" stroke-width="0" fill="url(#gridpattern)" style="pointer-events: none; display:visible;"></rect></g></g><g style="pointer-events:all"><rect fill="#fff" stroke="#555" stroke-width="2" x="1" y="1.0847488045692444" width="10" height="33" id="svg_2" stroke-dasharray="none" opacity="0.9500000000000001" rx="0"></rect><rect fill="#fff" stroke="#555" stroke-width="2" x="16.000016450881958" y="1.0847488045692444" width="10" height="33" id="svg_3" stroke-dasharray="none" opacity="0.9500000000000001" rx="0"></rect><rect fill="#fff" stroke="#555" stroke-width="2" x="31.00003457069397" y="1.0847488045692444" width="10" height="33" id="svg_4" stroke-dasharray="none" opacity="0.9500000000000001" rx="0"></rect><rect fill="#fff" stroke="#555" stroke-width="2" x="46.50004988908768" y="1.0847488045692444" width="10" height="33" id="svg_1" stroke-dasharray="none" opacity="0.9500000000000001" rx="0" transform="rotate(-1 51.500064849853636,17.584749221801612) "></rect></g></svg> <div class="gjs-block-label" style="padding-top: 10px">4 Columns</div> `,
      content: `<mj-section background-color="#ffffff">
              <mj-column><mj-text style="padding-top: 0% ; padding-bottom: 0% "><p>Content 1</p></mj-text></mj-column>
              <mj-column><mj-text style="padding-top: 0% ; padding-bottom: 0% "><p>Content 2</p></mj-text></mj-column>
              <mj-column><mj-text style="padding-top: 0% ; padding-bottom: 0% "><p>Content 3</p></mj-text></mj-column>
              <mj-column><mj-text style="padding-top: 0% ; padding-bottom: 0% "><p>Content 4</p></mj-text></mj-column>
            </mj-section>`,
      attributes: { class: 'gjs-fonts gjs-block' },
      ...sections
    });

    // Render blocks in order
    blockManager.render([
      blockManager.get('mj-1-column'),
      blockManager.get('mj-2-columns'),
      blockManager.get('mj-3/7-columns'),
      blockManager.get('mj-7/3-columns'),
      blockManager.get('mj-3-columns'),
      blockManager.get('mj-4-columns'),
      blockManager.get('mj-text'),
      blockManager.get('mj-button'),
      blockManager.get('mj-image'),
      blockManager.get('mj-divider'),
      blockManager.get('mj-social-group'),
      blockManager.get('mj-social-element'),
      blockManager.get('mj-spacer'),

    ]);
  })
}
