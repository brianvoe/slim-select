<script lang="ts">
import { defineComponent } from 'vue'
import SlimSelect from '../../../slim-select'

export default defineComponent({
  name: 'Mandatory',
  mounted() {
    const mandatorySelect = new SlimSelect({
      select: '#selectMultiMandatory',
    })

    const mandatoryData = [
      { value: 'A', text: 'A', mandatory: true },
      { value: 'B', text: 'B' },
      { value: 'C', text: 'C' },
    ]

    mandatorySelect.setData(mandatoryData)
    mandatorySelect.setSelected(['A', 'C'])

    new SlimSelect({
      select: '#selectMultiMandatory2',
    })
  },
})
</script>

<template>
  <div class="content">
    <h2 class="header">mandatory</h2>
    <p>
      When using multi select you can set a mandatory on the option to prevent capability to deselect particular option.
      Note options with mandatory flag is not selected by default, you need select them yourselfs.
    </p>

    <div class="set-content">
      <select id="selectMultiMandatory" multiple></select>
    </div>

    <pre>
    <code class="language-javascript">
        const slim = new SlimSelect({
            select: '#selectMultiMandatory'
        });

        const data = [
            { value: 'A', text: 'A', mandatory: true },
            { value: 'B', text: 'B' },
            { value: 'C', text: 'C' }
        ]

        slim.setData(data)
        slim.set(["A", "C"])
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
      <select id="selectMultiMandatory2" multiple>
        <option value="A" data-mandatory="true" selected>A</option>
        <option value="B" selected>B</option>
        <option value="C">C</option>
      </select>
    </div>

    <pre>
    <code class="language-javascript">
        const slim = new SlimSelect({
            select: '#selectMultiMandatory2'
        });
    </code>
    </pre>

    <pre>
    <code class="language-html">
        &lt;select id="selectMultiMandatory" multiple&gt;
        &lt;option value="A" data-mandatory="true" selected&gt;A&lt;/option&gt;
        &lt;option value="B" selected&gt;B&lt;/option&gt;
        &lt;option value="C"&gt;C&lt;/option&gt;
        &lt;/select&gt;
    </code>
    </pre>
  </div>
</template>
