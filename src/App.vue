<script setup lang="ts">
import { Toaster } from '@/components/sonner'

const router = useRouter()

const pages = computed(() => {
  return router.getRoutes().filter(route => route.name).map((route) => {
    return {
      title: route.meta.title,
      path: route.path,
    }
  })
})

const navigation = computed(() => {
  const currentRoute = router.currentRoute.value
  const currentIndex = pages.value.findIndex(page => page.path === currentRoute.path)
  const prevPage = currentIndex > 0 ? pages.value[currentIndex - 1] : null
  const nextPage = currentIndex < pages.value.length - 1 ? pages.value[currentIndex + 1] : null
  return {
    prevPage,
    nextPage,
  }
})
</script>

<template>
<div class="grid h-dvh grid-cols-1 grid-rows-[auto_1fr_auto]">

    <header class="
      sticky top-0 flex w-full items-center justify-between border-b
      border-dashed border-border p-4
    ">
    <img src="https://notform-docs.vercel.app/logo.svg" alt="Logo" class="h-5">
    <ModeToggle></ModeToggle>
  </header>

  <main class="grid h-full grid-cols-1 place-items-center gap-4 p-4">

    <RouterView v-slot={Component}>
      <KeepAlive>
        <component :is="Component"/>
      </KeepAlive>
    </RouterView>
    
    <div class="
      mx-auto flex w-full max-w-xl flex-wrap items-center justify-between gap-2
    ">
      <Button v-if="navigation.prevPage" as-child>
        <RouterLink :to="navigation.prevPage.path">{{ navigation.prevPage.title }}</RouterLink>
      </Button>

      <Button v-if="navigation.nextPage" as-child class="ml-auto">
        <RouterLink :to="navigation.nextPage.path">{{ navigation.nextPage.title }}</RouterLink>
      </Button>
    </div>

  </main>

   <Toaster/>

</div>

</template>
