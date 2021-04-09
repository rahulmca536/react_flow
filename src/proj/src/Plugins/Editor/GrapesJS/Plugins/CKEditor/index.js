import grapesjs from 'grapesjs';
import $ from 'jquery';
import _isUndefined from 'lodash/isUndefined';
import uniq from 'lodash/uniq';

const stopPropagation = e => e.stopPropagation();

export default grapesjs.plugins.add('gjs-plugin-ckeditor', (editor, opts = {}) => { 
    
    let c = opts;

    let defaults = {
        // CKEditor options
        options: {},

        // On which side of the element to position the toolbar
        // Available options: 'left|center|right'
        position: 'left',
    };

    // Load defaults
    for (let name in defaults) {
        if (!(name in c))
            c[name] = defaults[name];
    }
    var CKEDITOR = window.CKEDITOR;

    if (!CKEDITOR) {
        throw new Error('CKEDITOR instance not found');
    }

    editor.setCustomRte({

        enable(el, rte) {
             
            if($(el).closest('tr').attr('cr-editable'))
            {
                let rteToolbar = editor.RichTextEditor.getToolbarEl();
                [].forEach.call(rteToolbar.children, (child) => {
                    child.style.display = 'none';
                });
                el.contentEditable = false;
                return ;
            }
            if (rte !== undefined) { 
                if (!($(el).hasClass('cke_editable_inline'))) { 
                    rte.destroy();
                    rte = undefined;
                }
            }

            function addPlugin(plgName, opt) {
                if (opt.extraPlugins) {
                    if (typeof opt.extraPlugins === 'string')
                        opt.extraPlugins += ',' + plgName;
                    else
                        opt.extraPlugins.push(plgName);
                } else {
                    opt.extraPlugins = plgName;
                }

                opt.extraPlugins = uniq(opt.extraPlugins);
            }

            // If already exists I'll just focus on it
            if (rte && rte.status !== 'destroyed') { 
                $(".cke_loader").hide();
                this.focus(el, rte);
                return rte;
            } 

            el.contentEditable = true;

            // Seems like 'sharedspace' plugin doesn't work exactly as expected
            // so will help hiding other toolbars already created
            let rteToolbar = editor.RichTextEditor.getToolbarEl();
            [].forEach.call(rteToolbar.children, (child) => {
                child.style.display = 'none';
            });

            // Check for the mandatory options
            var opt = c.options; 
            
            addPlugin('sharedspace', opt);
            
            if(!_isUndefined(opt.shortcode) && !_isUndefined(opt.shortcode.value) && opt.shortcode.value.length !== 0)
                addPlugin('shortcode', opt);

            if (!c.options.sharedSpaces) {
                c.options.sharedSpaces = { top: rteToolbar };
            }
            
            $(rteToolbar).append(`<div class="cke_loader" style="color:#fdfdfd;font-size:13px;background:#030829;padding:10px;border-radius:5px;text-align:center;margin:auto">Loading please wait...</div>`);

            // Init CkEditors 
            rte = CKEDITOR.inline(el, c.options);  
            // Make click event propogate
            rte.on('contentDom', () => { 
                let $el = editor.$(el);
                
                let tableRow = $el.closest('[data-gjs-type=mj-text]'); 
                if(tableRow.length){
                    let contenteditable = $el.attr('contenteditable');
                    let elClasses = $el.attr('class');
    
                    $el.removeAttr('contenteditable');
                    $el.removeAttr('class');
    
                    tableRow.addClass(elClasses);
                    tableRow.attr('contenteditable', contenteditable);
                } 
               
                var editable = rte.editable();
                editable.attachListener(editable, 'click', () => { 
                    el.click();
                });
            });
            
            // The toolbar is not immediatly loaded so will be wrong positioned.
            // With this trick we trigger an event which updates the toolbar position
            rte.on('instanceReady', e => {    
                var toolbar = rteToolbar.querySelector('#cke_' + rte.name); 
                if (toolbar) { 
                    $(".cke_loader").hide();
                    toolbar.style.display = 'block';
                }
                editor.trigger('canvasScroll')
            });

            // Prevent blur when some of CKEditor's element is clicked
            rte.on('dialogShow', e => {
                const editorEls = grapesjs.$('.cke_dialog_background_cover, .cke_dialog');

                ['off', 'on'].forEach(m => editorEls[m]('mousedown', stopPropagation));
            });

            this.focus(el, rte);
 
            return rte;
        },

        disable(el, rte) {  
            el.contentEditable = false;
            if (rte && rte.focusManager)
                rte.focusManager.blur(true);
        },

        focus(el, rte) { 
            // Do nothing if already focused
            if (rte && rte.focusManager.hasFocus) {
                return;
            }
            el.contentEditable = true;
            rte && rte.focus();
        },
    });

    // Update RTE toolbar position
    editor.on('rteToolbarPosUpdate', (pos) => {
        // Update by position
        switch (c.position) {
            case 'center':
                let diff = (pos.elementWidth / 2) - (pos.targetWidth / 2);
                pos.left = pos.elementLeft + diff;
                break;
            case 'right':
                let width = pos.targetWidth;
                pos.left = pos.elementLeft + pos.elementWidth - width;
                break;
            default:
                break;
        }

        if (pos.top <= pos.canvasTop) {
            pos.top = pos.elementTop + pos.elementHeight;
        }

        // Check if not outside of the canvas
        if (pos.left < pos.canvasLeft) {
            pos.left = pos.canvasLeft;
        }
    });

});
