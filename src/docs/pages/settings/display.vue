<script lang="ts">
import { defineComponent } from 'vue'
import HighlightStyle from '../../components/highlight_style.vue'

import SlimSelect from '@/slim-select'

export default defineComponent({
  name: 'Display',
  components: {
    HighlightStyle
  },
  mounted() {
    const displaySelect = new SlimSelect({
      select: this.$refs.selectdisplay as HTMLSelectElement
    })

    const displayData = [
      { value: 'value1', text: 'Value 1', display: false },
      { value: 'value2', text: 'Value 2' },
      { value: 'value3', text: 'Value 3' }
    ]

    displaySelect.setData(displayData)
    displaySelect.setSelected(['value1', 'value3'])

    new SlimSelect({
      select: this.$refs.selectdisplay2 as HTMLSelectElement
    })

    new SlimSelect({
      select: this.$refs.selectdisplayHidden as HTMLSelectElement
    })
  },
  methods: {
    onOption2ShowChange(event: Event) {
      const hide = (event.target as HTMLSelectElement).value === 'No'
      const option2 = (this.$refs.selectdisplayHidden as HTMLSelectElement).querySelector(
        '#display-option2'
      ) as HTMLOptionElement | null

      if (option2) {
        option2.hidden = hide
      }
    }
  }
})
</script>

<style lang="scss">
#display {
  .hidden-toggle {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-quarter);
    font-weight: 600;

    select {
      font-weight: normal;
    }
  }
}
</style>

<template>
  <div id="display" class="content">
    <h2 class="header">display</h2>
    <p>
      Option <code>display</code> controls whether an option appears in the SlimSelect dropdown. Set
      <code>display: false</code> in data, use native <code>&lt;option hidden&gt;</code>, or
      <code>style="display: none"</code>. Hidden options can still stay selected in the underlying
      <code>&lt;select&gt;</code>.
    </p>
    <p>
      Changing <code>option.hidden</code> after init is picked up automatically. You do not need to call
      <code>setData()</code> or add your own observers.
    </p>

    <div class="row">
      <select ref="selectdisplay" multiple></select>
    </div>

    <HighlightStyle language="javascript">
      <pre>
        const displaySelect = new SlimSelect({
          select: '#selectElement'
        })

        const displayData = [
          { value: 'value1', text: 'Value 1', display: false },
          { value: 'value2', text: 'Value 2' },
          { value: 'value3', text: 'Value 3' },
        ]

        displaySelect.setData(displayData)
        displaySelect.set(['value1', 'value3'])
      </pre>
    </HighlightStyle>

    <HighlightStyle language="html">
      <pre>
        &lt;select id="selectMultiMandatory" multiple&gt;&lt;/select&gt;
      </pre>
    </HighlightStyle>

    <p>Or</p>
    <div class="row">
      <select ref="selectdisplay2" multiple>
        <option value="value1" style="display: none" selected>Value 1</option>
        <option value="value2" selected>Value 2</option>
        <option value="value3">Value 3</option>
      </select>
    </div>

    <HighlightStyle language="javascript">
      <pre>
        const slim = new SlimSelect({
          select: '#selectElement'
        });
      </pre>
    </HighlightStyle>

    <HighlightStyle language="html">
      <pre>
        &lt;select id="selectdisplay2" multiple&gt;
          &lt;option value="value1" style="display: none;" selected&gt;Value 1&lt;/option&gt;
          &lt;option value="value2" selected&gt;Value 2&lt;/option&gt;
          &lt;option value="value3"&gt;Value 3&lt;/option&gt;
        &lt;/select&gt;
      </pre>
    </HighlightStyle>

    <p>Or toggle native <code>hidden</code> after SlimSelect is created:</p>
    <div class="row">
      <select ref="selectdisplayHidden">
        <option id="display-option1" value="1">Option 1</option>
        <option id="display-option2" value="2">Option 2</option>
        <option id="display-option3" value="3">Option 3</option>
      </select>
      <label class="hidden-toggle">
        Option 2 show
        <select @change="onOption2ShowChange">
          <option value="Yes" selected>Yes</option>
          <option value="No">No</option>
        </select>
      </label>
    </div>

    <HighlightStyle language="javascript">
      <pre>
        new SlimSelect({
          select: '#myselect'
        })

        document.getElementById('option2_show').addEventListener('change', () => {
          const hide = document.getElementById('option2_show').value === 'No'
          document.getElementById('option2').hidden = hide
        })
      </pre>
    </HighlightStyle>

    <HighlightStyle language="html">
      <pre>
        &lt;select id="myselect"&gt;
          &lt;option id="option1" value="1"&gt;Option 1&lt;/option&gt;
          &lt;option id="option2" value="2"&gt;Option 2&lt;/option&gt;
          &lt;option id="option3" value="3"&gt;Option 3&lt;/option&gt;
        &lt;/select&gt;

        &lt;select id="option2_show"&gt;
          &lt;option value="Yes" selected&gt;Yes&lt;/option&gt;
          &lt;option value="No"&gt;No&lt;/option&gt;
        &lt;/select&gt;
      </pre>
    </HighlightStyle>
  </div>
</template>
