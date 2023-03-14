import { TriangleDownIcon } from "@primer/octicons-react";
import { Button, FormControl, Select, SelectPanel, SelectProps } from "@primer/react";
import {
  ariaDescribedByIds,
  enumOptionsIndexForValue,
  enumOptionsValueForIndex,
  FormContextType,
  RJSFSchema,
  StrictRJSFSchema,
  WidgetProps,
} from "@rjsf/utils";
import { useState } from "react";

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
  const [open, setOpen] = useState(false)

  multiple = typeof multiple === "undefined" ? false : !!multiple;

  const emptyValue = multiple ? [] : "";
  const isEmpty =
    typeof value === "undefined" ||
    (multiple && value.length < 1) ||
    (!multiple && value === emptyValue);
 
  const items = enumOptions?.map(({ value, label }, i: number) => {
    const disabled: boolean =
      Array.isArray(enumDisabled) && enumDisabled.indexOf(value) !== -1;
    return {
      text: label,
      id: i,
      disabled,
    }
  });

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
    <FormControl id={id} required={required}>
      <FormControl.Label visuallyHidden={!(label || schema.title)} htmlFor={id}>{label || schema.title}</FormControl.Label>
      {(multiple && Array.isArray(enumOptions)) ? <SelectPanel
        placeholderText={(label || schema.title) ?? ""}
        renderAnchor={({children, 'aria-labelledby': ariaLabelledBy, ...anchorProps}) => (
          <Button
            trailingAction={TriangleDownIcon}
            aria-labelledby={` ${ariaLabelledBy}`}
            {...anchorProps}
            onClick={(e: any) => {
              setOpen(!open)
              e.preventDefault()
            }}
          >
            {children || 'Select Labels'}
          </Button>
        )}
        open={open}
        onOpenChange={setOpen}
        items={items ?? []}
        selected={
          (items ?? []).filter((val, i: number) => {
            return selectedIndexes?.includes(String(i))
          })}
        onSelectedChange={
          (selected: any) => {
            onChange(enumOptionsValueForIndex<S>(selected.map((v:any) => v.id), enumOptions, optEmptyVal))
          }
        }
        onFilterChange={() => null}
        showItemDividers
        overlayProps={{width: 'small'}}
      /> : <Select
        name={id}
        value={isEmpty ? emptyValue : selectedIndexes}
        disabled={disabled || readonly}
        autoFocus={autofocus}
        placeholder={label || schema.title}
        validationStatus={rawErrors.length > 0 ? "error" : undefined}
        onChange={_onChange}
        onBlur={_onBlur}
        onFocus={_onFocus}
        defaultValue={undefined}
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
      </Select>}
    </FormControl>
  );
}
