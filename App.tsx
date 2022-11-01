import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider, Text, Center } from 'native-base';

import { THEME } from "./src/styles/theme"

export default function App() {
  return (
    <NativeBaseProvider theme={THEME}>
      <Center flex={1} bgColor="black" alignItems="center" justifyContent="center">
        <Text color="yellow.600" fontSize={24}>FIFA World Cup!</Text>
        <StatusBar style="auto" />
      </Center>
    </NativeBaseProvider>
  );
}

