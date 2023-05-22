import { FormControl } from "@primer/react"
import { Slider } from "@datalayer/primer-addons";
import {
  ariaDescribedByIds,
  FormContextType,
  RJSFSchema,
  StrictRJSFSchema,
  WidgetProps,
  rangeSpec,
} from "@rjsf/utils";

/** The `RangeWidget` component uses the `BaseInputTemplate` changing the type to `range` and wrapping the result
 * in a div, with the value along side it.
 *
 * @param props - The `WidgetProps` for this component
 */
export default function RangeWidget<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any
>(props: WidgetProps<T, S, F>) {
  const {
    value,
    readonly,
    disabled,
    options,
    schema,
    onChange,
    label,
    id,
  } = props;
  const sliderProps = { value, label, id, name: id, ...rangeSpec<S>(schema) };

  const _onChange = (value?: number) => {
    onChange(value ?? options.emptyValue);
  };

  return (
    <>
      <FormControl.Label htmlFor={id}>
        {label || schema.title}
      </FormControl.Label>
      <Slider
        disabled={disabled || readonly}
        onChange={_onChange}
        {...sliderProps}
        aria-describedby={ariaDescribedByIds<T>(id)}
      />
    </>
  );
}
