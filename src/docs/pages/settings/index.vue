<script lang="ts">
import { defineComponent } from 'vue'

// Components
import AlwaysOpen from './always_open.vue'
import CloseOnSelect from './close_on_select.vue'
import ContentLocation from './content_location.vue'
import ContentPosition from './content_position.vue'
import Css from './css.vue'
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
    AlwaysOpen,
    ContentLocation,
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

<template>
  <div id="settings" class="contents">
    <Select />
    <AlwaysOpen />
    <ContentLocation />
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
