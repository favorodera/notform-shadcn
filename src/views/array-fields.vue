<script lang="ts" setup>
import { X } from 'lucide-vue-next'
import { NotField, NotForm, NotArrayField } from 'notform'

const { state, id, submit, reset, schema, getFieldErrors } = useNotForm({
  schema: z.object({
    emails: z
      .array(
        z.object({
          address: z.string().email('Enter a valid email address.'),
        }),
      )
      .min(1, 'Add at least one email address.')
      .max(5, 'You can add up to 5 email addresses.'),
  }),
  initialState: {
    emails: [{ address: '' }, { address: '' }],
  },
  onSubmit: data => submitToast(data),
})

const emailsRootErrors = computed(() => getFieldErrors('emails'))
</script>

<template>
  <Display title="Array Fields">
    <NotForm
      :id="id"
      @submit="submit"
      @reset="reset()"
    >
      <FieldSet class="gap-4">
        <FieldLegend variant="label">
          Email Addresses
        </FieldLegend>
        <FieldDescription>
          Add up to 5 email addresses where we can contact you.
        </FieldDescription>

        <FieldGroup class="gap-4">
          <NotArrayField
            v-slot="{ fields, remove,append }"
            name="emails"
            :schema="schema.shape.emails"
          >
            <NotField
              v-for="(field, index) in fields"
              :key="field.key"
              v-slot="{ errors, methods, name }"
              :name="`emails[${index}].address`"
            >
              <Field
                orientation="horizontal"
                :data-invalid="!!errors.length"
              >
                <FieldContent>
                  <InputGroup>
                    <InputGroupInput
                      :id="name"
                      v-bind="methods"
                      v-model="state.emails[index]!.address"
                      :aria-invalid="!!errors.length"
                      placeholder="name@example.com"
                      type="email"
                      autocomplete="email"
                    />

                    <InputGroupAddon
                      v-if="fields.length > 1"
                      align="inline-end"
                    >
                      <InputGroupButton
                        type="button"
                        variant="ghost"
                        size="icon-xs"
                        :aria-label="`Remove email ${index + 1}`"
                        @click="remove(index)"
                      >
                        <X />
                      </InputGroupButton>
                    </InputGroupAddon>
                  </InputGroup>

                  <FieldError
                    v-if="errors.length"
                    :errors="errors"
                  />
                </FieldContent>
              </Field>
            </NotField>

            <Button
              type="button"
              variant="outline"
              size="sm"
              :disabled="state.emails.length >= 5"
              @click="append({address:''})"
            >
              Add Email Address
            </Button>
          </NotArrayField>
        </FieldGroup>

        <FieldError
          v-if="emailsRootErrors.length"
          :errors="emailsRootErrors"
        />

        <FieldSeparator />
      </FieldSet>
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
