<script lang="ts">
import { defineComponent } from 'vue'

// Components
import CloseOnSelect from './close_on_select.vue'
import ContentPosition from './content_position.vue'
import Css from './css.vue'
import Data from './data.vue'
import DataAttributes from './data_attributes.vue'
import Deselect from './deselect.vue'
import Display from './display.vue'
import HideSelected from './hide_selected.vue'
import Html from './html.vue'
import Mandatory from './mandatory.vue'
import MinMax from './min_max.vue'
import Placeholder from './placeholder.vue'
import Search from './search.vue'
import Select from './select.vue'
import SelectByGroup from './select_by_group.vue'
import ShowTooltip from './show_tooltip.vue'
import Styles from './styles.vue'

export default defineComponent({
  name: 'Settings',
  components: {
    Select,
    Data,
    Placeholder,
    Deselect,
    Display,
    Mandatory,
    MinMax,
    DataAttributes,
    Css,
    Styles,
    Html,
    Search,
    CloseOnSelect,
    ContentPosition,
    ShowTooltip,
    SelectByGroup,
    HideSelected,
  },
})
</script>

<style lang="scss">
#settings {
  .set-content {
    display: flex;

    > * {
      flex: 0 1 50%;
      width: 48%;
      margin: 0 5px 0 0;

      &:last-child {
        margin: 0 0 0 0;
      }
    }
  }
}
</style>

<template>
  <div id="settings">
    <Select />
    <Data />
    <Search />
    <Placeholder />
    <Deselect />
    <Display />
    <Mandatory />
    <MinMax />
    <DataAttributes />
    <Css />
    <Styles />
    <Html />
    <Search />
    <CloseOnSelect />
    <ContentPosition />
    <ShowTooltip />
    <SelectByGroup />
    <HideSelected />
  </div>
</template>
