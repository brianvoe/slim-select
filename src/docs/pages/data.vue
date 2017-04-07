<script>
  import SlimSelect from 'slim-select/index.ts'
  import Chance from 'chance'
  var chance = new Chance()

  export default {
    mounted () {
      this.dataSingle = new SlimSelect({ select: '#data-single' })
      this.dataSingle.setData(this.randomizeSingle())

      this.dataGroup = new SlimSelect({ select: '#data-groups' })
      this.dataGroup.setData(this.randomizeGroup())
    },
    methods: {
      randomizeSingle () {
        let items = []
        for (var i = 0; i < 100; i++) {
          let firstName = chance.first()
          let info = {
            value: chance.integer({min: 0}),
            text: firstName + ' ' + chance.last()
          }
          if (firstName === 'Kyle' || firstName.charAt(0) === 'K') {
            info.disabled = true
          }
          items.push(info)
        }
        return items
      },
      randomizeGroup () {
        let groups = []
        for (var g = 0; g < 10; g++) {
          let lastName = chance.last()
          let group = { label: lastName, options: [] }
          for (var gg = 0; gg < 10; gg++) {
            let firstName = chance.first()
            let info = {
              value: chance.integer({min: 0}),
              text: firstName + ' ' + lastName,
              data: {
                firstName: firstName,
                lastName: lastName
              }
            }
            if (firstName === 'Kyle' || firstName.charAt(0) === 'K') {
              info.disabled = true
            }
            group.options.push(info)
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
    <select id="data-single"></select>
    <select id="data-groups"></select>
  </div>
</template>
