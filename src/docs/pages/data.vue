<script>
  import SlimSelect from 'slim-select/index.ts'
  import Chance from 'chance'
  var chance = new Chance()

  export default {
    mounted () {
      /* eslint-disable no-new */
      new SlimSelect({ select: '#data', data: this.randomizeSingle() })
      new SlimSelect({ select: '#data-groups', data: this.randomizeGroup() })
    },
    methods: {
      randomizeSingle () {
        let items = []
        for (var i = 0; i < 100; i++) {
          items.push({
            value: chance.integer({min: 0}),
            text: chance.name()
          })
        }
        return items
      },
      randomizeGroup () {
        let groups = []
        for (var g = 0; g < 10; g++) {
          var lastName = chance.last()
          let group = { label: lastName, options: [] }
          for (var gg = 0; gg < 10; gg++) {
            group.options.push({
              value: chance.integer({min: 0}),
              text: chance.first() + ' ' + lastName
            })
          }
          groups.push(group)
        }
        return groups
      }
    }
  }
</script>

<template>
  <div id="data-content">
    <select id="data"></select>
    <select id="data-groups"></select>
  </div>
</template>
