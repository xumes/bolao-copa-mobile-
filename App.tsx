import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider, Text, Center } from 'native-base';

export default function App() {
  return (
    <NativeBaseProvider>
      <Center flex={1} bgColor="black" alignItems="center" justifyContent="center">
        <Text color="white" fontSize={24}>FIFA World Cup!</Text>
        <StatusBar style="auto" />
      </Center>
    </NativeBaseProvider>
  );
}

