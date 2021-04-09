import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import _reduce from 'lodash/reduce';
import swal from 'sweetalert';

import { formSerialize } from '../../Utils';

const discount_type = `<span style="font-size: 14px;font-weight: 500;padding: 4px" id="trait_span_loader"><i class="fa fa-spinner fa-spin"></i> Loading...</span>
						<div><select class="trait_sc" id="trait_shopify_coupon" style="display:none">
						</select> 
						</div>`;

const onReady = function (el, fn) {
	if (el.readyState !== "loading") {
		setTimeout(fn);
	} else {
		el.addEventListener("DOMContentLoaded", fn);
	}
}

export default (editor, options) => {

	const $ = editor.$;
	const { templateId, getDiscount, createDiscount, setLoading } = options;

	let discount_coupons;

	const setCouponValues = (data, selected) => {
		$("#trait_shopify_coupon").show();
		$("#trait_span_loader").hide();
		$('#trait_shopify_coupon').empty();
		$('#trait_shopify_coupon')
			.append($("<option>Choose a discount</option>"))
			.attr("value", 0);

		data && $.each(data, function (value, key) {

			$('#trait_shopify_coupon')
				.append($("<option></option>")
					.attr('selected', value.id == selected ? 'selected' : null)
					.attr("value", value.id)
					.text(value.title));
		});
	};


	const _getDiscount = function () {

		if (!templateId)
			return;

		try {
			let shopify_discount_value = this.target.get('shopify_discount');

			$("#trait_span_loader").show();
			$("#trait_shopify_coupon").hide();

			getDiscount(templateId)
				.then(response => {

					let data = _get(response, 'data.data.discounts');
					let userDiscount = _get(response, 'data.data.discount');

					discount_coupons = data ? data : [];

					userDiscount && this.target.set('shopify_discount', userDiscount.id);

					setCouponValues(data, userDiscount ? userDiscount.id : shopify_discount_value);

				})
				.catch(error => {
					$("#trait_span_loader").hide();
				});
		} catch (error) {
			console.log(error);

		}
	}

	const _createDiscount = function () {
		createDiscountModal.call(this);
	}

	const createDiscountModal = function () {

		let modal = editor.Modal;
		let self = this;

		const el = document.createElement('div');

		el.innerHTML = `
			<div style="padding: 30px"><small id="gjs_crt_cupn_error_container" style="color: red;padding: 10px;display: none;background: #fff1f1;margin-bottom: 10px;border: 1px solid;"></small><form id="gjs_crt_cupn_form" style="font-size:14px !important"><div class="row form-group"><div class="col-md-4"><label for="ds_title" class="">Title</label></div><div class="col-12 col-md-8"><input placeholder="Enter title" name="ds_title" id="ds_title" type="text" class="form-control" value=""><small id="gjs_ds_title_error" style="color: red;"></small></div></div><div class="row form-group"><div class="col-md-4"><label for="ds_type" class="">Discount Type</label></div><div class="col-12 col-md-8"> <select name="ds_type" id="ds_type" class="form-control"><option value="2">Percentage (%)</option><option value="1">Fixed Amount</option><option value="3">Free Shipping</option> </select></div> <small style="color: red;"></small></div><div class="row form-group" id="ds_amount_container"><div class="col-md-4"><label for="ds_amount" class="">Discount Amount</label></div><div class="col-12 col-md-8"><input id="ds_amount" name="ds_amount" placeholder="amount" type="number" class="form-control" value="0"><small id="gjs_ds_amount_error" style="color: red;"></small></div></div><div class="row form-group"><div class="col-md-4"><label for="ds_expire" class="">Expire in (days)</label></div><div class="col-12 col-md-8"><input id="ds_expire" name="ds_expire" placeholder="expire in" type="number" class="form-control" value="0"><small style="color: red;"></small></div></div><div class="row form-group"><div class="col-md-4"><label for="ds_order_above" class="">Applies to order above</label></div><div class="col-12 col-md-8"><input id="ds_order_above" name="ds_order_above" placeholder="applies to order above" type="number" class="form-control" value="0"><small style="color: red;"></small></div></div> <button id="gjs_crt_cpn_btn" type="submit" class="btn btn-primary btn-block btn-sm"> Create Discount</button></form></div>
		`;

		const form = el.querySelector('#gjs_crt_cupn_form');
		const btn = el.querySelector('#gjs_crt_cpn_btn');

		form.addEventListener('submit', function (e) {

			e.preventDefault();
			$("#gjs_crt_cupn_error_container").hide();
			$("#gjs_ds_title_error").hide();
			$("#gjs_ds_amount_error").hide();

			var values = formSerialize(form);
			let has_error = false;

			if (_isEmpty(values.ds_title)) {

				$("#gjs_ds_title_error").html('Enter title');
				$("#gjs_ds_title_error").show();
				has_error = true;
			}

			if (values.ds_type !== '3' && values.ds_amount <= 0) {
				$("#gjs_ds_amount_error").html('Field must be greater than 0.');
				$("#gjs_ds_amount_error").show();
				has_error = true;
			}

			if (has_error)
				return;

			if (values.ds_type === '3')
				delete values.ds_amount;

			btn.innerHTML = "<i class='fa fa-spinner fa-spin'></i> Please wait...";
			btn.setAttribute("disabled", "disabled");

			createDiscount.call(self, values)
				.then(response => {

					let id = _get(response, 'data.data.id');

					window.retainful.shopify_params.discount = {
						discount_id: id
					};

					_getDiscount.call(self);

					editor.store();

					swal("Success!", "Successfully created.", "success");
					editor.Modal.close();
				})
				.catch(error => {
					// swal.close();

					let errorMsg = '';
					let errors = _get(error, 'response.data.data.errors');
					btn.removeAttribute("disabled");
					btn.innerHTML = ' Create Discount';

					if (errors)
						errorMsg = _reduce(errors, (i, error) => {
							i += error.msg + '</br>';
							return i;
						}, '');
					$("#gjs_crt_cupn_error_container").css("display", 'block')
					$("#gjs_crt_cupn_error_container").html(errorMsg);
				});
		});

		const inputEl = el.querySelector('#ds_type');

		inputEl.addEventListener('change', function (e) {

			if (e.target.value === '3')
				$("#ds_amount_container").css({ display: 'none' });
			else {
				$("#ds_amount_container").css({ display: 'flex' });
				$("#gjs_ds_amount_error").css({ display: 'none' });
			}
		});

		modal.setTitle('Create Discount');

		modal.setContent(el);

		editor.Modal.open();
	}

	editor.TraitManager.addType('toggleImageModal', {
		noLabel: true,
		createInput({ trait }) {

			let selected_target = editor.getSelected();
			let src = selected_target.attributes.src;

			const el = document.createElement('div');

			const toggleModal = () => {
				editor.runCommand("open-assets", {
					target: editor.getSelected()
				});
			}

			el.innerHTML = ` 
				<img src="${src}" style="width: 100%;padding: 50px;background: #f9f9f9;" id="gjs_img_preview_logo_rtl"/>
				<span style="padding:5px; display:block;"></span>
				<button type="submit" class="btn btn-primary btn-block btn-sm" id="chg-img-trait-btn">Change</button>
			`;

			const inputType = el.querySelector('#chg-img-trait-btn');
			const imgBox = el.querySelector("#gjs_img_preview_logo_rtl");

			imgBox.addEventListener("click", toggleModal);

			inputType.addEventListener("click", toggleModal);

			return el;
		}
	});

	editor.TraitManager.addType('shopify_discount', {

		createInput() {

			const el = document.createElement('div');
			el.innerHTML = discount_type;

			const fn = () => {

				try {
					let isShopifyCouponBlock = this.target.getAttributes()["cr-shpy-coupon"];
					let shopify_discount_value = this.target.get('shopify_discount');

					if (!discount_coupons && isShopifyCouponBlock) {

						discount_coupons = [];

						_getDiscount.call(this);
					} else {

						setCouponValues(discount_coupons, shopify_discount_value);
						// $("#trait_span_loader").hide();
					}
				} catch (error) {
					console.log(error);

				}
			}

			onReady(el, fn);

			const select = el.querySelector("#trait_shopify_coupon");

			select.addEventListener('change', (event) => {

				this.target.set('shopify_discount', event.target.value);

				if (!window.retainful)
					window.retainful = {};

				window.retainful.shopify_params.discount = {
					discount_id: event.target.selectedOptions[0].value
				};

				editor.store();
			});

			return el;
		}

	});

	editor.TraitManager.addType('refresh', {
		noLabel: true,
		createInput() {

			try {
				var refreshElement = `<span id="refresh_shopify_discount" style="text-align: right;background: transparent;cursor: pointer;">
			<i class="fa fa-refresh" aria-hidden="true"></i> refresh
			</span>`;

				const el = document.createElement('div');
				el.innerHTML = refreshElement;


				const inputEl = el.querySelector('#refresh_shopify_discount');

				inputEl.addEventListener('click', () => {
					_getDiscount.call(this);
				});

				return el;
			} catch (error) {
				console.log(error);

			}
		},
	});

	editor.TraitManager.addType('create_discount_link', {
		noLabel: true,
		createInput() {

			var btn = `<button id="trait_create_discount" class="btn btn-primary btn-sm w-100">Create Discount</button>`;

			const el = document.createElement('div');

			el.innerHTML = btn;

			const inputEl = el.querySelector('#trait_create_discount');

			inputEl.addEventListener('click', () => _createDiscount.call(this));

			return el;
		}
	});

	editor.TraitManager.addType('label', {
		noLabel: true,
		createInput({ trait }) {
			var refreshElement = `<span id="refresh_shopify_discount" style="text-align: right;background: transparent;cursor: pointer;">
			<i class="fa fa-refresh" aria-hidden="true"></i> refresh
			</span>`;

			const el = document.createElement('div');
			el.innerHTML = refreshElement;


			let input = $(`<span>${trait.attributes.text}</span>`);
			return input.get(0);
		}
	});

	editor.TraitManager.addType('info', {

		createInput({ trait }) {			
			let html = _get(trait, 'attributes.html');
			var input = $(html ? html : '<div>');
			return input.get(0);
		},
	});

	editor.TraitManager.addType('button_text', {

		createInput({ component }) {
			var input = `<input type="text" id="trait_btn_txt"/>`;
			const el = document.createElement('div');

			el.innerHTML = input;

			const inputEl = el.querySelector('#trait_btn_txt');
			let content = '';
			const $el = $(component.view.el);
			const $a = $el.find('a');

			try {
				const a = $a.html();
				content = a ? a : $el.find('span').html();

			} catch (error) {

			}
			let value = content ? content : this.target.get('content');

			inputEl.value = value;

			this.target.set('content', value);

			inputEl.addEventListener('keyup', event => {
				this.target.set('content', event.target.value);
			})

			return el;
		},
	});

	editor.TraitManager.addType('woocommerceCoupon', {

		createInput() {

			var btn = `<input placeholder="Coupon Code" id="trait_wcom_coupon">`;

			const el = document.createElement('div');
			el.innerHTML = btn;

			const inputEl = el.querySelector('#trait_wcom_coupon');
			inputEl.value = _get(window, 'retainful.woocommerce.coupon') || '';
			// inputEl.value = this.target.get('woocommerceCoupon');

			inputEl.addEventListener('blur', (event) => {

				this.target.set('woocommerceCoupon', event.target.value);

				window.retainful.woocommerce = {
					coupon: event.target.value
				};

				editor.store();
			});


			return el;

		}

	});
}
