<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { Button } from './components/button';
</script>

<template>
  <header>
    <div class="wrapper">

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>

      <Button>Button</Button>
    </div>
  </header>

  <RouterView />
</template>