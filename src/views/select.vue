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
  onSubmit(data) {
    toast('You submitted the following values:', {
      description: h('pre', { class: 'bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4' }, h('code', JSON.stringify(data, null, 2))),
      position: 'bottom-right',
      class: 'flex flex-col gap-2',
      style: {
        '--border-radius': 'calc(var(--radius)  + 4px)',
      },
    })
  },
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

  <NotForm :id @submit="submit" @reset="reset()">

    <FieldGroup>

      <NotField name="language" v-slot="{ errors, name, methods }">

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

                <FieldError v-if="errors.length" :errors="errors" />
                
              </FieldContent>


              <Select
                :name="name"
                v-model="state.language"
                @update:model-value="methods.onChange"
                @update:open="(open) => open ? methods.onFocus() : methods.onBlur()"
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
