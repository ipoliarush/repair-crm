<script setup>
import { ref } from "vue"
import api from "../api/api"
import { useRouter } from "vue-router"

const email = ref("")
const password = ref("")
const router = useRouter()

const login = async () => {
  try {
    const res = await api.post("/auth/login", {
      email: email.value,
      password: password.value
    })

    localStorage.setItem("token", res.data.token)

    router.push("/orders")
  } catch (e) {
    alert("Login error")
  }
}
</script>

<template>
  <div>
    <h1>Login</h1>

    <input v-model="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Password" />

    <button @click="login">Login</button>
  </div>
</template>