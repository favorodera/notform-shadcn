<script setup lang="ts">
import { Input } from '@/components/input'
import { NotForm, NotField } from 'notform'

const { id, reset, submit, state } = useNotForm({
  schema: z.object({
    username: z
      .string()
      .min(3, 'Username must be at least 3 characters.')
      .max(10, 'Username must be at most 10 characters.')
      .regex(
        /^\w+$/,
        'Username can only contain letters, numbers, and underscores.',
      ),
  }),
  initialState: {
    username: '',
  },
   onSubmit: data => submitToast(data),
})

</script>

<template>
<Display title="Input">

  <NotForm :id @submit="submit" @reset="reset()">

    <FieldGroup>

      <NotField name="username" v-slot="{ errors, name, methods }">

        <Field :data-invalid="!!errors.length">

          <FieldLabel :for="name">
            Username
          </FieldLabel>

          <Input
            :id="name"
            v-bind="methods"
            v-model="state.username"
            :aria-invalid="!!errors.length"
            placeholder="shadcn"
            autocomplete="username"
          />

          <FieldDescription>
            This is your public display name. Must be between 3 and 10
            characters. Must only contain letters, numbers, and
            underscores.
          </FieldDescription>

          <FieldError v-if="errors.length" :errors="errors" />

        </Field>

      </NotField>

    </FieldGroup>

  </NotForm>

  <template #footer>
     <Field orientation="horizontal">
        <Button type="reset" variant="outline" :form="id">
          Reset
        </Button>
        <Button type="submit" :form="id">
          Submit
        </Button>
      </Field>
  </template>

</Display>
</template>
