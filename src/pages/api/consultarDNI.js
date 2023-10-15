// pages/api/consultarDNI.js
export default async function handler(req, res) {
    if (req.method === 'GET') {
      const { dni } = req.query;
  
      try {
        const apiUrl = `https://dniruc.apisperu.com/api/v1/dni/${dni}?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImVyaWNraW5nYWNhbGxlQGdtYWlsLmNvbSJ9.IfKDPqcc5dldHHx6w3KcrQ5Y6aET0jUSBe2Psh0XwRQ`;
        const response = await fetch(apiUrl);
        const data = await response.json();
  
        if (data.success) {
          res.status(200).json(data);
        } else {
          res.status(404).json({ success: false, message: 'No se encontraron datos para el número de DNI ingresado.' });
        }
      } catch (error) {
        console.error('Error al obtener datos del API:', error);
        res.status(500).json({ success: false, message: 'Error al obtener datos del API.' });
      }
    } else {
      res.status(405).json({ success: false, message: 'Método no permitido.' });
    }
  }
  