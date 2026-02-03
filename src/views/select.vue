<script setup lang="ts">
import { Select } from '@/components/select'
import { NotForm, NotField } from 'notform'

const { id, reset, submit, state } = useNotForm({
  schema: z.object({
    language: z
      .string()
      .min(1, 'Please select your spoken language.')
      .refine(value => value !== 'auto', {
        message:
          'Auto-detection is not allowed. Please select a specific language.',
      }),
  }),
  initialState: {
    language: '',
  },
  onSubmit: data => submitToast(data),
})

const spokenLanguages = [
  { label: 'English', value: 'en' },
  { label: 'Spanish', value: 'es' },
  { label: 'French', value: 'fr' },
  { label: 'German', value: 'de' },
  { label: 'Italian', value: 'it' },
  { label: 'Chinese', value: 'zh' },
  { label: 'Japanese', value: 'ja' },
] as const

</script>

<template>
  <Display title="Select">
    <NotForm
      :id
      @submit="submit"
      @reset="reset()"
    >
      <FieldGroup>
        <NotField
          v-slot="{ errors, name, methods }"
          name="language"
        >
          <Field
            orientation="responsive"
            :data-invalid="!!errors.length"
          >
            <FieldContent>
              <FieldLabel :for="name">
                Spoken Language
              </FieldLabel>

              <FieldDescription>
                For best results, select the language you speak.
              </FieldDescription>

              <FieldError
                v-if="errors.length"
                :errors="errors"
              />
            </FieldContent>


            <Select
              v-model="state.language"
              :name="name"
              @update:model-value="methods.onBlur()"
            >
              <SelectTrigger
                :id="name"
                :aria-invalid="!!errors.length"
                class="min-w-[120px]"
              >
                <SelectValue placeholder="Select" />
              </SelectTrigger>

              <SelectContent position="item-aligned">
                <SelectItem value="auto">
                  Auto
                </SelectItem>

                <SelectSeparator />

                <SelectItem
                  v-for="language in spokenLanguages"
                  :key="language.value"
                  :value="language.value"
                >
                  {{ language.label }}
                </SelectItem>
              </SelectContent>
            </Select>
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
