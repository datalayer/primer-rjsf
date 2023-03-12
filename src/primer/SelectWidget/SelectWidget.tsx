import MenuItem from "@mui/material/MenuItem";
import { FormControl, Select, SelectProps } from "@primer/react";
import {
  ariaDescribedByIds,
  enumOptionsIndexForValue,
  enumOptionsValueForIndex,
  FormContextType,
  RJSFSchema,
  StrictRJSFSchema,
  WidgetProps,
} from "@rjsf/utils";

/** The `SelectWidget` is a widget for rendering dropdowns.
 *  It is typically used with string properties constrained with enum options.
 *
 * @param props - The `WidgetProps` for this component
 */
export default function SelectWidget<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any
>({
  schema,
  id,
  options,
  label,
  required,
  disabled,
  placeholder,
  readonly,
  value,
  multiple,
  autofocus,
  onChange,
  onBlur,
  onFocus,
  rawErrors = [],
  registry,
  uiSchema,
  hideError,
  formContext,
  ...selectFieldProps
}: WidgetProps<T, S, F>) {
  const { enumOptions, enumDisabled, emptyValue: optEmptyVal } = options;

  multiple = typeof multiple === "undefined" ? false : !!multiple;

  const emptyValue = multiple ? [] : "";
  const isEmpty =
    typeof value === "undefined" ||
    (multiple && value.length < 1) ||
    (!multiple && value === emptyValue);

  const _onChange = ({
    target: { value },
  }: React.ChangeEvent<{ value: string }>) =>
    onChange(enumOptionsValueForIndex<S>(value, enumOptions, optEmptyVal));
  const _onBlur =  ({
    target: { value },
  }: React.FocusEvent<{ value: string }>) =>
    onBlur(id, enumOptionsValueForIndex<S>(value, enumOptions, optEmptyVal));
  const _onFocus = ({
    target: { value },
  }: React.FocusEvent<HTMLSelectElement>) =>
    onFocus(id, enumOptionsValueForIndex<S>(value, enumOptions, optEmptyVal));
  const selectedIndexes = enumOptionsIndexForValue<S>(
    value,
    enumOptions,
    multiple
  );

  return (
    <FormControl required={required}>
      <FormControl.Label htmlFor={id}>{label || schema.title}</FormControl.Label>
      <Select
        id={id}
        name={id}
        //label={label || schema.title}
        value={isEmpty ? emptyValue : selectedIndexes}
        disabled={disabled || readonly}
        autoFocus={autofocus}
        placeholder={label || schema.title}
        validationStatus={rawErrors.length > 0 ? "error" : undefined}
        onChange={_onChange}
        onBlur={_onBlur}
        onFocus={_onFocus}
        {...(selectFieldProps as SelectProps)}
        aria-describedby={ariaDescribedByIds<T>(id)}
      >
        {Array.isArray(enumOptions) &&
          enumOptions.map(({ value, label }, i: number) => {
            const disabled: boolean =
              Array.isArray(enumDisabled) && enumDisabled.indexOf(value) !== -1;
            return (
              <Select.Option key={i} value={String(i)} disabled={disabled}>
                {label}
              </Select.Option>
            );
          })}
      </Select>
    </FormControl>
  );
}
