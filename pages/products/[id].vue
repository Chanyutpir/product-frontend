<template>
  <NuxtLink to="/" class="btn btn-dark">ย้อนกลับ</NuxtLink>
  <div v-if="product">
    <div class="row mt-3">
      <div class="col-lg-6">
        <img
          :src="`${product.product_path_img}`"
          alt="Product Image"
          class="img-product"
        />
      </div>
      <div class="col-lg-6">
        <h2 class="mt-lg-9 mt-md-3">{{ product.product_name }}</h2>
        <p>{{ product.product_detail }}</p>
        <h4 class="price">ราคา ฿ {{ product.price.toLocaleString() }}</h4>
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

const fetchProductDetails = async () => {
  const token = localStorage.getItem("jwt_token");

  if (!token) {
    alert("You are not authenticated. Please log in.");
    window.location.href = "/login"; // Redirect to login page
    return;
  }

  try {
    const response = await fetch(uri, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    product.value = await response.json();
  } catch (error) {
    console.error("Error fetching product details:", error);
  }
};

onMounted(() => {
  setTimeout(() => {
    fetchProductDetails();
  }, 1000);
});
</script>

<style>
.img-product {
  width: 100%;
  max-height: 350px;
  object-fit: cover;
  border-radius: 10px;
}
</style>
