<template>
    <div class="leaderboard-page">
        <LeaderBoardHeader />

        <!--These @.... are upward events-->
        <LeaderboardAddPlayer @player-added="fetchLeaderBoardData" /> 
        <LeaderboardReset @leaderboard-reset="fetchLeaderBoardData" /> 
        <!--When the leaderboard is changed, the event fires up into the page vue-->
        <!--Since fetchLeaderBoardData changes the data of the leaderboard, vue reloads it's temmplaet'-->
        <LeaderBoardTable :leaderBoardData="leaderBoardData" />
    </div>
</template>

<script setup lang="ts">
    import { ref, onMounted } from "vue"
    import LeaderBoardHeader from "@/components/LeaderboardHeader.vue"
    import LeaderBoardTable from "@/components/LeaderboardTable.vue"
    import LeaderboardAddPlayer from "@/components/LeaderboardAddPlayer.vue"
    import LeaderboardReset from "@/components/LeaderboardReset.vue"

    type LeaderboardInfo = {
        player: string
        score: number
    }

    const leaderBoardData = ref<LeaderboardInfo[]>([])

    async function fetchLeaderBoardData() {
        try {
            const res = await fetch("http://localhost:3000/api/leaderboard")
            leaderBoardData.value = await res.json()
        } catch (err) {
            console.error("Failed to fetch leaderboard")
        }
    }

    onMounted(fetchLeaderBoardData)
</script>
