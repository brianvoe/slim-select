<script>
  import SlimSelect from '../slim-select/index.js'
  import Chance from 'chance'
  var chance = new Chance()

  export default {
    data () {
      return {
        items: [],
        groups: []
      }
    },
    mounted () {
      /* eslint-disable no-new */
      new SlimSelect({ select: '#observer' })
      new SlimSelect({ select: '#observer-groups' })

      this.randomize()
      setInterval(() => {
        this.randomize()
      }, 3000)
    },
    methods: {
      randomize () {
        let items = []
        for (var i = 0; i < 100; i++) {
          items.push({
            value: chance.integer({min: 0}),
            text: chance.word({syllables: 3})
          })
        }
        this.items = items

        let groups = []
        for (var g = 0; g < 10; g++) {
          let group = { label: chance.word({syllables: 3}), options: [] }
          for (var gg = 0; gg < 10; gg++) {
            group.options.push({
              value: chance.integer({min: 0}),
              text: chance.word({syllables: 3})
            })
          }
          groups.push(group)
        }
        this.groups = groups
      }
    }
  }
</script>

<template>
  <div id="observer-content">
    <select id="observer">
      <option v-for="info in items" :value="info.value" :key="info.value">{{info.text}}</option>
    </select>

    <select id="observer-groups">
      <optgroup v-for="group in groups" :label="group.label" :key="group.label">
        <option v-for="info in group.options" :value="info.value" :key="info.value">{{info.text}}</option>
      </optgroup>
    </select>
  </div>
</template>
