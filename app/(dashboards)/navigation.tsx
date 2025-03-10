import { View } from 'react-native';
import { Dashboard } from '~/components/Dashboard';
import { useSignalK } from '~/hooks/useSignalK';
import { Widget } from '~/components/Widget';
import { Text, StyleSheet, SafeAreaView } from 'react-native';
import { BentoGrid, GridItem } from '~/components/ui/bento'; // Replace with your package import.

export default function Weather() {
  return (
    <Dashboard className="flex-1 items-center justify-center">
      <BentoGrid columns={8} gap={16} width={0.9} style={styles.grid}>
        <GridItem widthSpan={3} heightSpan={4}>
          <Widget><Text>ITEM 1</Text></Widget>
        </GridItem>
        <GridItem widthSpan={4} heightSpan={2}>
          <Widget><Text>ITEM 2</Text></Widget>
        </GridItem>
        <GridItem widthSpan={2} heightSpan={2}>
          <Widget><Text>ITEM 3</Text></Widget>
        </GridItem>
        <GridItem widthSpan={1} heightSpan={1}>
          <Widget><Text>ITEM 4</Text></Widget>
        </GridItem>
        <GridItem widthSpan={2} heightSpan={2}>
          <Widget><Text>ITEM 4</Text></Widget>
        </GridItem>
        <GridItem widthSpan={1} heightSpan={1}>
          <Widget><Text>ITEM 4</Text></Widget>
        </GridItem>
        <GridItem widthSpan={4} heightSpan={2}>
          <Widget><Text>ITEM 5</Text></Widget>
        </GridItem>
        <GridItem widthSpan={5} heightSpan={2}>
          <Widget><Text>ITEM 5</Text></Widget>
        </GridItem>
      </BentoGrid>

      {/* <Widget className="aspect-square w-1/6" />
      <Widget className="w-1/3" />
      <Widget className="aspect-square w-1/6" />
      <Widget className="aspect-square w-1/6" />
      <Widget className="aspect-square w-1/6" />
      <Widget className="aspect-square w-1/6" />
      <Widget className="aspect-square w-1/6" />
      <View className="aspect-square flex flex-col w-1/6 gap-4">
        <Widget className="aspect-[2/1]" />
        <Widget className="aspect-[2/1]" />
      </View> */}
    </Dashboard>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:'100%',
    backgroundColor: 'pink',
  },
  grid: {
    padding: 10,
    // backgroundColor: '#e0e0e0',
  },
  text: {
    textAlign: 'center',
    color: '#fff',
    padding: 10,
  },
});
