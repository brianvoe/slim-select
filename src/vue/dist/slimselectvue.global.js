var SlimSelectVue = (function (vue, SlimSelect) {
  'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var SlimSelect__default = /*#__PURE__*/_interopDefaultLegacy(SlimSelect);

  var script = vue.defineComponent({
    name: 'SlimSelect',
    props: {
      data: {
        type: Array,
      },
      settings: {
        type: Object,
      },
      events: {
        type: Object,
      },
    },
    data() {
      return {
        slim: null,
      }
    },
    mounted() {
      let config = {
        select: this.$refs.slim,
      };

      // If data is passed in, use it
      if (this.data) {
        config.data = this.data;
      }

      // If settings are passed in, use it
      if (this.settings) {
        config.settings = this.settings;
      }

      // If events are passed in, use it
      if (this.events) {
        config.events = this.events;
      }

      // Initialize SlimSelect
      this.slim = new SlimSelect__default["default"](config);
    },
    beforeUnmount() {
      if (this.slim) {
        this.slim.destroy();
      }
    },
  });

  const _hoisted_1 = { ref: "slim" };

  function render(_ctx, _cache, $props, $setup, $data, $options) {
    return (vue.openBlock(), vue.createElementBlock("select", _hoisted_1, [
      vue.renderSlot(_ctx.$slots, "default")
    ], 512 /* NEED_PATCH */))
  }

  script.render = render;
  script.__file = "slimselect.vue";

  return script;

})(vue, slim-select);
