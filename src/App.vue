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
  <main class="flex h-dvh flex-col items-center justify-center gap-2 p-4">
    <div class="
      mx-auto flex w-full max-w-xl flex-wrap items-center justify-between gap-2
    ">
      <Button v-if="navigation.prevPage" as-child size="sm">
        <RouterLink :to="navigation.prevPage.path">{{ navigation.prevPage.title }}</RouterLink>
      </Button>
      

      <Button v-if="navigation.nextPage" as-child class="ml-auto" size="sm">
        <RouterLink :to="navigation.nextPage.path">{{ navigation.nextPage.title }}</RouterLink>
      </Button>
    </div>


    <RouterView v-slot={Component}>
      <KeepAlive>
        <component :is="Component"/>
      </KeepAlive>
    </RouterView>

    <Button variant="link" as-child>
        <a href="https://notform-docs.vercel.app/" target="_blank" rel="noopener">
          Docs
        </a>
      </Button>

   <Toaster/>

  </main>
</template>
