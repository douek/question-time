<template>
<nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <router-link :to="{name: 'home'}" class="navbar-brand">QuestionsTime</router-link>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse">
    <ul class="navbar-nav ml-auto">
      <li class="nav-item active">
        <router-link class="nav-link" :to="{name: 'home'}">Home</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" :to="{name: 'about'}">New Question</router-link>
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
    name:'Navbar',    
}
</script>

<style scoped>

.navbar-brand{
    font-weight: bold;
    font-size: 130%;
}

.navbar-brand:hover{
    color:palevioletred;
}
</style>