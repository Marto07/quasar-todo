<template>
    <q-select 
        filled  
        :model-value="ui.theme" 
        :options="themeOptions" 
        label="Color" 
        @update:model-value="onThemeChange" 
        map-options
    />
    <q-select 
        filled 
        :model-value="ui.dark" 
        :options="darkModeOptions" 
        @update:model-value="onDarkModeChange" 
        map-options 
    />

</template>
<script setup>
import { themes } from 'src/themes'
import { useUiStore } from 'src/stores/ui'

const ui = useUiStore()

const themeOptions = Object.entries(themes).map(([key, theme]) => ({
  label: theme.name,
  value: key
}))

const darkModeOptions = [
  { label: 'Light', value: false },
  { label: 'Dark', value: true }
]

const onDarkModeChange = (val) => {
  ui.dark = val.value
}

const onThemeChange = (val) => {
  ui.theme = val.value
}
</script>