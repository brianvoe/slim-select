<script lang="ts">
import { defineComponent } from 'vue'

// Components
import AlwaysOpen from './always_open.vue'
import Closable from './closable.vue'
import CloseOnSelect from './close_on_select.vue'
import ContentLocation from './content_location.vue'
import ContentPosition from './content_position.vue'
import Css from './css.vue'
import DataAttributes from './data_attributes.vue'
import Deselect from './deselect.vue'
import Disabled from './disabled.vue'
import Display from './display.vue'
import HideSelected from './hide_selected.vue'
import Html from './html.vue'
import KeepOrder from './keep_order.vue'
import Mandatory from './mandatory.vue'
import MaxValuesShown from './max_values_shown.vue'
import MinMax from './min_max.vue'
import OpenPosition from './open_position.vue'
import Placeholder from './placeholder.vue'
import Search from './search.vue'
import Select from './select.vue'
import SelectAll from './select_all.vue'
import ShowTooltip from './show_tooltip.vue'
import Styles from './styles.vue'

export default defineComponent({
  name: 'Settings',
  components: {
    Select,
    AlwaysOpen,
    ContentLocation,
    ContentPosition,
    OpenPosition,
    Placeholder,
    Deselect,
    Display,
    Disabled,
    Mandatory,
    MinMax,
    DataAttributes,
    MaxValuesShown,
    Css,
    Styles,
    Html,
    KeepOrder,
    Search,
    CloseOnSelect,
    ShowTooltip,
    SelectAll,
    Closable,
    HideSelected,
  },
})
</script>

<template>
  <div id="settings" class="contents">
    <Select />
    <AlwaysOpen />
    <ContentLocation />
    <ContentPosition />
    <OpenPosition />
    <Placeholder />
    <SelectAll />
    <Deselect />
    <Display />
    <Disabled />
    <Mandatory />
    <MinMax />
    <DataAttributes />
    <Css />
    <Styles />
    <Html />
    <KeepOrder />
    <Search />
    <CloseOnSelect />
    <ShowTooltip />
    <Closable />
    <HideSelected />
    <MaxValuesShown />
  </div>
</template>
