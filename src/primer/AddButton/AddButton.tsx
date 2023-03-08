import {
  FormContextType,
  IconButtonProps,
  RJSFSchema,
  StrictRJSFSchema,
  TranslatableString,
} from "@rjsf/utils";
import { IconButton } from "@primer/react";
import { PlusIcon } from '@primer/octicons-react';

export default function AddButton<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any
>({ uiSchema, registry, ...props }: IconButtonProps<T, S, F>) {
  const { translateString } = registry;
  return (
    <IconButton
      variant="primary"
      size="small"
      icon={PlusIcon}
      onClick={e => e.preventDefault()}
      onSubmit={e => e.preventDefault()}
      {...props as any}
    >
      {translateString(TranslatableString.AddItemButton)}
    </IconButton>
  );
}
