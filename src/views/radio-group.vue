<script lang="ts" setup>
import { RadioGroup } from '@/components/radio-group'
import { NotForm, NotField } from 'notform'

const plans = [
  {
    id: 'starter',
    title: 'Starter (100K tokens/month)',
    description: 'For everyday use with basic features.',
  },
  {
    id: 'pro',
    title: 'Pro (1M tokens/month)',
    description: 'For advanced AI usage with more features.',
  },
  {
    id: 'enterprise',
    title: 'Enterprise (Unlimited tokens)',
    description: 'For large teams and heavy usage.',
  },
] as const

const { state, id, submit, reset } = useNotForm({
  schema: z.object({
    plan: z.string().min(1, 'You must select a subscription plan to continue.'),
  }),
  initialState: {
    plan: '',
  },
  onSubmit: data => submitToast(data),
})
</script>

<template>
  <Display title="Radio Group">
    <NotForm
      :id="id"
      :state="state"
      @submit="submit"
      @reset="reset()"
    >
      <NotField
        v-slot="{ errors, name, methods }"
        name="plan"
      >
        <FieldSet :data-invalid="!!errors.length">
          <FieldLegend>Plan</FieldLegend>

          <FieldDescription>
            You can upgrade or downgrade your plan at any time.
          </FieldDescription>

          <RadioGroup
            v-model="state.plan"
            :name="name"
            :aria-invalid="!!errors.length"
            @update:model-value="methods.onBlur()"
          >
            <FieldLabel
              v-for="plan in plans"
              :key="plan.id"
              :for="`${name}-${plan.id}`"
            >
              <Field
                orientation="horizontal"
                :data-invalid="!!errors.length"
              >
                <FieldContent>
                  <FieldTitle>{{ plan.title }}</FieldTitle>
                  <FieldDescription>
                    {{ plan.description }}
                  </FieldDescription>
                </FieldContent>

                <RadioGroupItem
                  :id="`${name}-${plan.id}`"
                  :value="plan.id"
                  :aria-invalid="!!errors.length"
                />
              </Field>
            </FieldLabel>
          </RadioGroup>

          <FieldError
            v-if="errors.length"
            :errors="errors"
          />
        </FieldSet>
      </NotField>
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
