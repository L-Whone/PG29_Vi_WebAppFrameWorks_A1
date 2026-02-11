<script setup lang="ts">
</script>

<template>
    <div id="app">
        <header>
            <nav>
                <router-link to="/">Home</router-link>
                <router-link to="/leaderboard">LeaderBoard</router-link>
                <router-link to="/contact">Contact</router-link>
                <router-link to="/about">About</router-link>
            </nav>
        </header>
        <main>
            <router-view />
        </main>
    </div>
</template>

<style scoped>
    #app {
        min-height: 100vh;
        background-color: #93d9f5
    }

    header {
        background-color: #5b2600;
        padding: 1rem;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    nav {
        display: flex;
        justify-content: center;
    }

        nav a {
            color: white;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 10px;
            transition: background-color 0.3s;
        }
            nav a:hover {
                background-color: #004e6c;
            }

            nav a.router-link-active {
                background-color: #ff6a00;
                color: black
            }

    main {
        padding: 20px;
    }
</style>