<script setup lang="ts">
import { Switch } from '@/components/switch'
import { NotForm, NotField } from 'notform'

const { id, reset, submit, state } = useNotForm({
  schema: z.object({
    twoFactor: z.boolean().refine(val => val === true, {
      message: 'It is highly recommended to enable two-factor authentication.',
    }),
  }),
  initialState: {
    twoFactor: false,
  },
  onSubmit: data => submitToast(data),
})

</script>

<template>
  <Display title="Switch">
    <NotForm
      :id
      @submit="submit"
      @reset="reset()"
    >
      <FieldGroup>
        <NotField
          v-slot="{ errors, name, methods }"
          name="twoFactor"
        >
          <Field
            orientation="horizontal"
            :data-invalid="!!errors.length"
          >
            <FieldContent>
              <FieldLabel :for="name">
                Multi-factor authentication
              </FieldLabel>

              <FieldDescription>
                Enable two-factor authentication to add an extra layer of security to your account.
              </FieldDescription>

              <FieldError
                v-if="errors.length"
                :errors="errors"
              />
            </FieldContent>

            <Switch
              :id="name"
              v-model="state.twoFactor"
              :name="name"
              :aria-invalid="!!errors.length"
              @update:model-value="methods.onBlur()"
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
