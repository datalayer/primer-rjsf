import { IconButton, IconButtonProps as PrimerIconButtonProps, Tooltip } from "@primer/react";
import { CopyIcon, ArrowUpIcon, ArrowDownIcon, TrashIcon, Icon } from '@primer/octicons-react';
import {
  FormContextType,
  IconButtonProps,
  RJSFSchema,
  StrictRJSFSchema,
  TranslatableString,
} from "@rjsf/utils";

export default function PrimerIconButton<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any
>({uiSchema, color, title, icon, ...props }: Omit<IconButtonProps<T, S, F>, "icon"> & {icon: Icon}) {
  if (!color) color = "primary"
  return (
    <Tooltip sx={{p: 1}} aria-label={color}>
      <IconButton
        variant={color as PrimerIconButtonProps["variant"]}
        size="small"
        icon={icon}
        onClick={(e: any) => e.preventDefault()}
        onSubmit={(e: any) => e.preventDefault()}
        aria-label={title}
        {...props as any}
      />
    </Tooltip>
  );
}

export function CopyButton<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any
>(props: IconButtonProps<T, S, F>) {
  const {
    registry: { translateString },
  } = props;
  return (
    <PrimerIconButton
      title={translateString(TranslatableString.CopyButton)}
      {...props}
      icon={CopyIcon}
    />
  );
}

export function MoveDownButton<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any
>(props: IconButtonProps<T, S, F>) {
  const {
    registry: { translateString },
  } = props;
  return (
    <PrimerIconButton
      title={translateString(TranslatableString.MoveDownButton)}
      {...props}
      icon={ArrowDownIcon}
    />
  );
}

export function MoveUpButton<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any
>(props: IconButtonProps<T, S, F>) {
  const {
    registry: { translateString },
  } = props;
  return (
    <PrimerIconButton
      title={translateString(TranslatableString.MoveUpButton)}
      {...props}
      icon={ArrowUpIcon}
    />
  );
}

export function RemoveButton<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any
>(props: IconButtonProps<T, S, F>) {
  const { iconType, ...otherProps } = props;
  const {
    registry: { translateString },
  } = otherProps;
  return (
    <PrimerIconButton
      title={translateString(TranslatableString.RemoveButton)}
      {...otherProps}
      color="danger"
      icon={TrashIcon}
    />
  );
}
