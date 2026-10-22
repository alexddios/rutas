import { createContext, useContext, useState } from 'react';

import { llocs as llocsInicials } from './llocs';

export const categories = ['Naturaleza', 'Arquitectura', 'Mar', 'Cultura', 'Gastronomía'];

/**
 * @typedef {{ id: string, nombre: string, descripcion: string, categoria: string }} Lloc
 * @typedef {{ nombre: string, descripcion: string, categoria: string }} NouLloc
 * @typedef {{ llocs: Lloc[], afegirLloc: (lloc: NouLloc) => Lloc }} LlocsValue
 */

/** @type {import('react').Context<LlocsValue | null>} */
const LlocsContext = createContext(/** @type {LlocsValue | null} */ (null));

/** @param {{ children: import('react').ReactNode }} props */
export function LlocsProvider({ children }) {
  const [llocs, setLlocs] = useState(/** @type {Lloc[]} */ (llocsInicials));

  /** @param {NouLloc} lloc */
  function afegirLloc({ nombre, descripcion, categoria }) {
    const nou = {
      id: String(Date.now()),
      nombre: nombre.trim(),
      descripcion: descripcion.trim(),
      categoria,
    };
    setLlocs((actuals) => [...actuals, nou]);
    return nou;
  }

  return (
    <LlocsContext.Provider value={{ llocs, afegirLloc }}>{children}</LlocsContext.Provider>
  );
}

export function useLlocs() {
  const context = useContext(LlocsContext);
  if (!context) {
    throw new Error('useLlocs debe usarse dentro de LlocsProvider');
  }
  return context;
}
