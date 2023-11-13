// src/app/tu-servicio/models/cliente.ts

import { Persona } from '../persona'; // Asegúrate de tener la importación correcta


export interface Cliente {
  clienteId: number;
  personaId: number;
  telefono: string;
  direccion: string;
  preferencias: string;
  puntuacion: number;
  fechaRegistro: Date;
  ultimaCompra: Date;
  categoria: string;
  notas: string;
  persona: Persona;
}

