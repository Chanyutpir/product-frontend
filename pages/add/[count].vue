<template>
  <div class="container my-5">
    <h1 class="text-center">เพิ่มสินค้า</h1>
    <div class="row justify-content-center">
      <div class="col-md-8">
        <form @submit.prevent="addProduct" class="mt-3">
          <div class="mb-3">
            <label for="sku" class="form-label">SKU สินค้า</label>
            <input
              type="text"
              id="sku"
              v-model="newProduct.sku"
              class="form-control"
              required
            />
          </div>

          <div class="mb-3">
            <label for="product_name" class="form-label">ชื่อสินค้า</label>
            <input
              type="text"
              id="product_name"
              v-model="newProduct.product_name"
              class="form-control"
              required
            />
          </div>

          <div class="mb-3">
            <label for="product_image" class="form-label"
              >ลิงค์รูปภาพสินค้า</label
            >
            <input
              type="url"
              id="product_image"
              v-model="newProduct.product_path_img"
              class="form-control"
              required
            />
          </div>

          <div class="mb-3">
            <label for="price" class="form-label">ราคา</label>
            <input
              type="text"
              id="price"
              v-model="newProduct.price"
              class="form-control"
              required
            />
          </div>

          <div class="mb-3">
            <label for="product_detail" class="form-label"
              >รายละเอียดสินค้า</label
            >
            <textarea
              id="product_detail"
              v-model="newProduct.product_detail"
              class="form-control"
              required
            ></textarea>
          </div>

          <div class="mb-3">
            <label for="product_size" class="form-label">ขนาดสินค้า</label>
            <textarea
              id="product_size"
              v-model="newProduct.product_size"
              class="form-control"
              required
            ></textarea>
          </div>

          <div class="mb-3">
            <label for="product_weight" class="form-label">น้ำหนักสินค้า</label>
            <textarea
              id="product_weight"
              v-model="newProduct.product_weight"
              class="form-control"
              required
            ></textarea>
          </div>

          <div class="d-flex justify-content-end">
            <NuxtLink to="/" class="btn btn-secondary">ย้อนกลับ</NuxtLink>
            <button type="submit" class="btn btn-success ms-2">บันทึก</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
const router = useRouter();
const route = useRoute();

var count = parseInt(route.params.count);

const newProduct = ref({
  id: ++count,
  sku: "",
  product_name: "",
  product_path_img: "",
  price: "",
  product_detail: "",
  product_size: "",
  product_weight: "",
});

const addProduct = async () => {
  const product = {
    id: `${newProduct.value.id}`,
    sku: newProduct.value.sku,
    product_name: newProduct.value.product_name,
    product_path_img: newProduct.value.product_path_img,
    price: parseInt(newProduct.value.price),
    product_detail: newProduct.value.product_detail,
    product_size: newProduct.value.product_size,
    product_weight: newProduct.value.product_weight,
  };
  console.log(product, "newProduct");

  const jwt_token = localStorage.getItem("jwt_token");
  if (!jwt_token) {
    alert("You are not authenticated. Please log in.");
    window.location.href = "/login";
    return;
  }

  try {
    const response = await fetch("http://localhost:5000/products", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${jwt_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });
    if (response.ok) {
      router.push("/");
    } else {
      console.error("Failed to add product");
    }
  } catch (error) {
    console.error("Error adding product:", error);
  }
};
</script>
