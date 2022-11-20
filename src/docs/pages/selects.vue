<script lang="ts">
import { defineComponent } from 'vue'

import SlimSelect from '../../slim-select'

export default defineComponent({
  name: 'Selects',
  data() {
    return {
      states: [
        { abv: 'AL', state: 'Alabama' },
        { abv: 'AK', state: 'Alaska' },
        { abv: 'AZ', state: 'Arizona' },
        { abv: 'AR', state: 'Arkansas' },
        { abv: 'CA', state: 'California' },
        { abv: 'CO', state: 'Colorado' },
        { abv: 'CT', state: 'Connecticut' },
        { abv: 'DE', state: 'Delaware' },
        { abv: 'FL', state: 'Florida' },
        { abv: 'GA', state: 'Georgia' },
        { abv: 'HI', state: 'Hawaii' },
        { abv: 'ID', state: 'Idaho' },
        { abv: 'IL', state: 'Illinois' },
        { abv: 'IN', state: 'Indiana' },
        { abv: 'IA', state: 'Iowa' },
        { abv: 'KS', state: 'Kansas' },
        { abv: 'KY', state: 'Kentucky' },
        { abv: 'LA', state: 'Louisiana' },
        { abv: 'ME', state: 'Maine' },
        { abv: 'MD', state: 'Maryland' },
        { abv: 'MA', state: 'Massachusetts' },
        { abv: 'MI', state: 'Michigan' },
        { abv: 'MN', state: 'Minnesota' },
        { abv: 'MS', state: 'Mississippi' },
        { abv: 'MO', state: 'Missouri' },
        { abv: 'MT', state: 'Montana' },
        { abv: 'NE', state: 'Nebraska' },
        { abv: 'NV', state: 'Nevada' },
        { abv: 'NH', state: 'New Hampshire' },
        { abv: 'NJ', state: 'New Jersey' },
        { abv: 'NM', state: 'New Mexico' },
        { abv: 'NY', state: 'New York' },
        { abv: 'NC', state: 'North Carolina' },
        { abv: 'ND', state: 'North Dakota' },
        { abv: 'OH', state: 'Ohio' },
        { abv: 'OK', state: 'Oklahoma' },
        { abv: 'OR', state: 'Oregon' },
        { abv: 'PA', state: 'Pennsylvania' },
        { abv: 'RI', state: 'Rhode Island' },
        { abv: 'SC', state: 'South Carolina' },
        { abv: 'SD', state: 'South Dakota' },
        { abv: 'TN', state: 'Tennessee', selected: true },
        { abv: 'TX', state: 'Texas' },
        { abv: 'UT', state: 'Utah' },
        { abv: 'VT', state: 'Vermont' },
        { abv: 'VA', state: 'Virginia' },
        { abv: 'WA', state: 'Washington' },
        { abv: 'WV', state: 'West Virginia' },
        { abv: 'WI', state: 'Wisconsin' },
        { abv: 'WY', state: 'Wyoming' },
      ],
      foods: [
        { label: 'Dairy', options: ['Milk', 'Cheese', 'Butter', 'Ice Cream'] },
        { label: 'Meat', options: ['Beef', 'Ham', 'Pork', 'Sausage', 'Chicken', 'Turkey'] },
        { label: 'Fruits', options: ['Apple', 'Banana', 'Grape', 'Orange', 'Strawberry', 'Blueberry', 'Raspberry'] },
        {
          label: 'Vegetables',
          options: ['Carrot', 'Tomato', 'Broccoli', 'Celery', 'Corn', 'Pumpkin', 'Kale', 'Spinach'],
        },
      ],
    }
  },
  mounted() {
    // Single
    new SlimSelect({
      select: this.$refs.single as HTMLSelectElement,
    })
    new SlimSelect({
      select: this.$refs.singleOptgroup as HTMLSelectElement,
    })

    // Multiple
    new SlimSelect({
      select: this.$refs.multiple as HTMLSelectElement,
    })
    const multiGroup = new SlimSelect({
      select: this.$refs.multipleOptgroup as HTMLSelectElement,
    })
    multiGroup.setSelected(['Cheese', 'Apple', 'Corn'])
  },
})
</script>

<template>
  <div id="selects" class="contents">
    <div id="single" class="content">
      <h2 class="header">Single</h2>
      <p>
        Basic single select usage with Slim Select is extremely easy. Just set the select value to your select element.
      </p>
      <div class="row">
        <div>
          <h4>Options</h4>
          <select ref="single">
            <option v-for="value in states" :key="value.abv" :value="value.abv" :selected="value.selected">
              {{ value.state }}
            </option>
          </select>
        </div>
        <div>
          <h4>Optgroups</h4>
          <select ref="singleOptgroup">
            <optgroup v-for="food in foods" :key="food.label" :label="food.label">
              <option v-for="option in food.options" :key="option" :value="option">{{ option }}</option>
            </optgroup>
          </select>
        </div>
      </div>

      <pre>
        <code class="language-javascript">
          new SlimSelect({
            select: '#single'
          })
        </code>
      </pre>

      <pre>
        <code class="language-html">
          &lt;!-- Options --&gt;
          &lt;select id="single"&gt;
            &lt;option value="value 1"&gt;Value 1&lt;/option&gt;
            &lt;option value="value 2"&gt;Value 2&lt;/option&gt;
            &lt;option value="value 3"&gt;Value 3&lt;/option&gt;
          &lt;/select&gt;

          &lt;!-- Optgroups --&gt;
          &lt;select id="single-optgroups"&gt;
            &lt;optgroup label="Label 1"&gt;
              &lt;option value="value 1"&gt;Value 1&lt;/option&gt;
              &lt;option value="value 2"&gt;Value 2&lt;/option&gt;
              &lt;option value="value 3"&gt;Value 3&lt;/option&gt;
            &lt;/optgroup&gt;
            &lt;optgroup label="Label 2"&gt;
              &lt;option value="value 21"&gt;Value 1&lt;/option&gt;
              &lt;option value="value 22"&gt;Value 2&lt;/option&gt;
              &lt;option value="value 23"&gt;Value 3&lt;/option&gt;
            &lt;/optgroup&gt;
          &lt;/select&gt;
        </code>
      </pre>
    </div>

    <div id="multiple" class="content">
      <h2 class="header">Multiple</h2>
      <p>
        Multi selects work just the same as a single select. The only difference is setting the multiple attribute on
        your select.
      </p>
      <div class="row">
        <div>
          <h4>Options</h4>
          <select ref="multiple" multiple>
            <option v-for="value in states" :value="value.abv" :key="value.abv" :selected="value.selected">
              {{ value.state }}
            </option>
          </select>
        </div>
        <div>
          <h4>Optgroups</h4>
          <select ref="multipleOptgroup" multiple>
            <optgroup v-for="food in foods" :key="food.label" :label="food.label">
              <option v-for="option in food.options" :key="option" :value="option">{{ option }}</option>
            </optgroup>
          </select>
        </div>
      </div>

      <pre>
        <code class="language-javascript">
          new SlimSelect({
            select: '#multiple'
          })
        </code>
      </pre>

      <pre>
        <code class="language-html">
          &lt;!-- Options --&gt;
          &lt;select id="multiple" multiple&gt;
            &lt;option value="value 1"&gt;Value 1&lt;/option&gt;
            &lt;option value="value 2"&gt;Value 2&lt;/option&gt;
            &lt;option value="value 3"&gt;Value 3&lt;/option&gt;
          &lt;/select&gt;

          &lt;!-- Optgroups --&gt;
          &lt;select id="multiple-optgroups" multiple&gt;
            &lt;optgroup label="Label 1"&gt;
              &lt;option value="value 1"&gt;Value 1&lt;/option&gt;
              &lt;option value="value 2"&gt;Value 2&lt;/option&gt;
              &lt;option value="value 3"&gt;Value 3&lt;/option&gt;
            &lt;/optgroup&gt;
            &lt;optgroup label="Label 2"&gt;
              &lt;option value="value 21"&gt;Value 1&lt;/option&gt;
              &lt;option value="value 22"&gt;Value 2&lt;/option&gt;
              &lt;option value="value 23"&gt;Value 3&lt;/option&gt;
            &lt;/optgroup&gt;
          &lt;/select&gt;
        </code>
      </pre>
    </div>
  </div>
</template>
