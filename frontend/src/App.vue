<template>
    <div id="app">
        <Navbar />
        <router-view />
    </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";

export default {
    name: "App",
    components: {
        Navbar
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
