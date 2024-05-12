import { Body1, Label, useId } from "@fluentui/react-components"
import { Dropdown, DropdownProps } from "@fluentui/react-components/unstable"
import React, { useEffect } from "react"
import { FieldPath, FieldValues, useFormContext } from "react-hook-form"

import { useFormInputStyles } from "./useFormDropdownStyles"

export type FormDropdownProps<TFormValues extends FieldValues> = DropdownProps & {
	name: FieldPath<TFormValues>
	label?: string
}

const FormDropdownComponent = <TFormValues extends FieldValues>(props: FormDropdownProps<TFormValues>) => {
	const { name, label, className } = props

	const form = useFormContext<TFormValues>()
	const { ...registerProps } = form.register(props.name)

	const [value, setValue] = React.useState("")

	const defaultId = useId("form-input")
	const id = props.id || defaultId

	const error = form.formState.errors[name]

	useEffect(() => {
		const { unsubscribe } = form.watch((values) => {
			const value = values[name]

			setValue(value)
		})

		setValue(form.getValues(name) ?? "")

		return unsubscribe
	}, [])

	const styles = useFormInputStyles({
		className,
		empty: !value,
	})

	return (
		<div className={styles.wrapper}>
			{label && (
				<Label className={styles.label} htmlFor={id}>
					{label}
				</Label>
			)}

			<Dropdown
				id={id}
				{...props}
				{...registerProps}
				selectedOptions={value ? [value] : []}
				onOptionSelect={(_, data) => {
					form.setValue(name, data.optionValue as never)
				}}
			>
				{props.children}
			</Dropdown>

			{error && <Body1 className={styles.error}>{error.message?.toString() || ""}</Body1>}
		</div>
	)
}

export const FormDropdown = React.memo(FormDropdownComponent) as <T extends FieldValues>(
	props: FormDropdownProps<T>
) => JSX.Element
