import { router } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { categories, useLlocs } from '../data/LlocsContext';

export default function Afegir() {
  const { afegirLloc } = useLlocs();
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [categoria, setCategoria] = useState(categories[0]);
  const [tocado, setTocado] = useState(false);

  const nombreVacio = nombre.trim() === '';

  function volverALista() {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/');
    }
  }

  function guardar() {
    setTocado(true);
    if (nombreVacio) return;

    const lugar = afegirLloc({ nombre, descripcion, categoria });
    const mensaje = `«${lugar.nombre}» se ha añadido a la lista.`;

    if (Platform.OS === 'web') {
      window.alert(mensaje);
      volverALista();
    } else {
      Alert.alert('Sitio añadido', mensaje, [{ text: 'OK', onPress: volverALista }], {
        cancelable: true,
        onDismiss: volverALista,
      });
    }
  }

  return (
    <SafeAreaView style={styles.pantalla} edges={['bottom', 'left', 'right']}>
      <KeyboardAvoidingView
        style={styles.pantalla}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.contenido} keyboardShouldPersistTaps="handled">
          <View style={styles.campo}>
            <Text style={styles.label}>Nombre *</Text>
            <TextInput
              style={[styles.input, tocado && nombreVacio && styles.inputError]}
              value={nombre}
              onChangeText={setNombre}
              onBlur={() => setTocado(true)}
              placeholder="Ej.: Park Güell"
              placeholderTextColor="#8a8f84"
              returnKeyType="next"
              accessibilityLabel="Nombre del sitio"
            />
            {tocado && nombreVacio && (
              <Text style={styles.error}>El nombre es obligatorio.</Text>
            )}
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>Descripción</Text>
            <TextInput
              style={[styles.input, styles.multilinea]}
              value={descripcion}
              onChangeText={setDescripcion}
              placeholder="¿Qué lo hace especial?"
              placeholderTextColor="#8a8f84"
              multiline
              textAlignVertical="top"
              accessibilityLabel="Descripción del sitio"
            />
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>Categoría</Text>
            <View style={styles.chips} accessibilityRole="radiogroup">
              {categories.map((cat) => {
                const seleccionada = cat === categoria;
                return (
                  <Pressable
                    key={cat}
                    onPress={() => setCategoria(cat)}
                    accessibilityRole="radio"
                    accessibilityState={{ selected: seleccionada }}
                    style={[styles.chip, seleccionada && styles.chipSeleccionado]}
                  >
                    <Text style={[styles.textoChip, seleccionada && styles.textoChipSeleccionado]}>
                      {cat}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          <Pressable
            accessibilityRole="button"
            accessibilityState={{ disabled: nombreVacio }}
            disabled={nombreVacio}
            onPress={guardar}
            style={({ pressed }) => [
              styles.boton,
              nombreVacio && styles.botonDesactivado,
              pressed && styles.pulsado,
            ]}
          >
            <Text style={styles.textoBoton}>Guardar</Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  pantalla: { flex: 1 },
  contenido: {
    padding: 24,
    gap: 24,
    width: '100%',
    maxWidth: 640,
    alignSelf: 'center',
  },
  campo: { gap: 8 },
  label: { fontSize: 14, fontWeight: '700', color: '#234c3b' },
  input: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#dedfd4',
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    color: '#24352b',
    minHeight: 48,
  },
  multilinea: { minHeight: 120 },
  inputError: { borderColor: '#b3261e' },
  error: { color: '#b3261e', fontSize: 14 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    minHeight: 44,
    justifyContent: 'center',
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#234c3b',
    backgroundColor: '#ffffff',
  },
  chipSeleccionado: { backgroundColor: '#234c3b' },
  textoChip: { color: '#234c3b', fontSize: 15, fontWeight: '600' },
  textoChipSeleccionado: { color: '#ffffff' },
  boton: {
    backgroundColor: '#234c3b',
    borderRadius: 10,
    padding: 14,
    minHeight: 48,
    alignItems: 'center',
  },
  botonDesactivado: { opacity: 0.4 },
  pulsado: { opacity: 0.7 },
  textoBoton: { color: '#ffffff', fontSize: 16, fontWeight: '600' },
});
