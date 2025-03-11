import { cardinalFromDegree, CardinalSubset } from "cardinal-direction"
import { TextProps } from "react-native"
import { Text } from "./ui/text"

export type CardinalDirectionProps = TextProps & ({ rad: number } | { deg: number })

export function CardinalDirection({ rad, deg, ...props }: CardinalDirectionProps) {
  if(!deg) deg = rad * 180 / Math.PI;
  return <Text {...props}>{cardinalFromDegree(deg, CardinalSubset.Intercardinal)}</Text>
}
