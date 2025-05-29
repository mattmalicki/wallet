import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, StyleSheet, Button, TextInput } from "react-native";

function AuthPage() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Tutaj bedzie logo i nazwa Wallet</Text>
      <TextInput />
      <TextInput />
      <Button title="Login" onPress={() => console.log("Login")} />
      <Button
        title="Register"
        onPress={() => navigation.navigate("Register")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export { AuthPage };
