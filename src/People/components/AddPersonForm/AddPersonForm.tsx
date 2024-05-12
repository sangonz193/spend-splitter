import { Button } from "@fluentui/react-components"
import { AddRegular } from "@fluentui/react-icons"
import { zodResolver } from "@hookform/resolvers/zod"
import React, { useCallback } from "react"
import { FormProvider } from "react-hook-form"

import {
  addPersonFormSchema,
  AddPersonFormValues,
  useAddPersonForm,
} from "./AddPerson.form"
import { useAddPersonFormStyles } from "./useAddPersonFormStyles"
import { FormInput } from "../../../Form/FormInput"
import { Person } from "../../Person"

export type AddPersonFormProps = {
  children?: undefined
  className?: string
  onPersonCreated: (person: Person) => void
}

const createPerson = (() => {
  let id = 0

  return (fields: { name: string }): Person => ({ id: id++, name: fields.name })
})()

const AddPersonFormComponent: React.FC<AddPersonFormProps> = (props) => {
  const { className } = props

  const form = useAddPersonForm({
    resolver: zodResolver(addPersonFormSchema),
    defaultValues: { name: "" },
  })

  const styles = useAddPersonFormStyles({
    className,
  })

  const handleSubmit = useCallback(
    (values: AddPersonFormValues) => {
      props.onPersonCreated(
        createPerson({
          name: values.name,
        }),
      )
      form.reset()
      form.setFocus("name")
    },
    [form.reset],
  )

  return (
    <FormProvider {...form}>
      <form
        className={styles.wrapper}
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <FormInput<AddPersonFormValues>
          name="name"
          label="Name"
          className={styles.input}
        />

        <Button
          type="submit"
          appearance="primary"
          style={{
            fontSize: 14,
            padding: 5,
            // marginLeft: "auto",
            marginRight: 5,
            marginTop: 28,
            borderRadius: 5,
            alignItems: "center",
          }}
          icon={<AddRegular />}
        />
      </form>
    </FormProvider>
  )
}

export const AddPersonForm = React.memo(AddPersonFormComponent)
