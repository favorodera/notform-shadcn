<script lang="ts" setup>
defineProps<{
  title: string
  description?: string
}>()
</script>

<template>
  <Card class="
    w-full
    sm:max-w-md
  ">

    <CardHeader>
      <CardTitle> {{ title }}</CardTitle>

      <CardDescription v-if="description">
        {{ description }}
      </CardDescription>

    </CardHeader>

    <CardContent>
      <slot />
    </CardContent>

    <CardFooter><slot name="footer"></slot></CardFooter>
  
  </Card>
</template>
