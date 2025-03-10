// Adapted from https://github.com/albertjacobsz/ReactNativeBentoBox
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import type { ReactElement, ReactNode } from 'react';

interface GridItemProps {
  children?: ReactNode;
  widthSpan?: number;
  heightSpan?: number;
  columnWidth?: number;
  gap?: number;
  position?: { top: number; left: number };
  style?: object;
}

interface BentoGridProps {
  columns?: number;
  gap?: number;
  width?: number;
  height?: number;
  children: ReactNode;
  style?: object;
}

const canPlaceItem = (
  row: number,
  col: number,
  widthSpan: number,
  heightSpan: number,
  gridMatrix: boolean[][],
  columns: number
): boolean => {
  // gridMatrix should always be defined and fully initialized at this point.
  // We ensure row and col checks before accessing cells.

  // Check for horizontal overflow
  if (col + widthSpan > columns) return false;

  // Check each cell within the intended placement
  for (let r = row; r < row + heightSpan; r++) {
    if (r < 0 || r >= gridMatrix.length) return false; // Ensure row is within range
    const rowData = gridMatrix[r];
    if (!rowData) return false; // Sanity check, should never happen if initialized correctly
    for (let c = col; c < col + widthSpan; c++) {
      if (c < 0 || c >= columns) return false; // Ensure col is within range
      if (rowData[c] !== false) return false; // Cell must be false (unoccupied)
    }
  }
  return true;
};

const fillGrid = (
  row: number,
  col: number,
  widthSpan: number,
  heightSpan: number,
  gridMatrix: boolean[][]
): void => {
  for (let r = row; r < row + heightSpan; r++) {
    const rowData = gridMatrix[r];
    if (rowData === undefined) {
      return;
    }
    for (let c = col; c < col + widthSpan; c++) {
      rowData[c] = true;
    }
  }
};

export const BentoGrid = ({
  columns = 3,
  gap = 10,
  width = 0.9,
  height = 0.9,
  children,
  style,
}: BentoGridProps) => {
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
  const gridWidth = screenWidth * width; // 90% of screen width
  const gridHeight = screenHeight * height; // 90% of screen width
  const columnWidth = (gridWidth - gap * (columns - 1)) / columns;

  const [gridMatrix, setGridMatrix] = useState<boolean[][]>([]);

  useEffect(() => {
    const childCount = React.Children.count(children);
    const rows = Math.ceil(childCount / columns) + 10;
    const initialMatrix = Array.from({ length: rows }, () =>
      Array(columns).fill(false)
    );
    setGridMatrix(initialMatrix);
  }, [children, columns]);

  const placeItemInGrid = (widthSpan: number, heightSpan: number) => {
    if (gridMatrix.length === 0) {
      return { top: 0, left: 0 };
    }

    for (let row = 0; row < gridMatrix.length; row++) {
      for (let col = 0; col < columns; col++) {
        if (
          canPlaceItem(row, col, widthSpan, heightSpan, gridMatrix, columns)
        ) {
          fillGrid(row, col, widthSpan, heightSpan, gridMatrix);
          return { top: row, left: col };
        }
      }
    }

    return { top: 0, left: 0 };
  };

  return (
    <View style={[styles.grid, { width: gridWidth }, style]}>
      {React.Children.toArray(children)
        .filter((child): child is ReactElement<GridItemProps> =>
          React.isValidElement(child)
        )
        .map((child) => {
          const { widthSpan = 1, heightSpan = 1 } = child.props;
          const position = placeItemInGrid(widthSpan, heightSpan);
          return React.cloneElement(child, { columnWidth, gap, position });
        })}
    </View>
  );
};

export const GridItem = ({
  children,
  widthSpan = 1,
  heightSpan = 1,
  columnWidth = 4,
  gap = 10,
  position = { top: 0, left: 0 },
  style,
}: GridItemProps) => {
  const calculatedStyle = {
    width: columnWidth * widthSpan + gap * (widthSpan - 1),
    height: columnWidth * heightSpan + gap * (heightSpan - 1),
    top: position.top * (columnWidth + gap),
    left: position.left * (columnWidth + gap),
  };

  return <View style={[styles.item, calculatedStyle, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  grid: {
    position: 'relative',
    alignSelf: 'center', // Ensure it's centered within the parent,
  },
  item: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
