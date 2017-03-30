<script>
  import SlimSelect from '../slim-select/index.ts'

  export default {
    data () {
      return {
        states: [
          {abv: 'AL', state: 'Alabama'},
          {abv: 'AK', state: 'Alaska'},
          {abv: 'AZ', state: 'Arizona'},
          {abv: 'AR', state: 'Arkansas'},
          {abv: 'CA', state: 'California'},
          {abv: 'CO', state: 'Colorado'},
          {abv: 'CT', state: 'Connecticut'},
          {abv: 'DE', state: 'Delaware'},
          {abv: 'DC', state: 'District Of Columbia'},
          {abv: 'FL', state: 'Florida'},
          {abv: 'GA', state: 'Georgia'},
          {abv: 'HI', state: 'Hawaii'},
          {abv: 'ID', state: 'Idaho'},
          {abv: 'IL', state: 'Illinois'},
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
        ]
      }
    },
    mounted () {
      /* eslint-disable no-new */
      new SlimSelect({
        select: '#simple'
      })
    }
  }
</script>

<template>
  <div id="simple-content">
    <select id="simple">
      <option v-for="value in states" :value="value.abv">{{value.state}}</option>
    </select>
  </div>
</template>
