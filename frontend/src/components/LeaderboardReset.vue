<template>
    <button @click="resetLeaderboard">Reset Leaderboard</button>
</template>

<script setup lang="ts">
    //upward event 
const emit = defineEmits(["leaderboard-reset"])

async function resetLeaderboard() {
  try {
    await fetch("http://localhost:3000/api/leaderboard/reset", {
      method: "POST"
    })

    emit("leaderboard-reset")
  } catch (err) {
    console.error("Failed to reset leaderboard:", err)
  }
}
</script>

<style scoped>
    button {
        padding: 6px 12px;
        margin-top: 10px;
        cursor: pointer;
    }
</style>
