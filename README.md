# Taxi tarifario

Project URL: http://cansadadeserfeliz.github.io/taxi-tarifario/

## Description

Una empresa que ayuda a sus usuarios para transportarse en las ciudades, 
está en diferente paises y por eso existen diferentes valores 
(o por unidades, o por zona, por tiempo etc).

Tarea: implementar un tarifario que calcula el precio de un servicio de taxi/vehiculo privado dentro de una webapp.

- Que se pueda calcular el precio de un punto de inicio ( un barrio ) y un punto de llegada ( destino ) tener en cuenta las devisas que pueden variar segun el pais. ( los precios quedan a tu libre decision  )
- las ciudades  tienen localidades y las localidades tienen barrios, y la tarifa es de barrio a barrio.
- si es un servicio especial de tipo Playa. toca dejar la opcion de seleccionar el destino Playa, y calcular un precio fijo de 20 Soles.
- Definir la estructura de datos de este tarifario
- Decidir de la interfaz en Html y usando javascript
- Implementar algunos eventos para obtener directamente el Total sin tener que ir a un boton de calcular el total.

Estructura de datos:

    // neighborhood (barrio)
    {
      "id": "...",
      "name": "...",
      "area_id": "..."
    }
    
    // area (localidad)
    {
      "id": "...",
      "name": "...",
      "city_id": "..."
    }
    
    // city (ciudad)
    {
      "id": "...",
      "name": "...",
      "price_per_unit": "...",  // precio por unidad
      "price_at_night": "...",  // tarifa noturna
      "price_beach": "...",  // precio hasta la playa desde cualquer barrio
      "country_id": "..."
    }
    
    // country (pais)
    {
      "id": "...",
      "name": "...",
      "currency"": "..."  // moneda
    }

## Related URLs

Tarifas de taxi Bogotá 2014: http://primiciadiario.com/wp-content/uploads/2014/02/tarifas2014bogota.jpg
