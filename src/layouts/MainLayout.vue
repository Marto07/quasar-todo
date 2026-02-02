<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="ui.toggleLeftDrawer"
        />
          <q-toolbar-title>
            Quasar App
          </q-toolbar-title>
        <div>
          <q-toggle
            v-model="ui.dark"
            checked-icon="dark_mode"
            unchecked-icon="light_mode"
            color="secondary"
          />
        </div>
      </q-toolbar>
    </q-header>
    <q-footer reveal elevated>
      <q-tabs>
        <q-route-tab to="/" name="home" icon="home" label="Home"/>
        <q-route-tab to="/todo" name="todo" icon="list" label="ToDo"/>
        <q-route-tab to="/settings" name="settings" icon="settings" label="Settings"/>
      </q-tabs>
    </q-footer>
    <q-drawer
      v-model="ui.leftDrawerOpen"
      bordered
    >
      <q-list>

        <q-item-label header>Navigation</q-item-label>

        <q-item clicable to="/">
          <q-item-section avatar>
            <q-icon name="home" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Home</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clicable to="/todo">
          <q-item-section avatar>
            <q-icon name="school" />
          </q-item-section>
          <q-item-section>
            <q-item-label>To do</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clicable to="/settings">
          <q-item-section avatar>
            <q-icon name="settings" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Settings</q-item-label>
          </q-item-section>
        </q-item>
        

      </q-list>
    </q-drawer>

    <q-page-container>
        <transition name="slide" mode="out-in">
          <router-view />
        </transition>      
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { useQuasar } from 'quasar'
import { useUiStore } from 'stores/ui'
import { watch } from 'vue'

const $q = useQuasar()
const ui = useUiStore()

ui.init()

watch(
  () => ui.dark,
  (val) => {
    $q.dark.set(val)
    localStorage.setItem('dark-mode', String(val))
  },
  { immediate: true }
)

watch(
  () => ui.theme,
  (val) => {
    localStorage.setItem('theme', val)
    ui.applyTheme(val)
  },
  { immediate: true }
)

watch(
  () => ui.leftDrawerOpen,
  (val) => {
    localStorage.setItem('left-drawer-open', String(val))
  }
)
</script>



