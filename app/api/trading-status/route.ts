// app/api/trading-status/route.ts
import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

// Construye la ruta al archivo status.json de forma segura
const STATUS_FILE_PATH = path.resolve(process.cwd(), 'backend/database/status.json');

export async function GET() {
  try {
    // Lee el contenido del archivo JSON
    const fileContent = await fs.readFile(STATUS_FILE_PATH, 'utf-8');
    const statusData = JSON.parse(fileContent);

    // Devuelve los datos con un status 200 OK
    return NextResponse.json(statusData);
  } catch (error) {
    // Si hay un error (ej. el archivo no existe), devuelve un error 500
    console.error('Error reading trading status file:', error);
    return NextResponse.json(
      { 
        status: 'error', 
        message: 'Could not retrieve trading status. The calibration process might be running or has failed.' 
      },
      { status: 500 }
    );
  }
}
