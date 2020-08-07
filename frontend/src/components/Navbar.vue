<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container">
            <router-link :to="{name: 'home'}" class="navbar-brand">QuestionsTime</router-link>
            <div class="collapse navbar-collapse">
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item active">
                        <router-link class="nav-link" :to="{name: 'home'}">Home</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{name: 'ask'}">Ask Question</router-link>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/accounts/logout/">Logout</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    name: "Navbar"
};
</script>

<style scoped>
.navbar-brand {
    font-weight: bold;
    font-size: 130%;
}

.navbar-brand:hover {
    color: crimson;
}
</style>