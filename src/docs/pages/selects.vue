<script lang="ts">
  import Vue from 'vue'
  import SlimSelect from '@/slim-select'

  export default Vue.extend({
    data() {
      return {
        states: [
          {abv: 'AL', state: 'Alabama'},
          {abv: 'AK', state: 'Alaska'},
          {abv: 'AZ', state: 'Arizona'},
          {abv: 'AR', state: 'Arkansas'},
          {abv: 'CA', state: 'California', selected: true},
          {abv: 'CO', state: 'Colorado'},
          {abv: 'CT', state: 'Connecticut'},
          {abv: 'DE', state: 'Delaware'},
          {abv: 'DC', state: 'District Of Columbia'},
          {abv: 'FL', state: 'Florida'},
          {abv: 'GA', state: 'Georgia'},
          {abv: 'HI', state: 'Hawaii'},
          {abv: 'ID', state: 'Idaho'},
          {abv: 'IL', state: 'Illinois', selected: true},
          {abv: 'IN', state: 'Indiana'},
          {abv: 'IA', state: 'Iowa'},
          {abv: 'KS', state: 'Kansas'},
          {abv: 'KY', state: 'Kentucky'},
          {abv: 'LA', state: 'Louisiana'},
          {abv: 'ME', state: 'Maine'},
          {abv: 'MD', state: 'Maryland'},
          {abv: 'MA', state: 'Massachusetts'},
          {abv: 'MI', state: 'Michigan'},
          {abv: 'MN', state: 'Minnesota'},
          {abv: 'MS', state: 'Mississippi'},
          {abv: 'MO', state: 'Missouri'},
          {abv: 'MT', state: 'Montana'},
          {abv: 'NE', state: 'Nebraska'},
          {abv: 'NV', state: 'Nevada'},
          {abv: 'NH', state: 'New Hampshire'},
          {abv: 'NJ', state: 'New Jersey'},
          {abv: 'NM', state: 'New Mexico'},
          {abv: 'NY', state: 'New York'},
          {abv: 'NC', state: 'North Carolina'},
          {abv: 'ND', state: 'North Dakota'},
          {abv: 'OH', state: 'Ohio'},
          {abv: 'OK', state: 'Oklahoma'},
          {abv: 'OR', state: 'Oregon'},
          {abv: 'PA', state: 'Pennsylvania'},
          {abv: 'RI', state: 'Rhode Island'},
          {abv: 'SC', state: 'South Carolina'},
          {abv: 'SD', state: 'South Dakota'},
          {abv: 'TN', state: 'Tennessee'},
          {abv: 'TX', state: 'Texas'},
          {abv: 'UT', state: 'Utah'},
          {abv: 'VT', state: 'Vermont'},
          {abv: 'VA', state: 'Virginia'},
          {abv: 'WA', state: 'Washington'},
          {abv: 'WV', state: 'West Virginia'},
          {abv: 'WI', state: 'Wisconsin'},
          {abv: 'WY', state: 'Wyoming'}
        ],
        foods: [
          { label: 'Dairy', options: ['Milk', 'Cheese', 'Butter', 'Ice Cream'] },
          { label: 'Meat', options: ['Beef', 'Ham', 'Pork', 'Sausage', 'Chicken', 'Turkey'] },
          { label: 'Fruits', options: ['Apple', 'Banana', 'Grape', 'Orange', 'Strawberry', 'Blueberry', 'Raspberry'] },
          { label: 'Vegetables', options: ['Carrot', 'Tomato', 'Broccoli', 'Celery', 'Corn', 'Pumpkin', 'Kale', 'Spinach'] }
        ]
      }
    },
    mounted() {
      new SlimSelect({
        select: '#single'
      })
      new SlimSelect({
        select: '#single-group'
      })

      new SlimSelect({
        select: '#multiple'
      })
      const multiGroup = new SlimSelect({
        select: '#multiple-group'
      })
      multiGroup.set(['Cheese', 'Apple', 'Corn'])
    }
  })
</script>

<style lang="scss">
  #selects-content {
    .select-split {
      display: flex;
      justify-content: space-between;

      > * {
        flex: 0 1 49%;
      }
    }
  }
</style>

<template>
  <div id="selects-content">

    <div class="content">
      <h2 class="header">Single</h2>
      <p>
        Basic single select usage with Slim Select is extremely easy.
        Just set the select value to your select element.
      </p>
      <div class="select-split">
        <div>
          <h4>Options</h4>
          <select id="single">
            <option v-for="value in states" :key="value.abv" :value="value.abv" :selected="value.selected">{{value.state}}</option>
          </select>
        </div>
        <div>
          <h4>Optgroups</h4>
          <select id="single-group">
            <optgroup v-for="food in foods" :key="food.label" :label="food.label">
              <option v-for="option in food.options" :key="option" :value="option">{{option}}</option>
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
    
    <div class="content">
      <h2 class="header">Multiple</h2>
      <p>
        Multi selects work just the same as a single select.
        The only difference is setting the multiple attribute on your select.
      </p>
      <div class="select-split">
        <div>
          <h4>Options</h4>
          <select id="multiple" multiple>
            <option v-for="value in states" :value="value.abv" :key="value.abv" :selected="value.selected">{{value.state}}</option>
          </select>
        </div>
        <div>
          <h4>Optgroups</h4>
          <select id="multiple-group" multiple>
            <optgroup v-for="food in foods" :key="food.label" :label="food.label">
              <option v-for="option in food.options" :key="option" :value="option">{{option}}</option>
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
