import { Stack } from 'expo-router';

import { LlocsProvider } from '../data/LlocsContext';

export default function Layout() {
  return (
    <LlocsProvider>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: '#f7f4ed' },
          headerTintColor: '#234c3b',
          contentStyle: { backgroundColor: '#f7f4ed' },
        }}
      >
        <Stack.Screen name="index" options={{ title: 'Lugares de Barcelona' }} />
        <Stack.Screen name="detall/[id]" options={{ title: 'Detalle' }} />
        <Stack.Screen name="afegir" options={{ title: 'Añadir sitio' }} />
      </Stack>
    </LlocsProvider>
  );
}
