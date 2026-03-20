<script setup>
import { ref, onMounted } from "vue"
import api from "../api/api"

const orders = ref([])

const loadOrders = async () => {
  const res = await api.get("/orders")
  orders.value = res.data
}

onMounted(loadOrders)
</script>

<template>
  <div>
    <h1>Orders</h1>

    <div v-for="order in orders" :key="order._id">
      <p><b>{{ order.clientName }}</b></p>
      <p>{{ order.deviceType }}</p>
      <p>{{ order.status }}</p>
      <hr />
    </div>
  </div>
</template>