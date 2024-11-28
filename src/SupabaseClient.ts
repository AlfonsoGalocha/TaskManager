// Importamos la librería de supabase
import { createClient } from '@supabase/supabase-js';

// Configuración de la conexión a Supabase
const supabaseUrl = 'https://vwxynjysuybnegrfkpwp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ3eHluanlzdXlibmVncmZrcHdwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIxNzg4MDYsImV4cCI6MjA0Nzc1NDgwNn0.mYKQ_0KylVtEyH8AVUYC_nkrp1Md70xRLyy6I7sZx4s';

// Crear el cliente de Supabase
export const supabase = createClient(supabaseUrl, supabaseKey);

export const testConnection = async () => {
  try {
    const { data, error } = await supabase.from('tasks').select('*').limit(1);
    if (error) {
      console.error('Error al conectar con Supabase:', error);
    } else {
      console.log('Conexión exitosa. Datos:', data);
    }
  } catch (err) {
    console.error('Error inesperado:', err);
  }
};