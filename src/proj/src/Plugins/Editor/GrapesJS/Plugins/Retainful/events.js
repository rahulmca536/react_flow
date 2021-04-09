import React from "react";
import _get from "lodash/get";
import _map from "lodash/map";
import _clone from "lodash/clone";
import _isFunction from "lodash/isFunction";
import _isEmpty from "lodash/isEmpty";
import blocks from "./constants/blocks";
import migrate from "../../MigrateMJML324";
// import Auth from "../../../../../Auth/Auth";

// let auth = new Auth();

const getAllComponents = (model, result = []) => {
  result.push(model);
  model.components().each(mod => getAllComponents(mod, result));
  return result;
};

export default (editor, options = {}) => {
  let $ = editor.$;
  let {
    setAppLoading,
    FlashMessage,
    changeTab,
    assets,
    getHTML,
    user,
    onAssetRemoved,
    loadAssets,
    editorType,
    url
  } = options;

  editor.on("load", e => {
    const frame = $(".gjs-frame");
    frame
      .contents()
      .find("div[data-gjs-type=wrapper]")
      .css({ background: "#f8f9fa", height: "100%" });

    frame.attr("data-hj-allow-iframe", "");

    let bm = editor.BlockManager;

    if (blocks) {
      const location = new URL(url);
      let is_post_purchase = false;

      try {
        let post_purchase = (location.pathname.split('/'))[4];
        is_post_purchase = post_purchase === 'after_ordered' ? true : false;
      } catch (error) {

      }

      // _map(blocks(user.type, editorType), (v, k) => {
      //   const label = _get(v, 'block.label');
      //   if(is_post_purchase && label === 'Coupon')
      //     return;
      //   bm.add("custom_" + k, v.block);
      // });
    }

    // -- * --

    if ($(".gjs-settings").length === 0) {
      var traitsSector = $(
        '<div class="gjs-sm-sector no-select gjs-settings">' +
        '<div class="gjs-sm-title"><span class="icon-settings fa fa-cog"></span> Settings</div>' +
        '<div class="gjs-sm-properties" style="display: block;"></div></div>'
      );
      var traitsProps = traitsSector.find(".gjs-sm-properties");

      traitsProps.append($(".gjs-trt-traits"));
      changeTab && changeTab("styles");
      $(".gjs-sm-sectors").before(traitsSector);
      $("#gjs-custom-panel-nav-tab-trait").hide();
      changeTab && changeTab("blocks");
      traitsSector.find(".gjs-sm-title").on("click", function () {
        var traitStyle = traitsProps.get(0).style;
        var hidden = traitStyle.display === "none";
        if (hidden) {
          traitStyle.display = "block";
        } else {
          traitStyle.display = "none";
        }
      });
    }

    // -- * --
    let assetManager = editor.AssetManager;

    loadAssets()
      .then(response =>
        assetManager.add([
          ...response.data.data,
          "https://s3.us-east-2.amazonaws.com/retainful-public/assets/images/240bdab30186a168f0018ef967391aa4/4b2154e3-230b-44ed-a2b2-e852b76c965ff203e264b7a10bf16a8d80ad6779c384.png",
          "https://s3.us-east-2.amazonaws.com/retainful-public/assets/images/240bdab30186a168f0018ef967391aa4/ba7161e4-6211-4793-9406-248a6732a1a7f203e264b7a10bf16a8d80ad6779c384.png",
          "https://s3.us-east-2.amazonaws.com/retainful-public/assets/images/240bdab30186a168f0018ef967391aa4/6298852a-0a45-472f-a166-b705c098fab0f203e264b7a10bf16a8d80ad6779c384.png",
          "https://cdn.jsdelivr.net/gh/retainful/emailCustomizer@0.1.9/images/your-logo.png",
          "https://cdn.jsdelivr.net/gh/retainful/emailCustomizer@master/images/shopping-cart-min.png",
          "https://cdn.jsdelivr.net/gh/retainful/emailCustomizer@master/images/gradient-min.png"
        ])
      )
      .catch(error => { });
  });

  editor.on("modal:open", function () {
    $(".gjs-am-file-uploader").find(
      "#gjs-am-title"
    ).html(`   <div>Drag and drop an image file from your computer
</div>
		<div>or</div>
		<div>
		  <label htmlfor="file-upload" class="custom-file-upload" style=" padding: 10px; ">
		  <i class="fa fa-cloud-upload"></i> Browse files in your computer to upload </label>
		</div>`);
  });

  editor.on("asset:remove", function (e) {
    onAssetRemoved(e);
  });

  editor.on("storage:start:store", e => {
    FlashMessage &&
      FlashMessage(
        true,
        <>
          <i className="fa fa-spinner fa-spin"></i> Saving...
        </>
      );

    try {
      e.mjml = editor.getHtml();
    } catch (error) {
      e.mjml = "";
    }

    try {
      e.html = (getHTML && getHTML()) || "";
    } catch (error) {
      e.html = "";
    }

    let coupon = _get(window, "retainful.woocommerce.coupon");

    e.shopify_params = window.retainful && window.retainful.shopify_params;

    if (coupon) e.woocommerce_coupon = coupon;
  });

  editor.on("storage:end:store", () => {
    FlashMessage(true, [
      <i
        key="rk3l44"
        className="fa fa-check-circle"
        style={{ color: "green" }}
      ></i>,
      " Saved"
    ]);
    setTimeout(() => {
      FlashMessage(false, null);
    }, 2000);
  });

  editor.on("storage:error", function (e) {
    try {
      let resp = JSON.parse(e);
      let message = resp.message;

      if (message === "Unauthorized") {
        // auth.handleUnAuthentication();
      }
    } catch (error) { }
  });

  editor.on("storage:end:load", e => {
    let mjml;

    try {
      mjml = e.mjml
        .replace(/(\r\n|\n|\r|\t)/gm, "")
        .replace(/\\n/g, "")
        .replace(/\\t/g, "")
        .replace(/\\r/g, "")
        .replace(/\\/g, "");
    } catch (error) { }

    let code = mjml ? mjml : editor.getHtml();
    const DomComponents = editor.DomComponents;
    let Migration = new migrate(code, $);
    let um = editor.UndoManager;
    if (Migration.hasError()) {
      // DomComponents.clear();
      return FlashMessage(true, "Something went wrong.");
    } else if (Migration.isMJML3()) {
      Migration.run(function (err, mjml) {
        if (err) return FlashMessage(true, "Something went wrong.");
        // return DomComponents.clear();

        DomComponents.clear();
        DomComponents.addComponent(mjml);
        um.clear();
      });
    } else {
      Migration.fixButtonText();
      Migration.replaceImage(
        "http://placehold.it/350x250/78c5d6/fff",
        process.env.REACT_APP_URI + "/assets/images/not-found.png"
      );
      Migration.fixImage();
      Migration.addStyle();
      let mjml = Migration.getMJML();
      DomComponents.clear();
      DomComponents.addComponent(mjml);
      um.clear();
    }

    window.retainful = {
      ...window.retainful,
      shopify_params: e.shopify_params || {}
    };

    if (e.woocommerce_coupon)
      window.retainful = {
        ...window.retainful,
        woocommerce: {
          ...window.retainful.woocommerce,
          coupon: e.woocommerce_coupon || ""
        }
      };
    setAppLoading && setAppLoading(false);
  });

  editor.on("component:create", e => {
    if (e.is("mj-social-element")) {
      let name = e.getTrait("name").getTargetValue();
      let target = e.getTrait("href");
      let isTargetEmpty = _isEmpty(target.getTargetValue());

      name = name ? name.replace("-noshare", "") : name;

      const setTarget = t => isTargetEmpty && target.setTargetValue(t);

      user[name] && setTarget(user[name]);
    }

    e.is("mj-button") && e.addAttributes({ "data-gjs-editable": "false" });
  });

  editor.on("component:add", function (e) {
    let $view = _get(e, "view.$el");

    try {
      if ($view.find && $view.find("[coupon-block=true]").length !== 0) {
        const all = getAllComponents(editor.DomComponents.getWrapper());

        let coupon_count = 0;

        _map(all, function (component) {
          let element = _get(component, "view.$el");

          if (element) {
            let $e = element.attr("coupon-block");
            if ($e && coupon_count === 0) {
              coupon_count += 1;
            } else if ($e && coupon_count === 1) {
              e.remove();
              alert(
                "You can only use one of this coupon component per template."
              );
            }
          }
        });
      }
    } catch (error) { }
  });

  editor.on("component:remove", function (e) {
    try {
      let $view = _get(e, "view.$el");

      if ($view.attr("coupon-block")) {
        if (window.retainful) {
          window.retainful.shopify = {};
          window.retainful.woocommerce = {};
        }
      }
    } catch (error) { }
  });

  editor.on("component:selected", e => {
    // -- * --

    let components = [
      "mj-text",
      "mj-column",
      "mj-body",
      "mj-section",
      "mj-divider",
      "mj-social"
    ];

    let $view = _get(e, "view.$el");

    if (
      !$view ||
      ($view.attr("coupon-block") == null &&
        components.indexOf(e.attributes.tagName) != -1)
    ) {
      $(".gjs-settings > .gjs-sm-properties > .gjs-trt-traits").hide();
    } else {
      $(".gjs-settings > .gjs-sm-properties > .gjs-trt-traits").show();
    }

    // -- * --

    e.attributes["custom-name"] === "Container"
      ? changeTab("blocks")
      : changeTab("styles");
  });

  editor.on("modal:close", () => {
    try {
      const component = editor.getSelected();
      let src = component.attributes.src;
      if (component.is("mj-image") && src) {
        component.getTrait("toggleImageModal").setTargetValue(src);
        $("#gjs_img_preview_logo_rtl").attr("src", src);
      }
    } catch (error) { }
  });

  editor.on("modal:open", () => {
    editor.AssetManager.add(assets);
    editor.AssetManager.onClick(function (model) {
      try {
        const collection = editor.AssetManager.getAllVisible();
        let target = collection.target;

        if (target && target.set) {
          target.set("attributes", _clone(target.get("attributes")));
          target.set("src", model.get("src"));
        }

        editor.Modal.close();

        var onSelect = collection.onSelect;
        _isFunction(onSelect) && onSelect(model);
      } catch (error) { }
    });
  });

  editor.on("asset:remove", function (e) {
    onAssetRemoved && onAssetRemoved();
  });
};
