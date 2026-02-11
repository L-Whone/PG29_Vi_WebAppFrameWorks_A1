<template>
    <div class="landing-page">
        <h1>HOME</h1>

        <CounterWidget />
    </div>
</template>

<script setup lang="ts">
    import CounterWidget from "@/components/CounterWidget.vue"
</script>

<style scoped>
    .landing-page {
        text-align: center;
        margin-top: 10px;
    }
</style>