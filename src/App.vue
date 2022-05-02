<template>
  <div class="container">
    <ProductComponent :products="products"/>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import ProductComponent from '@/components/Product/ProductComponent.vue'

import { Product } from '@/interfaces/products.interface'
import productService from '@/services/products'

@Options({
  components: {
    ProductComponent
  }
})
export default class App extends Vue {
  private products: Product[] | undefined = []

  async created () {
    this.products = await productService.get()
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
