import { cssInterop } from 'nativewind';
import React, { useState } from 'react'
import { LayoutChangeEvent, View } from 'react-native'
import * as shape from 'd3-shape'
import { Svg, G, SvgProps, Path } from './svg'

cssInterop(ProgressCircle, {
  className: {
    target: false,
    nativeStyleToProp: {
      color: "progressColor",
      backgroundColor: true,
      width: true,
      height: true,
    }
  }
})

export type ProgressCircleProps = SvgProps & {
  progress: number,
  progressColor?: any,
  backgroundColor?: any,
  startAngle?: number,
  endAngle?: number,
  cornerRadius?: number,
  animate?: boolean,
  animateDuration?: number,
}

export function ProgressCircle(props: ProgressCircleProps) {
  const {
    progressColor = 'black',
    backgroundColor = '#ECECEC',
    strokeWidth = 5,
    startAngle = 0,
    endAngle = Math.PI * 2,
    cornerRadius = 45,
    style,
    animate,
    animateDuration,
    children,
  } = props;

  let { progress } = props

  const [layout, setLayout] = useState({ height: 0, width: 0 });

  function onLayout(event: LayoutChangeEvent) {
    setLayout(event.nativeEvent.layout)
  }

  const { height, width } = layout
  const outerDiameter = Math.min(width, height)

  if (!isFinite(progress) || isNaN(progress)) {
    progress = 0
  }

  // important order to have progress render over "rest"
  const data = [
    {
      key: 'rest',
      value: 1 - progress,
      color: backgroundColor,
    },
    {
      key: 'progress',
      value: progress,
      color: progressColor,
    },
  ]

  const pieSlices = shape
    .pie()
    .value((d) => d.value)
    .sort((a) => (a.key === 'rest' ? 1 : -1))
    .startAngle(startAngle)
    .endAngle(endAngle)(data)

  const arcs = pieSlices.map((slice, index) => ({
    ...data[index],
    ...slice,
    path: shape
      .arc()
      .outerRadius(outerDiameter / 2) // Radius of the pie
      .innerRadius(outerDiameter / 2 - Number(strokeWidth)) // Inner radius: to create a donut or pie
      .startAngle(index === 0 ? startAngle : slice.startAngle)
      .endAngle(index === 0 ? endAngle : slice.endAngle)
      .cornerRadius(cornerRadius)(),
  }))

  const extraProps = {
    width,
    height,
  }

  return (
    <View style={style} onLayout={onLayout}>
      {height > 0 && width > 0 && (
        <Svg style={{ height, width }}>
          {/* center the progress circle*/}
          <G x={width / 2} y={height / 2}>
            {React.Children.map(children, (child) => {
              if (child && child.props.belowChart) {
                return React.cloneElement(child, extraProps)
              }
              return null
            })}
            {arcs.map((shape, index) => {
              return (
                <Path
                  key={index}
                  fill={shape.color}
                  d={shape.path}
                />
              )
            })}
            {React.Children.map(children, (child) => {
              if (child && !child.props.belowChart) {
                return React.cloneElement(child, extraProps)
              }
              return null
            })}
          </G>
        </Svg>
      )}
    </View>
  )
}
