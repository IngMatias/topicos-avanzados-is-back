import soap from 'soap'

const url = 'https://cotizaciones.bcu.gub.uy/wscotizaciones/servlet/awsbcumonedas?wsdl'

export const getCurrenciesClient = (req, res) => {
  const args = {
    Entrada: {
      Grupo: '0'
    }
  }

  return new Promise((resolve, reject) => {
    soap.createClient(url, (err, client) => {
      if (err) {
        return
      }

      client.Execute(args, (err, result) => {
        if (err) {
          return
        }

        const formattedResult = result.Salida['wsmonedasout.Linea'].map(linea => ({
          code: linea.Codigo,
          name: linea.Nombre
        }))

        return resolve(formattedResult)
      })
    })
  })
}

export const getCurrencyPairClient = (req, res) => {
  const { code, date } = req

  const args = {
    Entrada: {
      Moneda: {
        item: code
      },
      FechaDesde: date.substring(0, 10),
      FechaHasta: date.substring(0, 10),
      Grupo: '0'
    }
  }

  return new Promise((resolve, reject) => {
    soap.createClient(url, (err, client) => {
      if (err) {
        return
      }
      client.Execute(args, (err, result) => {
        if (err) {
          return
        }
        const datosCotizaciones = result?.Salida.datoscotizaciones['datoscotizaciones.dato']
        if (datosCotizaciones) {
          const formattedResult = {
            date: datosCotizaciones[0].Fecha,
            currency_code: parseInt(datosCotizaciones[0].Moneda, 10),
            currency_name: datosCotizaciones[0].Nombre,
            buy: parseFloat(datosCotizaciones[0].TCC).toFixed(3),
            sell: parseFloat(datosCotizaciones[0].TCV).toFixed(3)
          }
          return resolve(formattedResult)
        }
        return datosCotizaciones
      })
    })
  })
}
