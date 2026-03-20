<script setup>
import { ref, onMounted } from "vue"
import api from "../api/api"

const orders = ref([])

const form = ref({
  clientName: "",
  phone: "",
  deviceType: "",
  problem: ""
})

const loadOrders = async () => {
  const res = await api.get("/orders")
  orders.value = res.data
}

const createOrder = async () => {
  await api.post("/orders", form.value)

  // очистка форми
  form.value = {
    clientName: "",
    phone: "",
    deviceType: "",
    problem: ""
  }

  // оновлення списку
  loadOrders()
}

onMounted(loadOrders)
</script>

<template>
  <div>
    <h1>Orders</h1>

    <!-- 🔥 Форма -->
    <div>
      <h3>New Order</h3>

      <input v-model="form.clientName" placeholder="Client name" />
      <input v-model="form.phone" placeholder="Phone" />
      <input v-model="form.deviceType" placeholder="Device" />
      <input v-model="form.problem" placeholder="Problem" />

      <button @click="createOrder">Create</button>
    </div>

    <hr />

    <!-- 📦 Список -->
    <div v-for="order in orders" :key="order._id">
      <p><b>{{ order.clientName }}</b></p>
      <p>{{ order.deviceType }}</p>
      <p>{{ statusLabels[order.status] || order.status }}</p>
      <hr />
    </div>
  </div>
</template>