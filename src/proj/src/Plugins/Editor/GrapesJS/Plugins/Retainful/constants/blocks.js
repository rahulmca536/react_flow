let logo = process.env.REACT_APP_URI + '/assets/images/not-found.png';

const storeElements = {
  category: 'Store Element',
}

const commonElements = {
  category: 'Elements',
}


const common_blocks = function (type) {
  let line_item = {
    block: {
      label: "Cart items (Horizontal)",
      content: ` 
    <mj-section background-color="#fff" border-right="1px solid #e5e5e5" border-left="1px solid #e5e5e5" border-bottom="1px solid #e5e5e5" padding-bottom="1" padding-top="1" css-class="hidden-xs" id="i4z9a">
    <mj-column>
      <mj-text padding-top="0%" padding-bottom="0%" id="iydty">
        <p>
          <span style="font-family: Lato, Helvetica, sans-serif; font-size: medium; background-color: rgb(255, 255, 255);">Item</span>
        </p>
      </mj-text>
    </mj-column>
    <mj-column>
      <mj-text padding-top="0%" padding-bottom="0%" align="center" id="iesaj">
        <p>
          <span style="font-family: Lato, Helvetica, sans-serif; font-size: medium; background-color: rgb(255, 255, 255);text-align:center">Description</span>
        </p>
      </mj-text>
    </mj-column>
    <mj-column>
      <mj-text padding-top="0%" padding-bottom="0%" align="center" id="ixvdg">
        <p>
          <span style="background-color:#ffffff; font-family:Lato,Helvetica,sans-serif; font-size:medium;text-align:center">Cost</span>
        </p>
      </mj-text>
    </mj-column>
  </mj-section>
  <mj-section background-color="#FFFFFF" padding-bottom="0" padding-top="0" border-right="1px solid #e5e5e5" border-left="1px solid #e5e5e5"  id="iooa4">
      <mj-column width="100%" id="itxvz">
        <mj-text cr-editable="false" padding-top="0" padding-right="0" padding-bottom="0" padding-left="0" id="i3xn2" css-class="line-item-list">
          <div data-cr-id="line_item" class="cr_sc_cnt">
            <table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%; border-bottom: 1px solid #e5e5e5" align="center" border="0">
              <tbody>
                <tr>
                  <td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:20px 0px;padding-bottom:0px;padding-top:0px;">
                    <div style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:30%;">
                      <table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-spacing:0px;" align="center" border="0">
                        <tbody>
                          <tr>
                            <td style="width:130px;">
                              <img alt="ph" height="auto" src="${process.env
                                .REACT_APP_URI +
                                "/assets/images/not-found.png"}" style="border:none;border-radius:0px;display:block;font-size:13px;outline:none;text-decoration:none;width:100%;height:auto;" width="130">
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:40%;">
                      <table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                        <tbody>
                          <tr>
                            <td style="word-wrap:break-word;font-size:0px;padding:10px 25px;padding-top:0%;padding-bottom:0%;" align="left">
                              <div style="cursor:auto;color:#000000;font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:22px;text-align:left;">
                                <p>
                                  <span style="font-family:Lato,Helvetica,sans-serif;"><strong><span style="font-size:16px">Item Name x Item Quantity</span>
                                    </strong>
                                  </span>
                                </p>
                                <p>
                                  <span style="font-family:Lato,Helvetica,sans-serif;"><span style="font-size:16px">Item Details</span></span>
                                </p>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:30%;">
                      <table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                        <tbody>
                          <tr>
                            <td style="word-wrap:break-word;font-size:0px;padding:10px 25px;padding-top:0%;padding-bottom:0%;" align="right">
                              <div style="cursor:auto;color:#000000;font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:18px;line-height:22px;text-align:right;white-space:nowrap;">
                                <p style="font-family:Lato,Helvetica,sans-serif;">$10.00
                                </p>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </mj-text>
      </mj-column>
    </mj-section>
    <mj-section background-color="#fff" border-right="1px solid #e5e5e5" border-left="1px solid #e5e5e5" padding-top="0"></mj-section>`,
      attributes: { class: "fa fa-th-list" },
      ...storeElements
    }
  };

  let referral_block = {
    block: {
      label: "Referral",
      content: `
      <mj-section background-color="#ffffff"></mj-section
    ><mj-section
      background-color="#ffffff"
      __="1"
      border-top="10px solid #eeeeee"
      border-right="10px solid #eeeeee"
      border-bottom="10px solid #eeeeee"
      border-left="10px solid #eeeeee"
      ><mj-column
        ><mj-image
          padding="0"
          src="https://s3.us-east-2.amazonaws.com/retainful-public/assets/images/1fff11b07345bc7c95138722db935b28/83b440b8-c54c-4d17-b7b5-5a2e3b6169672d65922a4daf3236733ec84697c1cbb4.png"
          id="ivji6"
          toggleimagemodal="undefinedassets/images/1fff11b07345bc7c95138722db935b28/718c03dc-0f7c-43f4-a7c3-3bceed12e7292d65922a4daf3236733ec84697c1cbb4.png"
          toggleImageModal="https://s3.us-east-2.amazonaws.com/retainful-public/assets/images/1fff11b07345bc7c95138722db935b28/83b440b8-c54c-4d17-b7b5-5a2e3b6169672d65922a4daf3236733ec84697c1cbb4.png"
          width="50px"
        ></mj-image>
        <mj-text
          font-family="Arial, Helvetica, sans-serif"
          font-weight="700"
          font-size="16px"
          align="center"
          ><p>Hi{{customer_name}},</p></mj-text
        ><mj-text
          padding-top="0%"
          padding-bottom="0%"
          font-family="Arial, Helvetica, sans-serif"
          font-weight="100"
          font-size="20px"
          align="center"
          line-height="20px"
          ><p>
            <span style="font-size: 20px"
              ><span style="font-family: Arial, Helvetica, sans-serif"
                >Get a <strong>{{advocate_reward.name}}</strong> for each
                referral.</span
              ></span
            >
          </p>
          <p>
            <span style="font-size: 20px"
              ><span style="font-family: Arial, Helvetica, sans-serif"
                >Your friends get <strong>{{friend_reward.name}}</strong
                ><strong>!</strong>.</span
              ></span
            >
          </p></mj-text
        ><mj-button
          font-family="Arial, Helvetica, sans-serif"
          font-weight="700"
          __="1"
          background-color="#ed650f"
          padding-bottom="0"
          border-radius="100px 100px 100px 100px"
          padding-top="2%"
          height="50px"
          width="200px"
          font-size="14px"
          id="iq0jj"
          data-gjs-editable="false"
          >Referral Link</mj-button
        ><mj-text
          align="center"
          text-decoration="underline"
          color="#ed650f"
          __="1"
          font-weight="700"
          padding-top="0"
          padding-bottom="0"
          font-family="Arial, Helvetica, sans-serif"
          ><p>
            <a
              data-cke-saved-href="http://{referral_link}"
              href="http://{referral_link}"
              ><span style="color: #d35400">{referral_link}</span></a
            >
          </p></mj-text
        ></mj-column
      ></mj-section
    ><mj-section background-color="#ffffff"></mj-section>`,
      attributes: { class: "fa fa-th-list" },
      ...storeElements
    }
  };

  let line_item_vertical = {
    block: {
      label: "Cart items (Vertical)",
      content: `
            <mj-section background-color="#ffffff" padding-top="1px" padding-bottom="1px" border-right="1px solid #e5e5e5" border-left="1px solid #e5e5e5">
            <mj-column>
              <mj-text cr-editable="false" padding-top="0" padding-right="0" padding-bottom="0" padding-left="0" >
                <div data-cr-id="line_item_vertical" class="cr_sc_cnt">
                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
                style="background:#ffffff;background-color:#ffffff;width:100%;font-size:inherit;color:inherit;font-weight:inherit;">
                <tbody>
                  <tr>
                    <td style="direction:ltr;padding:20px 0;text-align:center;">
                      <!--[if mso | IE]>                  <table role="presentation" border="0" cellpadding="0" cellspacing="0">                        <tr>                  <td               class="" style="vertical-align:top;width:600px;"            >          <![endif]-->
                      <div class="mj-column-per-100 outlook-group-fix"
                        style="text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                        <table border="0" cellpadding="0" cellspacing="0" role="presentation"
                          style="vertical-align:top;font-size:inherit;color:inherit;font-weight:inherit;" width="100%">
                          <tbody>
                            <tr>
                              <td align="center"
                                style="padding:10px 25px;word-break:break-word;">
                                <table border="0" cellpadding="0" cellspacing="0" role="presentation"
                                  style="border-collapse:collapse;border-spacing:0px;font-size:inherit;color:inherit;font-weight:inherit;">
                                  <tbody>
                                    <tr>
                                      <td style="width:200px;"> <img height="auto"
                                          src="https://retainful-public.s3.us-east-2.amazonaws.com/images/bag.png"
                                          style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;"
                                          width="200"> </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                            <tr>
                              <td align="center"
                                style="padding:0px 25px;padding-top:0;padding-right:10px;padding-bottom:0;padding-left:10px;word-break:break-word;">
                                <div>
                                  <p>Item Name x Item Quantity</p>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td align="center"
                                style="padding:10px 25px;padding-top:0;padding-right:10px;padding-bottom:0;padding-left:10px;word-break:break-word;">
                                <div>
                                  <p style="margin: 0">$70.00</p>
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
              </mj-text>
            </mj-column>
            </mj-section>
      `,
      attributes: { class: "fa fa-th-list" },
      ...storeElements
    }
  };


  let address_block = {
    block: {
      label: "Address",
      content: `<mj-section background-color="#FFFFFF" padding-bottom="0" padding-top="1" border-right="1px solid #e5e5e5" border-left="1px solid #e5e5e5" id="ipkol" css-class=" align-text">
    <mj-column>
      <mj-text font-family="Arial,Helvetica,sans-serif" cr-editable="false" padding-top="0" padding-bottom="0" line-height="8px" font-weight="400" id="i53iq">
        <div data-cr-id="billing_address" class="cr_sc_cnt" style="font-weight:400;font-size:16px;">
          <p>
            <strong style="font-family:Lato,Helvetica,sans-serif;font-size:16px !important">BILLING INFORMATION</strong>
          </p>
          <p>
            <br>
          </p>
          <p style="font-family:Lato,Helvetica,sans-serif;padding-bottom: 5px;color:#777;">
            Billing Name
          </p>
          <p style="font-family:Lato,Helvetica,sans-serif;padding-bottom: 5px;color:#777;">
            Billing Address
          </p>
          <p style="font-family:Lato,Helvetica,sans-serif;padding-bottom: 5px;color:#777;">
            Billing City
          </p>
          <p style="font-family:Lato,Helvetica,sans-serif;padding-bottom: 5px;color:#777;">
            Billing Country
          </p>
          <p style="font-family:Lato,Helvetica,sans-serif;color:#777;">
            Billing Number
          </p>
        </div>
      </mj-text>
    </mj-column>
    <mj-column>
      <mj-text cr-editable="false" padding-top="0%" padding-bottom="0%" align="right" line-height="8px" id="i2s2p">
        <div data-cr-id="shipping_address" class="cr_sc_cnt" style="font-weight:400;font-size:16px;">
          <p>
            <strong style="font-family:Lato,Helvetica,sans-serif;font-size:16px">SHIPPING INFORMATION</strong>
          </p>
          <p style="font-family:Lato,Helvetica,sans-serif;font-size:16px">
            <br>
          </p>
          <p style="font-family:Lato,Helvetica,sans-serif;padding-bottom: 5px;color:#777;">
            Shipping Name
          </p>
          <p style="font-family:Lato,Helvetica,sans-serif;padding-bottom: 5px;color:#777;">
            Shipping Address
          </p>
          <p style="font-family:Lato,Helvetica,sans-serif;padding-bottom: 5px;color:#777;">
            Shipping City
          </p>
          <p style="font-family:Lato,Helvetica,sans-serif;padding-bottom: 5px;color:#777;">
            Shipping Country
          </p>
          <p style="font-family:Lato,Helvetica,sans-serif;padding-bottom: 5px;color:#777;">
            Shipping Number
          </p>
        </div>
      </mj-text>
    </mj-column>
  </mj-section>
  <mj-section background-color="#FFFFFF" id="ii1oeh-6" padding-bottom="40px" padding-top="1" border-bottom="0 solid #e5e5e5" border-right="1px solid #e5e5e5" border-left="1px solid #e5e5e5" font-family="Lato,Helvetica,sans-serif" css-class=" align-text">
  <mj-column width="40%" id="imjxm">
    <mj-text cr-editable="false" padding-top="0%" padding-bottom="0%" line-height="8px" id="iwsnq">
      <div data-cr-id="shipping_method" class="cr_sc_cnt" style="font-weight:400;font-size:16px;">
        <p style="font-family:Lato,Helvetica,sans-serif;font-size:16px;padding-bottom: 5px;">
          <strong>SHIPPING METHOD</strong>
        </p>
        <p style="font-family:Lato,Helvetica,sans-serif;color:#777;">
          Generic Shipping
        </p>
      </div>
    </mj-text>
  </mj-column>
  <mj-column width="60%" id="i8jri">
    <mj-text cr-editable="false" padding-top="0%" padding-bottom="0%" align="right" line-height="8px" id="ij671">
      <p>
      </p>
      <div data-cr-id="payment_method" class="cr_sc_cnt" style="font-weight:400;font-size:16px;">
        <p style="font-family:Lato,Helvetica,sans-serif;font-size:16px;padding-bottom: 5px;">
          <strong>PAYMENT METHOD</strong>
        </p>
        <p style="font-family:Lato,Helvetica,sans-serif;color:#777;">
          Ending in 1234 - $12.00
        </p>
      </div>
    </mj-text>
  </mj-column>
</mj-section>`,
      attributes: { class: "fa fa-address-card" },
      ...storeElements
    }
  };

  let blocks = [];

  if (type === 'acart'){
    blocks.push(line_item);
    blocks.push(line_item_vertical);
  }

  if(type === 'noc')
    blocks.push(referral_block);

  if (type !== 'referral')
    blocks.push(address_block);

  return blocks;
};

const blocks = function (type) {

  let coupon_shop_now_btn = type === 'noc' ? "{{retainful_shop_url_with_coupon_code}}" : "{{abandoned_checkout_url_with_coupon_code}}";
  let coupon_block_content_shopify = type !== 'referral' ? `<mj-section padding-top="0" background-color="#fff" id="iq8f" border-right="1px solid #e5e5e5" border-left="1px solid #e5e5e5">
  <mj-column>
    <mj-text font-weight="400" font-size="28px" align="center" font-family="Lato,Helvetica,sans-serif" id="iof5">
      <p style="font-size: 26px;font-weight: 500;color: #222;margin: 0 0 20px;">
        <strong>Your discount coupon</strong>
      </p>
      <p>
        <span style="font-size:17px;color:#777;">As a way of saying thanks for shopping with us, here is a discount code for 10% off your next purchase within the next two weeks.</span>
        <br>
      </p>
    </mj-text>
    <mj-text cr-editable="false" cr-shpy-coupon="true" coupon-block="true" font-weight="bold" font-size="20px" font-family="Lato, Helvetica, sans-serif" line-height="1.8em" align="center" padding-top="10" padding-bottom="10" id="i7lpl">
      <div data-cr-id="cr_coupon_shopify" class="cr_sc_cnt" >{{retainful_coupon}}
      </div>
    </mj-text>
    <mj-button container-background-color="#ffffff" background-color="#6171e1" data-cr-id="rtl_shop_now" href="{{abandoned_checkout_url_with_coupon_code}}" padding-top="20px" font-family="Lato, Helvetica, sans-serif" line-height="1.8" font-weight="600" font-size="14px" id="ir90o">SHOP NOW!</mj-button>
  </mj-column>
</mj-section>` : 
`<mj-text coupon-block="true" font-weight="bold" font-size="20px"
font-family="Lato, Helvetica, sans-serif" line-height="1.8em" align="center">
<p><a data-cke-saved-href="{{retainful_shop_url_apply_coupon}}"
        href="{{retainful_shop_url_apply_coupon}}">{{referral_coupon}}</a></p>
</mj-text>`;
  let coupon_block_content_woocommerce = type !== 'referral' ? `<mj-section padding-top="0" background-color="#fff" id="iq8f" border-right="1px solid #e5e5e5" border-left="1px solid #e5e5e5">
  <mj-column>
    <mj-text font-weight="400" font-size="28px" align="center" font-family="Lato,Helvetica,sans-serif" id="iof5">
      <p style="font-size: 26px;font-weight: 500;color: #222;margin: 0 0 20px;">
        <strong>Your discount coupon</strong>
      </p>
      <p>
        <span style="font-size:17px;color:#777;">As a way of saying thanks for shopping with us, here is a discount code for 10% off your next purchase within the next two weeks.</span>
        <br>
      </p>
    </mj-text>
    <mj-text cr-editable="false" coupon-block="true" text-decoration="underline" color="#6171e1" font-weight="bold" font-size="20px" font-family="Lato, Helvetica, sans-serif" line-height="1.8em" align="center" padding-top="10" padding-bottom="10" id="i7lpl">
      <div data-cr-id="cr_coupon_woocommerce" class="cr_sc_cnt" >{{retainful_coupon}}
      </div>
    </mj-text>
    <mj-button container-background-color="#ffffff" background-color="#6171e1" data-cr-id="rtl_shop_now" href="${coupon_shop_now_btn}" padding-top="20px" font-family="Lato, Helvetica, sans-serif" line-height="1.8" font-weight="600" font-size="14px">SHOP NOW!</mj-button>
  </mj-column>
</mj-section>` : 
`<mj-text coupon-block="true" font-weight="bold" font-size="20px"
font-family="Lato, Helvetica, sans-serif" line-height="1.8em" align="center">
<p><a data-cke-saved-href="{{retainful_shop_url_apply_coupon}}"
        href="{{retainful_shop_url_apply_coupon}}">{{referral_coupon}}</a></p>
</mj-text>`;                                                          

  return {
    "shopify": [
      {
        block: {
          label: "Logo",
          content: '<mj-image src=' + logo + ' data-cr-id="rtl_store_logo"  data-gjs-editable="false" width="150px" ></mj-image>',
          attributes: { class: "fa fa-image" },
          ...storeElements
        }
      },
      {
        block: {
          label: "Coupon",
          content: coupon_block_content_shopify,
          attributes: { class: "fa fa-percent" },
          ...storeElements
        }
      },
      {
        block: {
          label: "Unsubscribe",
          content: `<mj-section>
          <mj-column width="100%">
          <mj-text padding-top="0%" padding-bottom="0%" align="center" line-height="0" color="#b7b7b7">
            <p>If you don't want to receive any future emails&nbsp;
              <a data-cke-saved-href="{{unsubscribe_shop_customer_url}}" href="{{unsubscribe_shop_customer_url}}">unsubscribe here</a>
            </p>
          </mj-text>
        </mj-column>
        </mj-section>`,
          attributes: { class: "fa fa-ban" },
          ...storeElements
        }
      },
    ],
    'woocommerce': [
      {
        block: {
          label: "Coupon",
          content: coupon_block_content_woocommerce,
          attributes: { class: "fa fa-percent" },
          ...storeElements
        }
      },
      {
        block: {
          label: "Unsubscribe",
          content: `
          <mj-section>
          <mj-column width="100%" id="ir21k">
          <mj-text padding-top="0%" padding-bottom="0%" align="center" line-height="0" color="#b7b7b7" id="ifvti">
            <p>If you don't want to receive any future emails&nbsp;
              <a data-cke-saved-href="{{unsubscribe_shop_customer_url}}" href="{{unsubscribe_shop_customer_url}}">unsubscribe here</a>
            </p>
          </mj-text>
        </mj-column>
        </mj-section>`,
          attributes: { class: "fa fa-ban" },
          ...storeElements
        }
      },
      {
        block: {
          label: "Logo",
          content: `<mj-image src="${process.env.REACT_APP_URI + '/assets/images/not-found.png'}" width="150px"></mj-image>`,
          attributes: { class: 'fa fa-image' },
          ...commonElements
        }
      },
    ]
  }
};

export default (name, type, add_common_block = true) => {

  let cb = add_common_block ? common_blocks(type) : [];
  let Blocks = blocks(type)[name];

  if (Blocks) return [...cb, ...Blocks];

  return common_blocks;
};
