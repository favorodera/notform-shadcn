<script setup lang="ts">
import { Textarea } from '@/components/textarea'
import { NotForm, NotField } from 'notform'

const { id, reset, submit, state } = useNotForm({
  schema: z.object({
    about: z
      .string()
      .min(3, 'About must be at least 3 characters.')
      .max(100, 'About must be at most 100 characters.'),
  }),
  initialState: {
    about: '',
  },
  onSubmit: data => submitToast(data),
})

</script>

<template>
  <Display title="Textarea">
    <NotForm
      :id
      @submit="submit"
      @reset="reset()"
    >
      <FieldGroup>
        <NotField
          v-slot="{ errors, name, methods }"
          name="about"
        >
          <Field :data-invalid="!!errors.length">
            <FieldLabel :for="name">
              More about you
            </FieldLabel>

            <Textarea
              :id="name"
              v-bind="methods"
              v-model="state.about"
              placeholder="I'm a software engineer..."
              class="min-h-[120px]"
              :aria-invalid="!!errors.length"
            />

            <FieldDescription>
              Tell us more about yourself. This will be used to help us personalize your experience.
            </FieldDescription>

            <FieldError
              v-if="errors.length"
              :errors="errors"
            />
          </Field>
        </NotField>
      </FieldGroup>
    </NotForm>

    <template #footer>
      <Field orientation="horizontal">
        <Button
          type="reset"
          variant="outline"
          :form="id"
        >
          Reset
        </Button>
        <Button
          type="submit"
          :form="id"
        >
          Submit
        </Button>
      </Field>
    </template>
  </Display>
</template>
