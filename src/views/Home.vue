<template>
  <div>{{count}}: {{double}}</div>
  <button @click="increment">+1</button>
</template>
<script>
import { ref, computed } from 'vue'
import axios from 'axios'
export default {
    setup(props, context) {
      // axios.get('/Api/123').then(res => {
      //   console.log(res)
      // })

      // axios.get('/Api/gethtml').then(res => {
      //   console.log(res.data)
      // })
      // axios.post('/Api/getQusetion').then(res => {
      //   console.log(res.data)
      // })
      // let params = {
      //   question: "查询问题"
      // }
      // axios.post('/Api/getQ/123?question=查询问题', params).then(res => {
      //   console.log(res.data)
      // })
        let count = ref(1)
        console.log(count)
        let double = computed(() => count.value * 2)
        function increment() {
            count.value++
        }
        // onMounted (() => {
        //   console.log('mounted')
        // })
        return {
            count,
            double,
            increment
        }
    }
}
</script>