<script lang="ts">
import { defineComponent } from 'vue'

import SlimSelect from '../../slim-select'

export default defineComponent({
  name: 'Home',
  mounted() {
    const single = new SlimSelect({
      select: this.$refs.slimSingle as HTMLSelectElement,
    })
    const multiple = new SlimSelect({
      select: this.$refs.slimMulti as HTMLSelectElement,
    })

    setTimeout(() => {
      single.open()
      setTimeout(() => {
        single.setSelected('best')
      }, 500)
      setTimeout(() => {
        single.setSelected('select')
      }, 1000)
      setTimeout(() => {
        single.setSelected('ever')
      }, 1500)
      setTimeout(() => {
        single.close()
      }, 2000)

      multiple.open()
      setTimeout(() => {
        multiple.setSelected(['best'])
      }, 500)
      setTimeout(() => {
        multiple.setSelected(['best', 'select'])
      }, 1000)
      setTimeout(() => {
        multiple.setSelected(['best', 'select', 'ever'])
      }, 1500)
      setTimeout(() => {
        multiple.close()
      }, 2000)
    }, 500)
  },
})
</script>

<style lang="scss">
#home {
  .samples {
    display: flex;
    justify-content: space-between;
    gap: var(--spacing);

    .single {
      flex: 1 1 50%;
    }
    .multi {
      flex: 1 1 50%;
    }
  }

  .callouts {
    display: flex;
    padding: 20px 0 0 0;

    .features {
      flex: 1 1 auto;
      display: flex;
      flex-direction: column;

      .header {
        padding: 0 0 var(--spacing) 0;
      }

      .row {
        justify-content: space-around;

        .list {
          display: flex;
          flex-direction: column;
          list-style: none;
          padding: 0px;
          width: 200px;
          margin: 0 auto;

          li {
            display: flex;
            align-items: center;
            padding: 0 0 5px 0;
            font-weight: bold;
            font-size: 20px;

            img {
              width: 20px;
              padding: 0 8px 0 0;
            }
          }
        }
      }
    }
  }
}
</style>

<template>
  <div id="home" class="content">
    <div class="samples row">
      <div class="single">
        <h2>Single Select 2</h2>
        <select ref="slimSingle">
          <option data-placeholder="true"></option>
          <option value="best">Best</option>
          <option value="select">Select</option>
          <option value="ever">Ever</option>
        </select>
      </div>
      <div class="multi">
        <h2>Multi Select</h2>
        <select ref="slimMulti" multiple>
          <option value="best">Best</option>
          <option value="select">Select</option>
          <option value="ever">Ever</option>
        </select>
      </div>
    </div>

    <div class="callouts">
      <div class="features">
        <div class="header"><h2>Features</h2></div>

        <div class="row">
          <ul class="list">
            <li><img src="../images/check-mark.svg" /> No Dependencies</li>
            <li><img src="../images/check-mark.svg" /> ~30kb - ~5kb gzip</li>
            <li><img src="../images/check-mark.svg" /> Single Select</li>
            <li><img src="../images/check-mark.svg" /> Multiple Select</li>
            <li><img src="../images/check-mark.svg" /> Addable Options</li>
            <li><img src="../images/check-mark.svg" /> Html Options</li>
            <li><img src="../images/check-mark.svg" /> Settable Data</li>
            <li><img src="../images/check-mark.svg" /> Callback Events</li>
            <li><img src="../images/check-mark.svg" /> Placeholders</li>
          </ul>
          <ul class="list">
            <li><img src="../images/check-mark.svg" /> Advanced Search</li>
            <li><img src="../images/check-mark.svg" /> Tabbable</li>
            <li><img src="../images/check-mark.svg" /> Disable Options</li>
            <li><img src="../images/check-mark.svg" /> Light Css</li>
            <li><img src="../images/check-mark.svg" /> Light Color Scheme</li>
            <li><img src="../images/check-mark.svg" /> Style Inheritance</li>
            <li><img src="../images/check-mark.svg" /> Clean Animations</li>
            <li><img src="../images/check-mark.svg" /> Performant</li>
            <li><img src="../images/check-mark.svg" /> Typescript</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
