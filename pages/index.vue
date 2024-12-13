<template>
  <div>
    <div class="row justify-content-center">
      <div class="col-12 text-end">
        <div class="d-flex justify-content-between">
          <h2>รายการสินค้า</h2>
          <NuxtLink :to="`/add/${count}`" class="btn btn-success btn-lg">
            เพิ่มสินค้า +
          </NuxtLink>
        </div>
      </div>
      <div
        class="col-md-6 col-lg-3 mt-4"
        v-for="product in reversedProducts"
        :key="product.id"
      >
        <div class="card shadow-lg">
          <NuxtLink :to="`/products/${product.id}`">
            <img
              :src="`${product.product_path_img}`"
              class="card-img-top"
              :alt="`${product.product_path_img}`"
            />
          </NuxtLink>
          <div class="card-body">
            <h5 class="card-title text-truncate">
              {{ product.product_name }}
            </h5>
            <p class="card-text text-truncate">
              {{ product.product_detail }}
            </p>
            <h5 class="text-end price d-flex justify-content-between">
              <span>ราคา</span> ฿ {{ product.price.toLocaleString() }}
            </h5>
            <div class="d-flex">
              <NuxtLink
                :to="`/products/${product.id}`"
                class="btn btn-primary w-100"
              >
                ดู
              </NuxtLink>
              <NuxtLink
                :to="`/edit/${product.id}`"
                class="btn btn-warning w-100 mx-2"
              >
                แก้ไข
              </NuxtLink>
              <button
                @click="deleteProduct(product.id)"
                class="btn btn-danger w-100"
              >
                ลบ
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
const products = ref([]);
const count = ref(null);
const token = ref("");

const getToken = async () => {
  const jwt_token = localStorage.getItem("jwt_token");
  //   console.log("JWT:", jwt_token);
  if (!jwt_token) {
    alert("You are not authenticated. Please log in.");
    window.location.href = "/login";
    return;
  }
  token.value = jwt_token;
};

const reversedProducts = computed(() => products.value.slice().reverse());

const fetchProducts = async () => {
  getToken();
  try {
    const response = await fetch("http://localhost:5000/products", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token.value}`,
        "Content-Type": "application/json",
      },
    });
    products.value = await response.json();
    count.value = products.value.length;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

const deleteProduct = async (id) => {
  const uri = "http://localhost:5000/products/" + id;
  if (confirm("Delete confirm") == true) {
    try {
      const response = await fetch(uri, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token.value}`,
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        location.reload();
      } else {
        console.error("Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  }
};

onMounted(() => {
  fetchProducts();
});
</script>

<style>
.card {
  border-radius: 15px;
  overflow: hidden;
}
.card-img-top {
  height: 250px;
  object-fit: cover;
  object-position: center;
}
.price {
  color: #f53d2d;
}
</style>
