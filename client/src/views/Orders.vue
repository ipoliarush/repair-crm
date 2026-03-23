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

const statuses = [
  "in_progress",
  "after_visit",
  "parts",
  "workshop_repair",
  "workshop_diagnostics",
  "info_insurance",
  "waiting_decision",
  "invoice",
  "closed",
  "consultation"
]

const statusLabels = {
  in_progress: "w toku",
  after_visit: "po wizycie",
  parts: "części",
  workshop_repair: "naprawa warsztat",
  workshop_diagnostics: "diagnostyka warsztat",
  info_insurance: "inf - TU",
  waiting_decision: "oczekiwanie decyzji",
  invoice: "fv/rozliczenie",
  closed: "zamknięte",
  consultation: "konsultacja"
}

const updateStatus = async (orderId, status) => {
  await api.put(`/orders/${orderId}`, { status })
  loadOrders()
}

const deleteOrder = async (orderId) => {
  if (confirm("Видалити замовлення?")) {
    await api.delete(`/orders/${orderId}`)
    loadOrders()
  }
}

const loadOrders = async () => {
  const res = await api.get("/orders", {
    params: { search: search.value }
  })

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

const editingId = ref(null)
const editForm = ref({})

const startEdit = (order) => {
  editingId.value = order._id
  editForm.value = { ...order }
}

const saveEdit = async () => {
  await api.put(`/orders/${editingId.value}`, editForm.value)

  editingId.value = null
  loadOrders()
}

const cancelEdit = () => {
  editingId.value = null
}

const search = ref("")
let timeout = null

const handleSearch = () => {
  clearTimeout(timeout)

  timeout = setTimeout(() => {
    loadOrders()
  }, 400)
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

    <input
      v-model="search"
      @input="handleSearch"
      placeholder="Search by name or phone"
    />

    <div v-for="order in orders" :key="order._id">

      <!-- ✏️ режим редагування -->
      <div v-if="editingId === order._id">
        <input v-model="editForm.clientName" />
        <input v-model="editForm.phone" />
        <input v-model="editForm.deviceType" />
        <input v-model="editForm.problem" />

        <button @click="saveEdit">Save</button>
        <button @click="cancelEdit">Cancel</button>
      </div>

      <!-- 📦 звичайний режим -->
      <div v-else>
        <p><b>{{ order.clientName }}</b></p>
        <p>{{ order.deviceType }}</p>

        <select
          :value="order.status"
          @change="e => updateStatus(order._id, e.target.value)"
        >
          <option v-for="s in statuses" :key="s" :value="s">
            {{ statusLabels[s] }}
          </option>
        </select>

        <button @click="startEdit(order)">Edit</button>
        <button @click="deleteOrder(order._id)">Delete</button>
      </div>

      <hr />
    </div>
  </div>
</template>