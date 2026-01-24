import { defineStore } from 'pinia'
import { ref } from 'vue'
import { setCssVar } from 'quasar'
import { themes } from 'src/themes'



export const useUiStore = defineStore('ui', () => {
  // state
  const dark = ref(false)
  const leftDrawerOpen = ref(false)
  const theme = ref('blue')


  // actions
  const applyTheme = (themeKey) => {
      const selectedTheme = themes[themeKey]
      if (!selectedTheme) return

      theme.value = themeKey

      setCssVar('primary', selectedTheme.primary)
      setCssVar('secondary', selectedTheme.secondary)
      setCssVar('accent', selectedTheme.accent)
      localStorage.setItem('theme', themeKey)
    }

  const toggleDark = () => {
    dark.value = !dark.value
  }

  const toggleLeftDrawer = () => {
    leftDrawerOpen.value = !leftDrawerOpen.value
  }

  const init = () => {
    const darkMode = localStorage.getItem('dark-mode')
    if (darkMode !== null) {
      dark.value = darkMode === 'true'
    }

    const drawer = localStorage.getItem('left-drawer-open')
    if (drawer !== null) {
      leftDrawerOpen.value = drawer === 'true'
    }

    const savedTheme = localStorage.getItem('theme') || theme.value
    applyTheme(savedTheme)
  }

  return {
    dark,
    leftDrawerOpen,
    toggleDark,
    toggleLeftDrawer,
    init,
    applyTheme,
    theme
  }
})