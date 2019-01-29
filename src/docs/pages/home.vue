<script lang="ts">
import Vue from 'vue'
import SlimSelect from '@/slim-select'

export default Vue.extend({
  mounted() {
    new SlimSelect({
      select: '#slim-single-select'
    })
    new SlimSelect({
      select: '#slim-multi-select'
    })
  }
})
</script>

<style lang="scss">
  #home-content {
    .samples {
      display: flex;
      justify-content: space-between;

      @media screen and (max-width: 600px) {
        flex-direction: column;
      }
      .single {
        flex: 1 1 50%;
        padding: 0 10px 0 0;

        @media screen and (max-width: 600px) {
          padding: 0 0 10px 0;
        }
      }
      .multi {
        flex: 1 1 50%;
        padding: 0 0 0 10px;

        @media screen and (max-width: 600px) {
          padding: 0 0 0 0;
        }
      }
    }

    .callouts {
      padding: 20px 0 0 0;
      display: flex;
      justify-content: space-around;

      .features {
        flex: 0 1 50%;

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
            font-size: 16px;

            img {
              width: 20px;
              padding: 0 8px 0 0;
            }
          }
        }
      }

      .browsers {
        flex: 0 1 50%;

        .list {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          justify-content: center;

          .browser {
            display: flex;
            flex-direction: column;
            width: 80px;
            padding: 0 16px 0 16px;

            img {
              height: 80px;
              width: 80px;
              margin: 0 auto;
              padding: 0 0 8px 0;
            }
            .version {
              text-align: center;
              font-size: 22px;
              font-weight: bold;
            }
          }
        }
      }
    }
  }
</style>

<template>
  <div id="home-content" class="content">
    <div class="samples">
      <div class="single">
        <h2>Single Select</h2>
        <select id="slim-single-select">
          <option value="best">Best</option>
          <option value="select" selected="true">Select</option>
          <option value="ever">Ever</option>
        </select>
      </div>
      <div class="multi">
        <h2>Multi Select</h2>
        <select id="slim-multi-select" multiple>
          <option value="best">Best</option>
          <option value="select" selected="true">Select</option>
          <option value="ever">Ever</option>
        </select>
      </div>
    </div>

    <div class="callouts">
      <div class="features">
        <div class="header"><h2>Features</h2></div>
        <ul class="list">
          <li><img src="images/check-mark.svg" /> No Dependencies</li>
          <li><img src="images/check-mark.svg" /> 20kb - 5kb gzip</li>
          <li><img src="images/check-mark.svg" /> Single Select</li>
          <li><img src="images/check-mark.svg" /> Multiple Select</li>
          <li><img src="images/check-mark.svg" /> Addable Options</li>
          <li><img src="images/check-mark.svg" /> Html Options</li>
          <li><img src="images/check-mark.svg" /> Settable Data</li>
          <li><img src="images/check-mark.svg" /> Callback Events</li>
          <li><img src="images/check-mark.svg" /> Placeholders</li>
          <li><img src="images/check-mark.svg" /> Search</li>
          <li><img src="images/check-mark.svg" /> Disable Options</li>
          <li><img src="images/check-mark.svg" /> Light Css</li>
          <li><img src="images/check-mark.svg" /> Light Color Scheme</li>
          <li><img src="images/check-mark.svg" /> Style Inheritance</li>
          <li><img src="images/check-mark.svg" /> Clean Animations</li>
          <li><img src="images/check-mark.svg" /> Performant</li>
        </ul>
      </div>

      <div class="browsers">
        <div class="header"><h2>Support</h2></div>
        <div class="list">
          <div class="browser">
            <img src="images/ie.svg" />
            <div class="version">11+</div>
          </div>
          <div class="browser">
            <img src="images/chrome.svg" />
            <div class="version">30+</div>
          </div>
          <div class="browser">
            <img src="images/firefox.svg" />
            <div class="version">25+</div>
          </div>
          <div class="browser">
            <img src="images/opera.svg" />
            <div class="version">25+</div>
          </div>
          <div class="browser">
            <img src="images/safari.svg" />
            <div class="version">9+</div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
