<template>
  <div>{{count}}: {{double}}</div>
  <button @click="increment">+1</button>
</template>
<script>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
export default {
    setup(props, context) {
      let count = ref(1)
      console.log(count)
      let double = computed(() => count.value * 2)
      function increment() {
          count.value++
      }
       onMounted(() => {
        console.log('Component is mounted!')
      })
      return {
        count,
        double,
        increment
      }
    }
}
</script>