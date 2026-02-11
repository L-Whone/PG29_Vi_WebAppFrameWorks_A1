<template>
    <div class="leaderboard-table">
        <table>
            <thead>
                <tr>
                    <th>RANKING</th>
                    <th>USER</th>
                    <th>SCORE</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="(item, index) in leaderBoardData" :key="index">
                    <td>{{ index + 1 }}</td>
                    <td>{{ item.player }}</td>
                    <td>{{ item.score }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup lang="ts">
    type LeaderboardInfo = {
        player: string
        score: number
    }

    defineProps<{
        leaderBoardData: LeaderboardInfo[]
    }>()
</script>

<style scoped>
    .leaderboard-table {
        margin-top: 10px;
    }

    table {
        width: 50%;
        border-collapse: collapse;
        text-align: center;
    }

    th, td {
        border: 1px solid black;
        padding: 6px;
    }
</style>
