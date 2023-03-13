import { ChangeEvent, FocusEvent } from "react";
import { FormControl, Textarea } from "@primer/react";
import {
  ariaDescribedByIds,
  FormContextType,
  RJSFSchema,
  StrictRJSFSchema,
  WidgetProps,
} from "@rjsf/utils";

export default function TextareaWidget<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any
>({
  id,
  placeholder,
  value,
  label,
  disabled,
  autofocus,
  readonly,
  onBlur,
  onFocus,
  onChange,
  options,
  schema,
  uiSchema,
  required,
  rawErrors = [],
  registry,
}: WidgetProps<T, S, F>) {
  const { schemaUtils } = registry;
  const displayLabel =
    schemaUtils.getDisplayLabel(schema, uiSchema) &&
    (!!label || !!schema.title);

  const _onChange = ({ target: { value } }: ChangeEvent<HTMLTextAreaElement>) =>
    onChange(value === "" ? options.emptyValue : value);
  const _onBlur = ({ target: { value } }: FocusEvent<HTMLTextAreaElement>) =>
    onBlur(id, value);
  const _onFocus = ({ target: { value } }: FocusEvent<HTMLTextAreaElement>) =>
    onFocus(id, value);

  return (
    <>      
      <FormControl.Label visuallyHidden={!displayLabel} htmlFor={id}>{label || schema.title}</FormControl.Label>
      <Textarea
        id={id}
        name={id}
        value={value ?? ""}
        placeholder={placeholder}
        autoFocus={autofocus}
        required={required}
        disabled={disabled || readonly}
        validationStatus={rawErrors.length > 0 ? "error" : undefined}
        onChange={_onChange}
        onBlur={_onBlur}
        onFocus={_onFocus}
        block
        aria-describedby={ariaDescribedByIds<T>(id)}
      />
    </>
  );
}
