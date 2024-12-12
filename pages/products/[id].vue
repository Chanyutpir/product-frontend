<template>
  <NuxtLink to="/" class="btn btn-secondary">ย้อนกลับ</NuxtLink>
    <div v-if="product">
    <div class="row mt-3">
      <div class="col-md-6">
        <img
          :src="`${product.product_path_img}`"
          alt="Product Image"
          class="img-product"
        />
      </div>
      <div class="col-md-6">
        <h2>{{ product.product_name }}</h2>
        <p>{{ product.product_detail }}</p>
        <!-- <button class="btn btn-dark">Add to Cart</button> -->
      </div>
    </div>
  </div>
  <div v-else>
    <p class="text-center">Loading product details...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const product = ref(null);
const route = useRoute();
const id = parseInt(route.params.id);
const uri = "http://localhost:5000/products/" + id;
// console.log(uri, "uri");
// console.log(typeof id, "product_id");

const fetchProductDetails = async () => {
  try {
    const response = await fetch(uri);
    product.value = await response.json();
  } catch (error) {
    console.error("Error fetching product details:", error);
  }
};

onMounted(() => {
  setInterval(() => {
    fetchProductDetails();
  }, 1000);
});
</script>

<style>
.img-product {
  width: 100%;
  height: 450px;
  object-fit: cover;
  border-radius: 10px;
}
</style>
