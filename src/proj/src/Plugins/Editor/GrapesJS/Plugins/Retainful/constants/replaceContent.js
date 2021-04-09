export default {

	getReplaceContent: (user) => {
		
		let type = user.editorType; 
		let userType = user.type;

		// let lineItemImageShortCode = (userType === 'woocommerce') ? '{{line.image_url | img_url: 100x100, scale: 2}}' : '{{line | img_url: 100x100, scale: 2}}';
		let checkout_url_with_coupon_code = type === 'acart' ? '{{abandoned_checkout_url_with_coupon_code}}' : '{{retainful_shop_url_with_coupon_code}}';
		let coupon = type === 'acart' ? ((userType === 'woocommerce') ? '<%= discountcode %>' : '{{retainful_coupon}}') : '{{retainful_coupon}}';

		return [
			{
				html: `<table style="height: 74px;" width="329">
						<tbody>
						<tr>
						<td style="width: 156px;">Address:</td>
						<td style="width: 157px;">{{address}}</td>
						</tr>
						</tbody>
						</table>`,
				id: "cr_address"
			},
			{
				html: `
					<div data-cr-id="cr_coupon_shopify" class="cr_sc_cnt">
						<a style="color:inherit" href= "${checkout_url_with_coupon_code}" > ${coupon}</a>
					</div>
				`,
				id: "cr_coupon_shopify"
			},
			{
				html: `
					<div data-cr-id="cr_coupon_woocommerce" class="cr_sc_cnt">
						<a style="color:inherit" href= "${checkout_url_with_coupon_code}" >${coupon}</a>
					</div>
				`,
				id: "cr_coupon_woocommerce"
			},
			{
				html: `{% if billing_address != blank %}
						<p ><strong style="font-family:Arial,Helvetica,sans-serif;font-size:16px !important">BILLING INFORMATION</strong></p>
						<p></br></p>
						<p><span style="font-family:Arial,Helvetica,sans-serif"><strong>{% if billing_address.company != blank %}{{ billing_address.company }}{% endif %}</strong></p>
						<p><span style="font-family:Arial,Helvetica,sans-serif"><strong>{{ billing_address.name }}</strong></p>
						<p><span style="font-family:Arial,Helvetica,sans-serif"><strong>{{ billing_address.address1 }}</strong></p>
						<p><span style="font-family:Arial,Helvetica,sans-serif"><strong>{% if billing_address.address2 != blank %}{{ billing_address.address2 }}{% endif %}</strong></p>
						<p><span style="font-family:Arial,Helvetica,sans-serif"><strong>{{ billing_address.city }}, {% if billing_address.province_code != blank %}{{ billing_address.province_code }}{% else %}{{ billing_address.province }}{% endif %} {{ billing_address.zip
							}}</strong></p>
						<p><span style="font-family:Arial,Helvetica,sans-serif"><strong>{{ billing_address.country }}</strong></p>
						<p><span style="font-family:Arial,Helvetica,sans-serif"><strong>{% if shipping_address.phone != blank %}{{ billing_address.phone }}{% endif %}</strong></p>{% elsif customer != blank and customer.default_address != blank %}
						<p><span style="font-family:Arial,Helvetica,sans-serif"><strong>{% if customer.default_address.company != blank %}{{ customer.default_address.company }}{% endif %}</strong></p>
						<p><span style="font-family:Arial,Helvetica,sans-serif"><strong>{{ customer.default_address.name }}</strong></p>
						<p><span style="font-family:Arial,Helvetica,sans-serif"><strong>{{ customer.default_address.address1 }}</strong></p>
						<p><span style="font-family:Arial,Helvetica,sans-serif"><strong>{% if customer.default_address.address2 != blank %}{{ customer.default_address.address2 }}{% endif %}</strong></p>
						<p><span style="font-family:Arial,Helvetica,sans-serif"><strong>{{ customer.default_address.city }}, {% if customer.default_address.province_code != blank %}{{ customer.default_address.province_code }}{% else %}{{ customer.default_address.province
							}}{% endif %} {{ customer.default_address.zip }}</strong></p>
						<p><span style="font-family:Arial,Helvetica,sans-serif"><strong>{{ customer.default_address.country }}</strong></p>
						<p><span style="font-family:Arial,Helvetica,sans-serif"><strong>{% if customer.default_address.phone != blank %}{{ customer.default_address.phone }}{% endif %}</strong></p>{% endif %}`,
				id: "billing_address"
			},
			{
				html: `{% if shipping_address and shipping_address != '' and shipping_address != nil %}
						<p > <strong style="font-family:Arial,Helvetica,sans-serif;font-size:16px">SHIPPING INFORMATION</strong> 
						</p>
						<p style="font-family:Arial,Helvetica,sans-serif;font-size:16px"><strong><br></strong>
						</p>
						<p><span style="font-family:Arial,Helvetica,sans-serif"><strong>{% if shipping_address.company != blank %}{{ shipping_address.company }}{% endif %}</strong></p>
						<p><span style="font-family:Arial,Helvetica,sans-serif"><strong>{{ shipping_address.name }}</strong></p>
						<p><span style="font-family:Arial,Helvetica,sans-serif"><strong>{{ shipping_address.address1 }}</strong></p>
						<p><span style="font-family:Arial,Helvetica,sans-serif"><strong>{% if shipping_address.address2 != blank %}{{ shipping_address.address2 }}{% endif %}</strong></p>
						<p><span style="font-family:Arial,Helvetica,sans-serif"><strong>{{ shipping_address.city }}, {% if shipping_address.province_code != blank %}{{ shipping_address.province_code }}{% else %}{{ shipping_address.province }}{% endif %} {{ shipping_address.zip}}</strong></p>
						<p><span style="font-family:Arial,Helvetica,sans-serif"><strong>{{ shipping_address.country }}</strong></p>
						<p><span style="font-family:Arial,Helvetica,sans-serif"><strong>{% if shipping_address.phone != blank %}{{ shipping_address.phone }}{% endif %}</strong></p>
						{% endif %}`,
				id: "shipping_address"
			},
			{
				html: `{% if shipping_method.title != blank and requires_shipping and shipping_address %} 
						<p style="font-family:Arial,Helvetica,sans-serif;font-size:16px"><strong>SHIPPING METHOD</strong></p> 
						<p><span style="font-family:Arial,Helvetica,sans-serif"><strong>{{ shipping_method.title }}</strong></span></p>
						{% endif %}`,
				id: "shipping_method"
			},
			{
				html: `<table style="min-width:100%;" cellpadding="0" cellspacing="0" width="100%">
						<tr>
							<td style="font-weight:bold;color:#11142D;font-family:Arial,Helvetica,sans-serif;text-align:left;font-style:inherit;text-transform:uppercase;letter-spacing:1px;font-size:16px;word-wrap:break-word;vertical-align:top;padding-bottom:1px;min-width:50%;"
							width="50%">Subtotal</td>
							<td style="font-weight:normal;color:#11142D;font-family:Arial,Helvetica,sans-serif;text-align:right;font-style:inherit;letter-spacing:0px;font-size:16px;word-wrap:break-word;vertical-align:top;padding-bottom:1px;min-width:50%;"
							width="50%">{{ currency.symbol }}{{ woocommerce_totals.subtotal_price }}</td>
						</tr>
						</table>
						
						{% if woocommerce_totals.total_discounts != 0 %}
						<table style="min-width:100%;" cellpadding="0" cellspacing="0" width="100%">
							<tr>
							<td style="font-weight:bold;color:#11142D;font-family:Arial,Helvetica,sans-serif;text-align:left;font-style:inherit;text-transform:uppercase;letter-spacing:1px;font-size:16px;word-wrap:break-word;vertical-align:top;padding-bottom:1px;min-width:50%;"
							width="50%">Discounts</td>
							<td style="font-weight:normal;color:#11142D;font-family:Arial,Helvetica,sans-serif;text-align:right;font-style:inherit;letter-spacing:0px;font-size:16px;word-wrap:break-word;vertical-align:top;padding-bottom:1px;min-width:50%;"
							width="50%">{{ currency.symbol }}{{ woocommerce_totals.total_discounts }}</td>
							</tr>
						</table>
						{% endif %}
						
						{% if woocommerce_totals.total_tax != 0 %}
						<table style="min-width:100%;" cellpadding="0" cellspacing="0" width="100%">
							<tr>
							<td style="font-weight:bold;color:#11142D;font-family:Arial,Helvetica,sans-serif;text-align:left;font-style:inherit;text-transform:uppercase;letter-spacing:1px;font-size:16px;word-wrap:break-word;vertical-align:top;padding-bottom:1px;min-width:50%;"
							width="50%">Tax</td>
							<td style="font-weight:normal;color:#11142D;font-family:Arial,Helvetica,sans-serif;text-align:right;font-style:inherit;letter-spacing:0px;font-size:16px;word-wrap:break-word;vertical-align:top;padding-bottom:1px;min-width:50%;"
							width="50%">{{ currency.symbol }}{{ woocommerce_totals.total_tax }}</td>
							</tr>
						</table>
						{% endif %}
						
						
						{% if woocommerce_totals.total_shipping != 0 %}
						<table style="min-width:100%;" cellpadding="0" cellspacing="0" width="100%">
							<tr>
							<td style="font-weight:bold;color:#11142D;font-family:Arial,Helvetica,sans-serif;text-align:left;font-style:inherit;text-transform:uppercase;letter-spacing:1px;font-size:16px;word-wrap:break-word;vertical-align:top;padding-bottom:1px;min-width:50%;"
							width="50%">Shipping</td>
							<td style="font-weight:normal;color:#11142D;font-family:Arial,Helvetica,sans-serif;text-align:right;font-style:inherit;letter-spacing:0px;font-size:16px;word-wrap:break-word;vertical-align:top;padding-bottom:1px;min-width:50%;"
							width="50%">{{ currency.symbol }}{{ woocommerce_totals.total_shipping }}</td>
							</tr>
						</table>
						{% endif %}
						
						{% for fee_item in fee_items %}
						<table style="min-width:100%;" cellpadding="0" cellspacing="0" width="100%">
							<tr>
								<td style="font-weight:bold;color:#11142D;font-family:Arial,Helvetica,sans-serif;text-align:left;font-style:inherit;text-transform:uppercase;letter-spacing:1px;font-size:16px;word-wrap:break-word;vertical-align:top;padding-bottom:1px;min-width:50%;"
								width="50%">{{ fee_item.title }}</td>
								<td style="font-weight:normal;color:#11142D;font-family:Arial,Helvetica,sans-serif;text-align:right;font-style:inherit;letter-spacing:0px;font-size:16px;word-wrap:break-word;vertical-align:top;padding-bottom:1px;min-width:50%;"
								width="50%">{{ currency.symbol }}{{ fee_item.value }}</td>
							</tr>
						</table>
						{% endfor %}
						
						<table style="min-width:100%;" cellpadding="0" cellspacing="0" width="100%">
							<tr>
								<td style="font-weight:bold;color:#11142D;font-family:Arial,Helvetica,sans-serif;text-align:left;font-style:inherit;text-transform:uppercase;letter-spacing:1px;font-size:16px;word-wrap:break-word;vertical-align:top;padding-bottom:1px;min-width:50%;"
								width="50%">Total</td>
								<td style="font-weight:normal;color:#11142D;font-family:Arial,Helvetica,sans-serif;text-align:right;font-style:inherit;letter-spacing:0px;font-size:16px;word-wrap:break-word;vertical-align:top;padding-bottom:1px;min-width:50%;"
								width="50%">{{ currency.symbol }}{{ woocommerce_totals.total_price }}</td>
							</tr>
							</table> `,
				id: "totals_woocommerce"
			},
			{
				html: `
						{% for discount in discounts %}
						<table style="min-width:100%;" cellpadding="0" cellspacing="0" width="100%">
							<tr>
								<td style="font-weight:bold;color:#11142D;font-family:Arial,Helvetica,sans-serif;text-align:left;font-style:inherit;text-transform:uppercase;letter-spacing:1px;font-size:16px;word-wrap:break-word;vertical-align:top;padding-bottom:1px;min-width:50%;"
								width="50%">Discount {% if discount.code != 'Discount' %}{{ discount.code }}{% endif %}</td>
								<td style="font-weight:normal;color:#11142D;font-family:Arial,Helvetica,sans-serif;text-align:right;font-style:inherit;letter-spacing:0px;font-size:16px;word-wrap:break-word;vertical-align:top;padding-bottom:1px;min-width:50%;"
								width="50%">{{ discounts_savings | money }}</td>
							</tr>
						</table>
						{% endfor %}
						
						<table style="min-width:100%;" cellpadding="0" cellspacing="0" width="100%">
						<tr>
							<td style="font-weight:bold;color:#11142D;font-family:Arial,Helvetica,sans-serif;text-align:left;font-style:inherit;text-transform:uppercase;letter-spacing:1px;font-size:16px;word-wrap:break-word;vertical-align:top;padding-bottom:1px;min-width:50%;"
							width="50%">Subtotal</td>
							<td style="font-weight:normal;color:#11142D;font-family:Arial,Helvetica,sans-serif;text-align:right;font-style:inherit;letter-spacing:0px;font-size:16px;word-wrap:break-word;vertical-align:top;padding-bottom:1px;min-width:50%;"
							width="50%">{{ subtotal_price | money }}</td>
						</tr>
						</table>
					
						{% for sline in shipping_lines %} 
						<table style="min-width:100%;" cellpadding="0" cellspacing="0" width="100%">
							<tr>
								<td style="font-weight:bold;color:#11142D;font-family:Arial,Helvetica,sans-serif;text-align:left;font-style:inherit;text-transform:uppercase;letter-spacing:1px;font-size:16px;word-wrap:break-word;vertical-align:top;padding-bottom:1px;min-width:50%;"
								width="50%">{{ sline.title }}</td>
								<td style="font-weight:normal;color:#11142D;font-family:Arial,Helvetica,sans-serif;text-align:right;font-style:inherit;letter-spacing:0px;font-size:16px;word-wrap:break-word;vertical-align:top;padding-bottom:1px;min-width:50%;"
								width="50%">{{ sline.price | money }}</td>
							</tr>
						</table>
						{% endfor %}
						
						{% if total_tip and total_tip > 0 %}
						<table style="min-width:100%;" cellpadding="0" cellspacing="0" width="100%">
							<tr>
								<td style="font-weight:bold;color:#11142D;font-family:Arial,Helvetica,sans-serif;text-align:left;font-style:inherit;text-transform:uppercase;letter-spacing:1px;font-size:16px;word-wrap:break-word;vertical-align:top;padding-bottom:1px;min-width:50%;"
								width="50%">Tax</td>
								<td style="font-weight:normal;color:#11142D;font-family:Arial,Helvetica,sans-serif;text-align:right;font-style:inherit;letter-spacing:0px;font-size:16px;word-wrap:break-word;vertical-align:top;padding-bottom:1px;min-width:50%;"
								width="50%">{{ total_tip | money }}</td>
							</tr>
						</table>
						{% endif %}
					
						{% for line in tax_lines %} 
						<table style="min-width:100%;" cellpadding="0" cellspacing="0" width="100%">
							<tr>
								<td style="font-weight:bold;color:#11142D;font-family:Arial,Helvetica,sans-serif;text-align:left;font-style:inherit;text-transform:uppercase;letter-spacing:1px;font-size:16px;word-wrap:break-word;vertical-align:top;padding-bottom:1px;min-width:50%;"
								width="50%">{{ line.title }}</td>
								<td style="font-weight:normal;color:#11142D;font-family:Arial,Helvetica,sans-serif;text-align:right;font-style:inherit;letter-spacing:0px;font-size:16px;word-wrap:break-word;vertical-align:top;padding-bottom:1px;min-width:50%;"
								width="50%">{{ line.price | money }}</td>
							</tr>
						</table>
						{% endfor %}
					
						{% assign transaction_size = 0 %}{% for transaction in transactions %}{% unless transaction.kind == 'capture' or transaction.kind == 'void' %}{% assign transaction_size = transaction_size
						| plus: 1 %}{% endunless %}{% endfor %}{% if transaction_size > 1 %}{% for transaction in transactions %}{% if transaction.status == 'success' and transaction.kind == 'authorization' or transaction.kind
						== 'sale' %}{% if transaction.payment_details.credit_card_company %}{% capture transaction_name %}{{ transaction.payment_details.credit_card_company }} (ending in {{ transaction.payment_details.credit_card_last_four_digits
						}}){% endcapture %}{% else %}{% capture transaction_name %}{{ transaction.gateway | replace: '_', ' ' | capitalize }}{% endcapture %}{% endif %}
						<table style="min-width:100%;" cellpadding="0" cellspacing="0" width="100%">
							<tr>
								<td style="font-weight:bold;color:#11142D;font-family:Arial,Helvetica,sans-serif;text-align:left;font-style:inherit;text-transform:uppercase;letter-spacing:1px;font-size:16px;word-wrap:break-word;vertical-align:top;padding-bottom:1px;min-width:50%;"
								width="50%">{{transaction_name}}</td>
								<td style="font-weight:normal;color:#11142D;font-family:Arial,Helvetica,sans-serif;text-align:right;font-style:inherit;letter-spacing:0px;font-size:16px;word-wrap:break-word;vertical-align:top;padding-bottom:1px;min-width:50%;"
								width="50%">{{ transaction.amount | money }}</td>
							</tr>
						</table>
						{% endif %}{% endfor %}{% endif %}
						<table style="min-width:100%;" cellpadding="0" cellspacing="0" width="100%">
						<tbody>
							<tr>
								<td style="vertical-align:top;text-align:left;" width="50%">
									<h2 style="margin:0px;font-weight:bold;color:#11142D;font-family:Arial,Helvetica,sans-serif;text-align:inherit;font-style:inherit;text-transform:uppercase;letter-spacing:1px;font-size:18px;word-wrap:break-word;vertical-align:top;padding:10px 0;text-align:left;border-top:1px solid gray;">Total</h2>
								</td>
								<td style="vertical-align:top;text-align:right;" width="50%">
									<h2 style="margin:0px;font-weight:bold;color:#11142D;font-family:Arial,Helvetica,sans-serif;text-align:inherit;font-style:inherit;text-transform:uppercase;letter-spacing:1px;font-size:18px;word-wrap:break-word;vertical-align:top;padding:10px 0;text-align:left;border-top:1px solid gray; text-align:right">{{ total_price | money_with_currency }}</h2>
								</td>
							</tr>
						</tbody>
					</table> `,
				id: "totals"
			},
			{
				html: ` <p style="font-family:Arial,Helvetica,sans-serif;font-size:16px"><strong>PAYMENT METHOD</strong> <p style="margin-top:0px;margin-bottom:1px;font-weight:normal;color:#11142D;font-family:Arial,Helvetica,sans-serif;text-align:inherit;font-style:inherit;letter-spacing:0px;font-size:16px;word-wrap:break-word;">
						{% for transaction in transactions %}{% if transaction.status == 'success' or transaction.status == 'pending' %}{% if transaction.kind == 'authorization' or transaction.kind == 'sale'
						%}{% if transaction.payment_details.credit_card_company %}{% capture credit_card_url %}notifications/{{ transaction.payment_details.credit_card_company | downcase | replace: '
						', '_' }}.png{% endcapture %}{%else %}{% capture credit_card_url %}{% endcapture %}{%endif%}{% if credit_card_url == '' %}{{ transaction.gateway | replace: '_', ' ' | capitalize
						}} — <strong>{{ transaction.amount | money }}</strong>{% else %}
						<img class="customer-info__item-credit" style="vertical-align: middle;padding-right: 5px;width: 50px" src="{{ credit_card_url | shopify_asset_url }}"
						/><span>Ending in {{ transaction.payment_details.credit_card_last_four_digits }} — <strong>{{ total_price | money }}</strong></span>{%endif%}{%endif%}{%endif%}{% endfor %}</p>`,
				id: "payment_method"
			},
			{
				html: `{% for line in line_items %}{% capture product_attributes %}{% for p in line.properties %}{% unless p.last==blank or p.first contains '_options' %}<br/>{{p.first}}:{{p.last}}{% endunless %}{% endfor %}{% endcapture %}
							<div style="margin:0px auto;max-width:auto;" class="line-item-list">
							<table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%; border-bottom: 1px solid #e5e5e5" align="center" border="0">
								<tbody>
									<tr>
										<td style="padding: 10px 10px;width:20%">
											<img height="auto" width="100" src="{{line.image_url | img_url: 100x100, scale: 2}}" style="max-height:125px; max-height: 125px;border:0" />
										</td>
										<td>
											<span style="white-space:normal;line-height:24px;padding-left:0px;font-family: Lato,Helvetica,sans-serif;font-size: 14px;font-weight: bold;font-style: normal;font-stretch: normal;text-decoration: none;word-spacing: 0.2em;display: block;">{{ line.title }} x {{ line.quantity }} {{ product_attributes }}</span>
										</td>
										<td style="padding-right:10px;text-align:right; width: 20%">
											<span style="white-space:normal;line-height:24px;padding-left:0px;padding-right:15px;font-family: Lato,Helvetica,sans-serif;font-size: 14px;font-weight: bold;font-style: normal;font-stretch: normal;text-decoration: none;word-spacing: 0.2em;display: block;white-space:nowrap;text-align:right">{{ line.line_price | money }}</span>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					{% endfor %}`,
				id: "line_item"
			},
			{
				html: `{% for line in line_items %}{% capture product_attributes %}{% for p in line.properties %}{% unless p.last==blank or p.first contains '_options' %}<br/>{{p.first}}:{{p.last}}{% endunless %}{% endfor %}{% endcapture %}
				<div style="margin:0px auto;max-width:auto;" >
				<table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
				style="background:#ffffff;background-color:#ffffff;width:100%;font-family:inherit">
				<tbody>
					<tr>
						<td style="direction:ltr;padding:20px 0;text-align:center;font-family:inherit">
							<!--[if mso | IE]>                  <table role="presentation" border="0" cellpadding="0" cellspacing="0">                        <tr>                  <td               class="" style="vertical-align:top;width:600px;"            >          <![endif]-->
							<div class="mj-column-per-100 outlook-group-fix"
								style="text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
								<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="font-family:inherit"
									style="vertical-align:top;" width="100%">
									<tbody>
										<tr>
											<td align="center"
												style="padding:10px 25px;word-break:break-word;font-family:inherit">
												<table border="0" cellpadding="0" cellspacing="0" role="presentation"
													style="border-collapse:collapse;border-spacing:0px;font-family:inherit">
													<tbody>
														<tr>
															<td style="width:100%;text-align:center;font-family:inherit"> <img height="auto"
																	src="{{line.image_url | img_url: 100x100, scale: 2}}"
																	style="border:0;display:block;outline:none;text-decoration:none;font-size:13px;height:200px"
																	height="200"> </td>
														</tr>
													</tbody>
												</table>
											</td>
										</tr>
										<tr>
											<td align="center"
												style="padding:10px 25px;padding-top:0;padding-right:10px;padding-bottom:0;padding-left:10px;word-break:break-word;font-family:inherit">
												<div
													style="line-height:1;text-align:center;font-family:inherit">
													<p>{{ line.title }} x {{ line.quantity }} {{ product_attributes }}</p>
												</div>
											</td>
										</tr>
										<tr>
											<td align="center"
												style="padding:0px 25px;padding-top:0;padding-right:10px;padding-bottom:0;padding-left:10px;word-break:break-word;font-family:inherit">
												<div
													style="line-height:1;text-align:center;">
													<p style="margin:0">{{ line.line_price | money }}</p>
												</div>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
							<!--[if mso | IE]>            </td>                  </tr>                        </table>                <![endif]-->
						</td>
					</tr>
				</tbody>
			</table>
			</div>
		{% endfor %}`,
				id: "line_item_vertical"
			}
		];

	}

}