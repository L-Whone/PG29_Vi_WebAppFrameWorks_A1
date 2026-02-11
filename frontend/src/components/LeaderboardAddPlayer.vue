<template>
    <button @click="addPlayer">Add Player</button>
</template>

<script setup lang="ts">
    // Emit is an upward event
    const emit = defineEmits(["player-added"])

    async function addPlayer() {
        await fetch("http://localhost:3000/api/leaderboard", {
            method: "POST"
        })

        emit("player-added")
    }
</script>

<style scoped>
    button {
        padding: 6px 12px;
        margin-top: 10px;
        cursor: pointer;
    }
</style>
