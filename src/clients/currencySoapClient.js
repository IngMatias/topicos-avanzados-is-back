// Requiere la librería "soap"
import soap from 'soap'

export const getCurrenciesClient = (req, res) => {
  // Endpoint de la API SOAP
  const url = 'https://cotizaciones.bcu.gub.uy/wscotizaciones/servlet/awsbcumonedas?wsdl'

  // Datos para la consulta (como un objeto JavaScript)
  const args = {
    Entrada: {
      Grupo: '1'
    }
  }

  return new Promise((resolve, reject) => {
    // Crear el cliente SOAP e invocar el método
    soap.createClient(url, (err, client) => {
      if (err) {
        console.error('Error creando el cliente SOAP:', err)
        res.status(500).json({ error: 'Error creando el cliente SOAP' })
        return
      }

      // Invocar el método correspondiente
      client.Execute(args, (err, result) => {
        if (err) {
          console.error('Error en la solicitud SOAP:', err)
          res.status(500).json({ error: 'Error en la solicitud SOAP' })
          return
        }

        // Manejo de la respuesta
        const formattedResult = result.Salida['wsmonedasout.Linea'].map(linea => ({
          code: linea.Codigo,
          name: linea.Nombre
        }))

        // Manejo de la respuesta
        res.json(formattedResult)
        return resolve(formattedResult)
      })
    })
  })
}

export const getCurrencyPairClient = (req, res) => {
  // Endpoint de la API SOAP
  const url = 'https://cotizaciones.bcu.gub.uy/wscotizaciones/servlet/awsbcucotizaciones?wsdl'

  // Datos para la consulta (como un objeto JavaScript)
  const args = {
    Entrada: {
      Moneda: {
        item: 500
      },
      FechaDesde: '2024-10-29',
      FechaHasta: '2024-10-29',
      Grupo: '0'
    }
  }

  return new Promise((resolve, reject) => {
    // Crear el cliente SOAP e invocar el método
    soap.createClient(url, (err, client) => {
      if (err) {
        console.error('Error creando el cliente SOAP:', err)
        res.status(500).json({ error: 'Error creando el cliente SOAP' })
        return
      }

      // Invocar el método correspondiente
      client.Execute(args, (err, result) => {
        if (err) {
          console.error('Error en la solicitud SOAP:', err)
          res.status(500).json({ error: 'Error en la solicitud SOAP' })
          return
        }

        const datosCotizaciones = result.Salida.datoscotizaciones['datoscotizaciones.dato']
        if (datosCotizaciones) {
          const formattedResult = {
            date: datosCotizaciones[0].Fecha,
            currency_code: parseInt(datosCotizaciones[0].Moneda, 10),
            currency_name: datosCotizaciones[0].Nombre,
            buy: parseFloat(datosCotizaciones[0].TCC).toFixed(3),
            sell: parseFloat(datosCotizaciones[0].TCV).toFixed(3)
          }

          res.json(formattedResult)
          return resolve(formattedResult)
        } else {
          res.status(404).json({ error: 'No se encontraron datos de cotizaciones' })
          return reject(new Error('No se encontraron datos de cotizaciones'))
        }
      })
    })
  })
}
