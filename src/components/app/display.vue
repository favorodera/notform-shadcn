<script lang="ts" setup>
defineProps<{
  title: string
}>()
</script>

<template>
  <Card class="
    w-full
    sm:max-w-xl
  ">

    <CardHeader>
      <CardTitle> {{ title }}</CardTitle>

      <CardDescription>
        Demo for {{ title }}
      </CardDescription>

    </CardHeader>

    <CardContent>
      <slot />
    </CardContent>

    <CardFooter><slot name="footer"></slot></CardFooter>
  
  </Card>
</template>
