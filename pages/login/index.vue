<template>
  <div class="container my-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card p-5 shadow-lg">
          <h2 class="text-center mb-3">เข้าสู่ระบบ</h2>
          <form @submit.prevent="login">
            <div class="mb-3">
              <label for="username" class="form-label">ชื่อผู้ใช้</label>
              <input
                type="text"
                id="username"
                v-model="credentials.username"
                class="form-control"
                required
              />
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">รหัสผ่าน</label>
              <input
                type="password"
                id="password"
                v-model="credentials.password"
                class="form-control"
                required
              />
            </div>
            <button type="submit" class="btn btn-outline-success w-100">
              เข้าสู่ระบบ
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const credentials = ref({
  username: "",
  password: "",
});

const router = useRouter();

const login = async () => {
  try {
    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials.value),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("jwt_token", data.token, { expires: "24h" });
      router.push("/"); // Redirect after successful login
    } else {
      alert("Invalid login credentials");
      console.error("Invalid login credentials");
    }
  } catch (error) {
    console.error("Error during login:", error);
  }
};
</script>

<style>
.card {
  border-radius: 20px;
}
</style>
