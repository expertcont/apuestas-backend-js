
const obtenerPartidosPorFecha = async (req, res) => {
  const { fecha } = req.params;
  console.log(fecha);

  if (!fecha) {
    return res.status(400).json({ error: 'Falta el parámetro fecha' });
  }

  const url = `https://www.thesportsdb.com/api/v1/json/123/eventsday.php?d=${fecha}&s=Soccer`;
  console.log(url);


  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const data = await response.json();
    const eventos = data.events || [];
    res.json({ eventos });
  } catch (error) {
    console.error('Error al consultar TheSportsDB:', error.message);
    res.status(500).json({ error: 'Error al consultar los partidos' });
  }
};

module.exports = {
  obtenerPartidosPorFecha,
};
