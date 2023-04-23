<template>
  <div class="home">
    <h1>{{ $store.state.count }}</h1>
    <h2>{{ $store.getters.countType }}</h2>
    <button @click="add">+</button>
    <button @click="min">-</button>
    <h2>{{ count }}</h2>
    <h2>{{ countType }}</h2>
  </div>
</template>

<script>
// @ is an alias to /src
// import {mapGetters} from 'vuex'
import { mapState, mapGetters } from '../store/myvuex'

export default {
  name: 'Home',
  components: {},
  computed: {
    ...mapState(['count']),
    ...mapGetters(['countType'])
  },
  methods: {
    add() {
      let n = this.$store.state.count
      this.$store.commit('changeCount', ++n)
    },
    min() {
      let n = this.$store.state.count
      this.$store.dispatch('changeCountFn', --n)
    }
  }
}
</script>
