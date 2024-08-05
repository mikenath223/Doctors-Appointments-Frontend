import { PropsWithChildren } from "react";
import { FieldValues, FormProvider, UseFormReturn } from "react-hook-form";

interface FormHookFormProps<TFieldValues extends FieldValues> {}

export function FormHookForm<TFieldValues extends FieldValues = FieldValues>({
  children,
  ...restProps
}: PropsWithChildren<
  FormHookFormProps<TFieldValues> & UseFormReturn<TFieldValues>
>) {
  return (
    <FormProvider {...restProps}>
      <form className="relative flex flex-col gap-4">{children}</form>
    </FormProvider>
  );
}
