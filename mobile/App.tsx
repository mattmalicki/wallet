import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthPage } from "./page/Auth/Auth";
import { StatisticsPage } from "./page/Statistics/Statistics";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={AuthPage} />
        <Stack.Screen
          name="Register"
          component={AuthPage}
          options={{ isRegister: true }}
        />
        <Stack.Screen name="Statistics" component={StatisticsPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
