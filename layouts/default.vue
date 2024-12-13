<template>
  <div>
    <nav class="navbar navbar-light bg-light">
      <div class="container">
        <a class="navbar-brand" href="#">ร้านค้า</a>
        <div class="d-flex">
          <NuxtLink to="/login" class="btn btn-outline-success"
            >เข้าสู่ระบบ</NuxtLink
          >
          <button @click="logout" class="btn btn-outline-danger ms-3">
            ออกจากระบบ
          </button>
        </div>
      </div>
    </nav>
    <div class="container py-4">
      <slot />
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();

const logout = () => {
  localStorage.removeItem("jwt_token");
  router.push("/login");
};
</script>
