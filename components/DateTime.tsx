import { ViewProps } from "react-native";
import { Text } from "./ui/text";

export type Props = ViewProps & Intl.DateTimeFormatOptions & {
  value?: string;
  locale?: Intl.LocalesArgument;
}

export function DateTime({ value, locale, className, ...options}: Props) {
  const formatter = new Intl.DateTimeFormat(locale, options);

  return (
    <Text className={className}>
      {value ? formatter.format(new Date(value)) : "-"}
    </Text>
  );
}
