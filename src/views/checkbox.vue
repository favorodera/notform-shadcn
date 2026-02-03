<script setup lang="ts">
import { Checkbox } from '@/components/checkbox'
import { NotForm, NotField } from 'notform'

const tasks = [
  {
    id: 'push',
    label: 'Push notifications',
  },
  {
    id: 'email',
    label: 'Email notifications',
  },
] as const

const { id, submit, reset, state, setState } = useNotForm({
  schema: z.object({
    responses: z.boolean(),
    tasks: z
      .array(z.string())
      .min(1, 'Please select at least one notification type.')
      .refine(
        value => value.every(task => tasks.some(t => t.id === task)),
        {
          message: 'Invalid notification type selected.',
        },
      ),
  }),
  initialState: {
    responses: true,
    tasks: [],
  },
  onSubmit: data => submitToast(data),
})
</script>

<template>
  <Display title="Checkbox">
    <NotForm
      :id
      @submit="submit"
      @reset="reset()"
    >
      <FieldGroup>
        <NotField
          v-slot="{ methods, name, errors }"
          name="responses"
        >
          <FieldSet :data-invalid="!!errors.length">
            <FieldLegend variant="label">
              Responses
            </FieldLegend>

            <FieldDescription>
              Get notified for requests that take time, like research or image
              generation.
            </FieldDescription>

            <FieldGroup data-slot="checkbox-group">
              <Field orientation="horizontal">
                <Checkbox
                  :id="name"
                  v-model="state.responses"
                  :name="name"
                  disabled
                  @update:model-value="methods.onBlur()"
                />
                <FieldLabel
                  :for="name"
                  class="font-normal"
                >
                  Push notifications
                </FieldLabel>
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
          name="tasks"
        >
          <FieldSet :data-invalid="!!errors.length">
            <FieldLegend variant="label">
              Tasks
            </FieldLegend>

            <FieldDescription>
              Get notified when tasks you've created have updates.
            </FieldDescription>

            <FieldGroup data-slot="checkbox-group">
              <Field
                v-for="task in tasks"
                :key="task.id"
                orientation="horizontal"
                :data-invalid="!!errors.length"
              >
                <Checkbox
                  :id="`form-vee-checkbox-${task.id}`"
                  :name="name"
                  :aria-invalid="!!errors.length"
                  :model-value="state.tasks.includes(task.id)"
                  @update:model-value="(checked: boolean | 'indeterminate') => {
                    const currentTasks = state.tasks || [];

                    // Determine the new list of IDs
                    const newValue = checked
                      ? [...currentTasks, task.id] // Add if checked
                      : currentTasks.filter((id: string) => id !== task.id); // Remove if unchecked

                    // Update state and trigger change
                    setState({ tasks: newValue });
                    methods.onBlur();
                  }
                  "
                />
                <FieldLabel
                  :for="`form-vee-checkbox-${task.id}`"
                  class="font-normal"
                >
                  {{ task.label }}
                </FieldLabel>
              </Field>
            </FieldGroup>
            <FieldError
              v-if="errors.length"
              :errors="errors"
            />
          </FieldSet>
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
