<script>
  import SlimSelect from '../slim-select/index.ts'

  export default {
    data () {
      return {
        foods: [
          { label: 'Dairy', options: ['Milk', 'Cheese', 'Butter', 'Ice Cream'] },
          { label: 'Meat', options: ['Beef', 'Ham', 'Pork', 'Sausage', 'Chicken', 'Turkey'] },
          { label: 'Fruits', options: ['Apple', 'Banana', 'Grape', 'Orange', 'Strawberry', 'Blueberry', 'Raspberry'] },
          { label: 'Vegetables', options: ['Carrot', 'Tomato', 'Broccoli', 'Celery', 'Corn', 'Pumpkin', 'Kale', 'Spinach'] }
        ]
      }
    },
    mounted () {
      /* eslint-disable no-new */
      new SlimSelect({
        select: '#group'
      })
    }
  }
</script>

<template>
  <div id="group-content">
    <select id="group">
      <optgroup v-for="food in foods" :label="food.label">
        <option v-for="value in food.options" :value="value"><img src="https://d30y9cdsu7xlg0.cloudfront.net/png/79356-200.png" height="20" /> {{value}}</option>
      </optgroup>
    </select>
  </div>
</template>
