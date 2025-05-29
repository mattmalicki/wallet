import React from "react";
import { View, Text, StyleSheet } from "react-native";
const DetailedStatisticsPage = () => {
  return (
    <View style={styles.container}>
      <Text>DetailedStatisticsPage Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export { DetailedStatisticsPage };
