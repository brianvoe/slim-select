<script lang="ts">
import { defineComponent } from 'vue'

import AdSlot from '../../components/adslot.vue'

// Sections
import AlwaysOpen from './always_open.vue'
import Closable from './closable.vue'
import CloseOnSelect from './close_on_select.vue'
import ContentLocation from './content_location.vue'
import ContentPosition from './content_position.vue'
import ContentWidth from './content_width.vue'
import Classes from './classes.vue'
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
import ShowSearch from './show_search.vue'
import FocusSearch from './focus_search.vue'
import KeepSearch from './keep_search.vue'
import SearchText from './search_text.vue'
import SearchPlaceholder from './search_placeholder.vue'
import SearchHighlight from './search_highlight.vue'
import Select from './select.vue'
import SelectAll from './select_all.vue'
import ShowTooltip from './show_tooltip.vue'

export default defineComponent({
  name: 'Settings',
  components: {
    Select,
    Classes,
    AdSlot,
    AlwaysOpen,
    ContentLocation,
    ContentPosition,
    ContentWidth,
    OpenPosition,
    Placeholder,
    SelectAll,
    Deselect,
    Display,
    Disabled,
    Mandatory,
    MinMax,
    DataAttributes,
    Html,
    KeepOrder,
    ShowSearch,
    FocusSearch,
    KeepSearch,
    SearchText,
    SearchPlaceholder,
    SearchHighlight,
    CloseOnSelect,
    ShowTooltip,
    Closable,
    HideSelected,
    MaxValuesShown
  }
})
</script>

<template>
  <div id="settings" class="contents">
    <Select />
    <Classes />
    <AdSlot ad-slot="1270131515" />

    <AlwaysOpen />
    <ContentLocation />
    <AdSlot ad-slot="1270131515" />

    <ContentPosition />
    <ContentWidth />
    <AdSlot ad-slot="1270131515" />

    <OpenPosition />
    <Placeholder />
    <AdSlot ad-slot="1270131515" />

    <SelectAll />
    <Deselect />
    <AdSlot ad-slot="1270131515" />

    <Display />
    <Disabled />
    <AdSlot ad-slot="1270131515" />

    <Mandatory />
    <MinMax />
    <AdSlot ad-slot="1270131515" />

    <DataAttributes />
    <Html />
    <AdSlot ad-slot="1270131515" />

    <KeepOrder />
    <ShowSearch />
    <AdSlot ad-slot="1270131515" />

    <FocusSearch />
    <KeepSearch />
    <AdSlot ad-slot="1270131515" />

    <SearchText />
    <SearchPlaceholder />
    <AdSlot ad-slot="1270131515" />

    <SearchHighlight />
    <CloseOnSelect />
    <AdSlot ad-slot="1270131515" />

    <ShowTooltip />
    <Closable />
    <AdSlot ad-slot="1270131515" />

    <HideSelected />
    <MaxValuesShown />
  </div>
</template>
