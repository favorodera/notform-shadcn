<script setup lang="ts">
import { NotForm, NotField } from 'notform'

const addons = [
  {
    id: 'analytics',
    title: 'Analytics',
    description: 'Advanced analytics and reporting',
  },
  {
    id: 'backup',
    title: 'Backup',
    description: 'Automated daily backups',
  },
  {
    id: 'support',
    title: 'Priority Support',
    description: '24/7 premium customer support',
  },
] as const

const { id, reset, submit, state, setState } = useNotForm({
  schema: z.object({
    plan: z
      .string()
      .min(1, 'Please select a subscription plan')
      .refine(value => value === 'basic' || value === 'pro', {
        message: 'Invalid plan selection. Please choose Basic or Pro',
      }),
    billingPeriod: z
      .string()
      .min(1, 'Please select a billing period'),
    addons: z
      .array(z.string())
      .min(1, 'Please select at least one add-on')
      .max(3, 'You can select up to 3 add-ons')
      .refine(
        value => value.every(addon => addons.some(a => a.id === addon)),
        {
          message: 'You selected an invalid add-on',
        },
      ),
    emailNotifications: z.boolean(),
  }),
  initialState: {
    plan: 'basic',
    billingPeriod: '',
    addons: [],
    emailNotifications: false,
  },
  onSubmit: data => submitToast(data),
})
</script>

<template>
  <Display title="Complex Form">
    <NotForm
      :id
      @submit="submit"
      @reset="reset()"
    >
      <FieldGroup>
        <NotField
          v-slot="{ methods, name, errors }"
          name="plan"
        >
          <FieldSet :data-invalid="!!errors.length">
            <FieldLegend variant="label">
              Subscription Plan
            </FieldLegend>
            <FieldDescription>
              Choose your subscription plan.
            </FieldDescription>
            <RadioGroup
              v-model="state.plan"
              :name="name"
              :aria-invalid="!!errors.length"
              @update:model-value="methods.onBlur()"
            >
              <FieldLabel for="plan-basic">
                <Field orientation="horizontal">
                  <FieldContent>
                    <FieldTitle>Basic</FieldTitle>
                    <FieldDescription>
                      For individuals and small teams
                    </FieldDescription>
                  </FieldContent>
                  <RadioGroupItem
                    id="plan-basic"
                    value="basic"
                  />
                </Field>
              </FieldLabel>
              <FieldLabel for="plan-pro">
                <Field orientation="horizontal">
                  <FieldContent>
                    <FieldTitle>Pro</FieldTitle>
                    <FieldDescription>
                      For businesses with higher demands
                    </FieldDescription>
                  </FieldContent>
                  <RadioGroupItem
                    id="plan-pro"
                    value="pro"
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

        <FieldSeparator />

        <NotField
          v-slot="{ methods, name, errors }"
          name="billingPeriod"
        >
          <Field :data-invalid="!!errors.length">
            <FieldLabel :for="name">
              Billing Period
            </FieldLabel>
            <Select
              v-model="state.billingPeriod"
              :name="name"
              @update:model-value="methods.onBlur()"
            >
              <SelectTrigger
                :id="name"
                :aria-invalid="!!errors.length"
              >
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monthly">
                  Monthly
                </SelectItem>
                <SelectItem value="yearly">
                  Yearly
                </SelectItem>
              </SelectContent>
            </Select>
            <FieldDescription>
              Choose how often you want to be billed.
            </FieldDescription>
            <FieldError
              v-if="errors.length"
              :errors="errors"
            />
          </Field>
        </NotField>

        <FieldSeparator />

        <NotField
          v-slot="{ methods, name, errors }"
          name="addons"
        >
          <FieldSet :data-invalid="!!errors.length">
            <FieldLegend>Add-ons</FieldLegend>
            <FieldDescription>
              Select additional features you'd like to include.
            </FieldDescription>
            <FieldGroup data-slot="checkbox-group">
              <Field
                v-for="addon in addons"
                :key="addon.id"
                orientation="horizontal"
                :data-invalid="!!errors.length"
              >
                <Checkbox
                  :id="`addon-${addon.id}`"
                  :name="name"
                  :aria-invalid="!!errors.length"
                  :model-value="state.addons.includes(addon.id)"
                  @update:model-value="(checked: boolean | 'indeterminate') => {
                    const currentAddons = state.addons || []
                    const newValue = checked
                      ? [...currentAddons, addon.id]
                      : currentAddons.filter((id: string) => id !== addon.id)
                    setState({ addons: newValue })
                    methods.onBlur()
                  }"
                />
                <FieldContent>
                  <FieldLabel :for="`addon-${addon.id}`">
                    {{ addon.title }}
                  </FieldLabel>
                  <FieldDescription>
                    {{ addon.description }}
                  </FieldDescription>
                </FieldContent>
              </Field>
            </FieldGroup>
            <FieldError
              v-if="errors.length"
              :errors="errors"
            />
          </FieldSet>
        </NotField>

        <FieldSeparator />

        <NotField
          v-slot="{ methods, name, errors }"
          name="emailNotifications"
        >
          <Field
            orientation="horizontal"
            :data-invalid="!!errors.length"
          >
            <FieldContent>
              <FieldLabel :for="name">
                Email Notifications
              </FieldLabel>
              <FieldDescription>
                Receive email updates about your subscription
              </FieldDescription>
            </FieldContent>
            <Switch
              :id="name"
              v-model="state.emailNotifications"
              :name="name"
              :aria-invalid="!!errors.length"
              @update:model-value="methods.onBlur()"
            />
            <FieldError
              v-if="errors.length"
              :errors="errors"
            />
          </Field>
        </NotField>

        <FieldSeparator />
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
          Save Preferences
        </Button>
      </Field>
    </template>
  </Display>
</template>
