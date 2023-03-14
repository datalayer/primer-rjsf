import {FormControl, Radio, RadioGroup} from "@primer/react";
import {
  ariaDescribedByIds,
  enumOptionsIndexForValue,
  enumOptionsValueForIndex,
  optionId,
  FormContextType,
  RJSFSchema,
  StrictRJSFSchema,
  WidgetProps,
} from "@rjsf/utils";

/** The `RadioWidget` is a widget for rendering a radio group.
 *  It is typically used with a string property constrained with enum options.
 *
 * @param props - The `WidgetProps` for this component
 */
export default function RadioWidget<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any
>({
  id,
  schema,
  options,
  value,
  required,
  disabled,
  readonly,
  label,
  onChange,
  onBlur,
  onFocus,
}: WidgetProps<T, S, F>) {
  const { enumOptions, enumDisabled, emptyValue } = options;

  const _onChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) =>
    onChange(enumOptionsValueForIndex<S>(value, enumOptions, emptyValue));
  const _onBlur = ({ target: { value } }: React.FocusEvent<HTMLInputElement>) =>
    onBlur(id, enumOptionsValueForIndex<S>(value, enumOptions, emptyValue));
  const _onFocus = ({
    target: { value },
  }: React.FocusEvent<HTMLInputElement>) =>
    onFocus(id, enumOptionsValueForIndex<S>(value, enumOptions, emptyValue));

  return (
    <RadioGroup name={id} required={required}>
      <RadioGroup.Label>
        {label || schema.title}
      </RadioGroup.Label>
      <>
        {Array.isArray(enumOptions) &&
          enumOptions.map((option, index) => {
            console.log(option)
            const itemDisabled =
              Array.isArray(enumDisabled) &&
              enumDisabled.indexOf(option.value) !== -1;
            const radio = (
              <FormControl id={optionId(id, index)} key={optionId(id, index)}>
                <Radio
                  value={String(index)}
                  onChange={_onChange}
                  onBlur={_onBlur}
                  onFocus={_onFocus}
                  aria-describedby={ariaDescribedByIds<T>(id)}
                  key={index}
                  disabled={disabled || itemDisabled || readonly}
                />
                <FormControl.Label>
                  {option.label}
                </FormControl.Label>
              </FormControl>
            );

            return radio;
          })}
      </>
    </RadioGroup>
  );
}
