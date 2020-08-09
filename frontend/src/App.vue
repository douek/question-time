<template>
    <div id="app">
        <Navbar />
        <router-view />
    </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import { apiService } from "./common/api_service"

export default {
    name: "App",
    components: {
        Navbar
    },
    methods: {
        async setUserInfo() {
            const endpoint = '/api/user/'
            const user = await apiService(endpoint)
            window.localStorage.setItem('username', user['username'])
        }
    },
    created(){
        this.setUserInfo()
    }
};
</script>

<style>
html,
body {
    height: 100%;
    font-family: "Arima Madurai";
}
</style>
