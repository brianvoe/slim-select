<script lang="ts">
import { defineComponent } from 'vue'
import SlimSelect from '../../../slim-select'

export default defineComponent({
  name: 'Display',
  mounted() {
    const displaySelect = new SlimSelect({
      select: '#selectdisplay',
    })

    const displayData = [
      { value: 'A', text: 'A', display: false },
      { value: 'B', text: 'B' },
      { value: 'C', text: 'C' },
    ]

    displaySelect.setData(displayData)
    displaySelect.setSelected(['A', 'C'])

    new SlimSelect({
      select: '#selectdisplay2',
    })
  },
})
</script>

<template>
  <div class="content">
    <h2 class="header">display</h2>
    <p>Allows to hide elements of select options.</p>

    <div class="set-content">
      <select id="selectdisplay" multiple></select>
    </div>

    <pre>
    <code class="language-javascript">
        const displaySelect = new SlimSelect({
            select: '#selectdisplay'
        })

        const displayData = [
            { value: 'A', text: 'A', display: false },
            { value: 'B', text: 'B' },
            { value: 'C', text: 'C' }
        ]

        displaySelect.setData(displayData)
        displaySelect.set(['A', 'C'])
    </code>
    </pre>

    <pre>
    <code class="language-html">
        &lt;select id="selectMultiMandatory" multiple&gt;
        &lt;/select&gt;
    </code>
    </pre>

    <p>Or</p>
    <div class="set-content">
      <select id="selectdisplay2" multiple>
        <option value="A" style="display: none" selected>A</option>
        <option value="B" selected>B</option>
        <option value="C">C</option>
      </select>
    </div>

    <pre>
    <code class="language-javascript">
        const slim = new SlimSelect({
            select: '#selectdisplay2'
        });
    </code>
    </pre>

    <pre>
    <code class="language-html">
        &lt;select id="selectdisplay2" multiple&gt;
        &lt;option value="A" style="display: none;" selected&gt;A&lt;/option&gt;
        &lt;option value="B" selected&gt;B&lt;/option&gt;
        &lt;option value="C"&gt;C&lt;/option&gt;
        &lt;/select&gt;
    </code>
    </pre>
  </div>
</template>
