// pages/api/consultarDNI.js
export default async function handler(req, res) {
    if (req.method === 'GET') {
      const { dni } = req.query;
  
      try {
        const apiUrl = `https://apiperu.dev/api/dni/${dni}?api_token=61d39010845bf358b28179b2546c99d020acac673a070ab9fb24a2d525759305`;
        const response = await fetch(apiUrl);
        const data = await response.json();
  
        if (data.success) {
          console.log (data)
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
  