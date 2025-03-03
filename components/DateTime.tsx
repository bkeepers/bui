import { Text } from "./ui/text";

export type Props = Intl.DateTimeFormatOptions & {
  value?: string;
  locale?: Intl.LocalesArgument;
}

export function DateTime({ value, locale, ...options}: Props) {
  const formatter = new Intl.DateTimeFormat(locale, options);

  return (
    <Text>
      {value ? formatter.format(new Date(value)) : "-"}
    </Text>
  );
}
