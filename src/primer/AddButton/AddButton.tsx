import {
  FormContextType,
  IconButtonProps,
  RJSFSchema,
  StrictRJSFSchema,
  TranslatableString,
} from "@rjsf/utils";
import { IconButton, Tooltip } from "@primer/react";
import { PlusIcon } from '@primer/octicons-react';

export default function AddButton<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any
>({ uiSchema, registry, ...props }: IconButtonProps<T, S, F>) {
  const { translateString } = registry;
  return (
    <Tooltip aria-label={translateString(TranslatableString.AddItemButton)}>
      <IconButton
        variant="primary"
        size="small"
        icon={PlusIcon}
        aria-label={translateString(TranslatableString.AddItemButton)}
        {...props as any}
      />
    </Tooltip>
  );
}
