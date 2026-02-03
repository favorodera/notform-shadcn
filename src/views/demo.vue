<script lang="ts" setup>
import { NotField, NotForm } from 'notform'

const schema = z.object({
  title: z
    .string()
    .min(5, 'Bug title must be at least 5 characters.')
    .max(32, 'Bug title must be at most 32 characters.'),
  description: z
    .string()
    .min(20, 'Description must be at least 20 characters.')
    .max(100, 'Description must be at most 100 characters.'),
})

const { id, state, submit, reset } = useNotForm({
  schema,
  initialState: {
    title: '',
    description: '',
  },
  onSubmit: data => submitToast(data),
})
</script>

<template>
  <Display title="Demo">
    <NotForm
      :id
      @submit="submit"
      @reset="reset()"
    >
      <FieldGroup>
        <NotField
          v-slot="{ errors, name, methods }"
          name="title"
        >
          <Field :data-invalid="!!errors.length">
            <FieldLabel :for="name">
              Bug Title
            </FieldLabel>

            <Input
              :id="name"
              v-bind="methods"
              v-model="state.title"
              placeholder="Login button not working on mobile"
              autocomplete="off"
              :aria-invalid="!!errors.length"
            />
            <FieldError
              v-if="errors.length"
              :errors="errors"
            />
          </Field>
        </NotField>

        <NotField
          v-slot="{ methods, name, errors }"
          name="description"
        >
          <Field :data-invalid="!!errors.length">
            <FieldLabel :for="name">
              Description
            </FieldLabel>

            <InputGroup>
              <InputGroupTextarea
                :id="name"
                v-bind="methods"
                v-model="state.description"
                placeholder="I'm having an issue with the login button on mobile."
                :rows="6"
                class="min-h-24 resize-none"
                :aria-invalid="!!errors.length"
              />
              <InputGroupAddon align="block-end">
                <InputGroupText class="tabular-nums">
                  {{ state.description?.length || 0 }}/100 characters
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>
            <FieldDescription>
              Include steps to reproduce, expected behavior, and what actually
              happened.
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
