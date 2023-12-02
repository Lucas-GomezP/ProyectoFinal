import { API_BASE_URL } from '../routes/apiUrl'

export const apiDocData = [
  {
    endpoin: '/login',
    method: 'POST',
    fullUrl: API_BASE_URL + 'login',
    describe: [
      'Endpoint para el ingreso de sesión de un usuario ya registrado. Se aplica con el método de Autorización Básica.', 'Consulta la tabla usuarios.', 'Recibe nombre de usuario y contraseña.', 'Devuelve id del usuario, token y nombre de usuario.'
    ],
    exampleSend: `const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + btoa(data.username + ':' + data.password)
      }
    }`,
    exampleResponse: `{
      id: 3,
      token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZXhwIjoxNzAxNTI2Mzg0fQ.Qt9UmxRf3dQNqH2iIRZioc3h-oelQ5WP7ImKvGWVwII",
      username: "LUQUITAS"
    }`
  },
  {
    endpoin: '/users',
    method: 'POST',
    fullUrl: API_BASE_URL + 'users',
    describe: [
      'Endpoint para registrar un nuevo usuario.', 'Consulta la tabla usuarios.', 'Recibe un nombre de usuario, contraseña, nombre, apellido, dni, telefono y email.', 'Devuelve un mensaje de creación exitosa con un código HTTP 201.'
    ],
    exampleSend: `const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nombreusuario: data.username,
        contrasenia: data.password,
        nombre: data.nombre,
        apellido: data.apellido,
        dni: data.dni,
        telefono: data.telefono,
        email: data.email
      })
    }`,
    exampleResponse: '{message: "Usuario creado exitosamente"}, 201'
  },
  {
    endpoin: '/users/<user_id>',
    method: 'PUT',
    fullUrl: API_BASE_URL + 'users/<user_id>',
    describe: [
      'Endpoint para actualizar la información de un usuario.', 'Consulta la tabla usuarios.', 'Recibe un nombre de usuario, contraseña, nombre, apellido, dni, telefono y email.', 'Devuelve un mensaje de creación exitosa con un código HTTP 200.'
    ],
    exampleSend: `const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.token,
        'user-id': localStorage.id
      },
      body: JSON.stringify({
        nombreusuario: data.username,
        contrasenia: data.password,
        nombre: data.nombre,
        apellido: data.apellido,
        dni: data.dni,
        telefono: data.telefono,
        email: data.email
      })
    }`,
    exampleResponse: '{message: "Usuario actualizado exitosamente"}, 200'
  },
  {
    endpoin: '/users/<user_id>',
    method: 'DELETE',
    fullUrl: API_BASE_URL + 'users/<user_id>',
    describe: [
      'Endpoint para eliminar un usuario. Cambia el estado de activo a inactivo a un usuario (eliminación lógica).', 'ESTE ENDPOINT NO ESTÁ IMPLEMENTADO', 'Está realizado el código pero no se aplicó, desde el frontend, esta funcionalidad ya que depende de cada lógica de negocio el poder eliminar o no los usuarios.'
    ],
    exampleSend: `const requestOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.token,
        'user-id': localStorage.id
      }
    }`,
    exampleResponse: '{message: "Usuario eliminado exitosamente"}, 200'
  },
  {
    endpoin: '/user/<user_id>/oferta',
    method: 'GET',
    fullUrl: API_BASE_URL + 'user/<user_id>/oferta',
    describe: [
      'Endpoint para consultar toda la oferta del usuario, ya sean productos o servicios.', 'Consulta la tabla oferta.', 'Recibe el id del usuario y su token.', 'Devuelve un JSON con toda la lista de la tabla oferta.'
    ],
    exampleSend: `const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.token,
        'user-id': localStorage.id
      }
    }`,
    exampleResponse: `[{
    descripcion: "The Football Is Good For Training And Recreational Purposes"
    disponibilidad: 1
    estado: "A"
    id_oferta: 9
    id_usuario: 3
    nombre: "Awesome Soft Bacon"
    precio: "85"
    stock: 0
    tipo: "P"
    },
    ...
  ]`
  },
  {
    endpoin: '/user/<user_id>/oferta/<oferta_id>',
    method: 'GET',
    fullUrl: API_BASE_URL + 'user/<user_id>/oferta/<oferta_id>',
    describe: [
      'Endpoint para consultar un producto o servicio en particular del usuario.', 'Consulta la tabla oferta.', 'Recibe el id del usuario, su token y el id de la oferta.', 'Devuelve un JSON con el producto o servicio en particular.'
    ],
    exampleSend: `const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.token,
        'user-id': localStorage.id
      }
    }`,
    exampleResponse: `[{
    descripcion: "The Football Is Good For Training And Recreational Purposes"
    disponibilidad: 1
    estado: "A"
    id_oferta: 9
    id_usuario: 3
    nombre: "Awesome Soft Bacon"
    precio: "85"
    stock: 0
    tipo: "P"
    }
  ]`
  },
  {
    endpoin: '/user/<user_id>/oferta',
    method: 'POST',
    fullUrl: API_BASE_URL + 'user/<user_id>/oferta',
    describe: [
      'Endpoint para crear una nueva oferta.', 'Consulta la tabla oferta.', 'Recibe el id del usuario, su token y todos los campos de la tabla oferta.', 'Devuelve un JSON con un mensaje de estado.'
    ],
    exampleSend: `const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.token,
        'user-id': localStorage.id
      },
      body: JSON.stringify(
        {
          descripcion: "mountain bike rodado 29",
          disponibilidad: "1",
          estado: "A",
          id_usuario: "3",
          nombre: "bicicleta",
          precio: "100000",
          stock: "10",
          tipo: "P"
      })
    }`,
    exampleResponse: '{"message": "Inserción exitosa"}, 201'
  },
  {
    endpoin: '/user/<user_id>/oferta/<oferta_id>',
    method: 'PUT',
    fullUrl: API_BASE_URL + 'user/<user_id>/oferta/<oferta_id>',
    describe: [
      'Endpoint para actualizar una oferta ya creada.', 'Consulta la tabla oferta.', 'Recibe el id del usuario, su token, el id de la oferta y todos los campos de la tabla oferta.', 'Devuelve un JSON con un mensaje de estado.'
    ],
    exampleSend: `const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.token,
        'user-id': localStorage.id
      },
      body: JSON.stringify(
        {
          descripcion: "mountain bike rodado 29",
          disponibilidad: "1",
          estado: "A",
          id_usuario: "3",
          nombre: "bicicleta",
          precio: "155999",
          stock: "7",
          tipo: "P"
      })
    }`,
    exampleResponse: '{"message": "Actualización exitosa"}, 200'
  },
  {
    endpoin: '/user/<user_id>/oferta/<oferta_id>',
    method: 'DELETE',
    fullUrl: API_BASE_URL + 'user/<user_id>/oferta/<oferta_id>',
    describe: [
      'Endpoint para realizar una eliminacion logica una oferta ya creada, cambiando su estado a inactivo (I).', 'Consulta la tabla oferta.', 'Recibe el id del usuario, su token, el id de la oferta.', 'Devuelve un JSON con un mensaje de estado.'
    ],
    exampleSend: `const requestOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.token,
        'user-id': localStorage.id
      }
    }`,
    exampleResponse: '{"message": "Oferta desactivada exitosamente"}, 200'
  },
  {
    endpoin: '/user/<user_id>/client',
    method: 'GET',
    fullUrl: API_BASE_URL + 'user/<user_id>/client',
    describe: [
      'Endpoint para obtener el listado de todos los clientes de un usuario en particular.', 'Consulta la tabla clientes.', 'Recibe el id del usuario y su token.', 'Devuelve un JSON con toda la lista de la tabla clientes.'
    ],
    exampleSend: `const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.token,
        'user-id': localStorage.id
      }
    }`,
    exampleResponse: `[
    {
      apellido: "florez"
      cuitCuil: "12212222"
      dni: "245995910"
      domicilio: "calle random 22"
      email: "pepe@mail.com"
      estado: 1
      id_cliente: 13
      id_usuario: 3
      nombre: "pepe"
      telefono: "3939939929"
    },
    ...
  ]`
  },
  {
    endpoin: '/user/<user_id>/client/<client_id>',
    method: 'GET',
    fullUrl: API_BASE_URL + 'user/<user_id>/client/<client_id>',
    describe: [
      'Endpoint para obtener la información de un cliente en particular que pertenezca a un usuario en particular.', 'Consulta la tabla clientes.', 'Recibe el id del usuario, su token y el id del cliente.', 'Devuelve un JSON con el registro en particular del cliente solicitado.'
    ],
    exampleSend: `const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.token,
        'user-id': localStorage.id
      }
    }`,
    exampleResponse: `[
    {
      apellido: "florez"
      cuitCuil: "12212222"
      dni: "245995910"
      domicilio: "calle random 22"
      email: "pepe@mail.com"
      estado: 1
      id_cliente: 13
      id_usuario: 3
      nombre: "pepe"
      telefono: "3939939929"
    }
  ]`
  },
  {
    endpoin: '/user/<user_id>/client',
    method: 'POST',
    fullUrl: API_BASE_URL + 'user/<user_id>/client',
    describe: [
      'Endpoint para crear un cliente nuevo.', 'Consulta la tabla clientes.', 'Recibe el id del usuario, su token y los campos requeridos del cliente, como apellido, cuitCuil, dni, domicilio, email, nombre y telefono.', 'Devuelve un JSON con un mensaje de estado.'
    ],
    exampleSend: `const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.token,
        'user-id': localStorage.id
      },
      body: JSON.stringify(
        {
          apellido: "Gonzales",
          cuitCuil: "888777999",
          dni: "40555666",
          domicilio: "Calle 23",
          email: "javier@mail.com",
          nombre: "Javier",
          telefono: "2929858585"
        })
    }`,
    exampleResponse: '{"message": "Cliente creado exitosamente"}, 201'
  },
  {
    endpoin: '/user/<user_id>/client/<client_id>',
    method: 'PUT',
    fullUrl: API_BASE_URL + 'user/<user_id>/client/<client_id>',
    describe: [
      'Endpoint para actualizar la informacion de un cliente ya creado.', 'Consulta la tabla clientes.', 'Recibe el id del usuario, su token y los campos requeridos del cliente, como apellido, cuitCuil, dni, domicilio, email, nombre y telefono.', 'Devuelve un JSON con un mensaje de estado.'
    ],
    exampleSend: `const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.token,
        'user-id': localStorage.id
      },
      body: JSON.stringify(
        {
          apellido: "Gonzales",
          cuitCuil: "999777888",
          dni: "39777888",
          domicilio: "Calle 23",
          email: "javier@mail.com",
          nombre: "Javier",
          telefono: "2929858585"
        })
    }`,
    exampleResponse: '{"message": "Cliente actualizado exitosamente"}, 200'
  },
  {
    endpoin: '/user/<user_id>/client/<client_id>',
    method: 'DELETE',
    fullUrl: API_BASE_URL + 'user/<user_id>/client/<client_id>',
    describe: [
      'Endpoint para eliminar de manera logica un cliente ya creado, cambiando su estado a inactivo.', 'Consulta la tabla clientes.', 'Recibe el id del usuario, su token y el id del cliente a eliminar.', 'Devuelve un JSON con un mensaje de estado.'
    ],
    exampleSend: `const requestOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.token,
        'user-id': localStorage.id
      }`,
    exampleResponse: '{"message": "Cliente eliminado exitosamente"}, 200'
  },
  {
    endpoin: '/user/<user_id>/facturas',
    method: 'GET',
    fullUrl: API_BASE_URL + 'user/<user_id>/facturas',
    describe: [
      'Endpoint para obtener el listado de todas las facturas de un usuario en particular.', 'Consulta la tabla facturas.', 'Recibe el id del usuario y su token.', 'Devuelve un JSON con toda la lista de la tabla de facturas.'
    ],
    exampleSend: `const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.token,
        'user-id': localStorage.id
      }`,
    exampleResponse: `[
    {
      detalle:
      [{
        cantidad: 1,
        id_oferta: 9,
        importe: "85.00",
        nombre_oferta: "Awesome Soft Bacon",
        subtotal: "85.00",
        tipo: "P"
      },
      ... ],
      encabezado:
        {
          apellido_cliente: "florez",
          apellido_usuario: "Gómez",
          cuit_cuil: "12212222",
          domicilio: "calle random 22",
          email: "pepe@mail.com",
          estado: 3,
          fecha: "2023-11-29",
          id_cliente: 13,
          id_factura: 18,
          id_usuario: 3,
          importe_total: "85.00",
          nombre_cliente: "pepe",
          nombre_usuario: "Lucas",
          telefono: "3939939929",
        }
    },
    ...
  ]`
  },
  {
    endpoin: '/user/<user_id>/facturas/<factura_id>',
    method: 'GET',
    fullUrl: API_BASE_URL + 'user/<user_id>/facturas/<factura_id>',
    describe: [
      'Endpoint para obtener la informacion de una factura en particular que pertenezca a un usuario en particular.', 'Consulta la tabla facturas.', 'Recibe el id del usuario, su token y el id de la factura.', 'Devuelve un JSON con toda la informacion de la factura en particular.'
    ],
    exampleSend: `const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.token,
        'user-id': localStorage.id
      }`,
    exampleResponse: `[
    {
      detalle:
      [{
        cantidad: 1,
        id_oferta: 9,
        importe: "85.00",
        nombre_oferta: "Awesome Soft Bacon",
        subtotal: "85.00",
        tipo: "P"
      },
      ... ],
      encabezado:
        {
          apellido_cliente: "florez",
          apellido_usuario: "Gómez",
          cuit_cuil: "12212222",
          domicilio: "calle random 22",
          email: "pepe@mail.com",
          estado: 3,
          fecha: "2023-11-29",
          id_cliente: 13,
          id_factura: 18,
          id_usuario: 3,
          importe_total: "85.00",
          nombre_cliente: "pepe",
          nombre_usuario: "Lucas",
          telefono: "3939939929",
        }
    }
  ]`
  },
  {
    endpoin: '/user/<user_id>/client/<client_id>/facturas',
    method: 'POST',
    fullUrl: API_BASE_URL + 'user/<user_id>/client/<client_id>/facturas',
    describe: [
      'Endpoint para crear una factura nueva relacionando productos y/o servicios con un cliente, todos pertenecientes a un usuario en particular.', 'Consulta la tabla facturas.', 'Recibe el id del usuario, su token, el id del usuario y la informacion requerida para crear una factura, que es que producto y/o servicio se va a facturar y su cantidad.', 'Devuelve un JSON con la factura recien creada.'
    ],
    exampleSend: `const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.token,
        'user-id': localStorage.id
      },
      body: JSON.stringify(
        {
          detalle_fc: [
            { id_oferta: 39, cantidad: 1 }, 
            { id_oferta: 42, cantidad: 2 } 
          ]
        }
      )`,
    exampleResponse: `[
    {
      detalle:
      [{
        cantidad: 1,
        id_oferta: 39,
        importe: "99.00",
        nombre_oferta: "Unbranded Wooden Chips",
        subtotal: "99.00",
        tipo: "S"
      },
      {
        cantidad: 2,
        id_oferta: 42,
        importe: "99.00",
        nombre_oferta: "Oriental Cotton Mouse",
        subtotal: "198.00",
        tipo: "P"
      },
      ... ],
      encabezado:
        {
          apellido_cliente: "Gonzales",
          apellido_usuario: "Gómez",
          cuit_cuil: "888777999",
          domicilio: "Calle 23",
          email: "javier@mail.com",
          estado: 1,
          fecha: "2023-11-29",
          id_cliente: 15,
          id_factura: 26,
          id_usuario: 3,
          importe_total: "297.00",
          nombre_cliente: "Javier",
          nombre_usuario: "Lucas",
          telefono: "2929858585",
        }
    }
  ]`
  },
  {
    endpoin: '/user/<user_id>/facturas/<factura_id>',
    method: 'PUT',
    fullUrl: API_BASE_URL + 'user/<user_id>/facturas/<factura_id>',
    describe: [
      'Endpoint para actualizar el estado de una factura, este endpoint esta pensado solo para poder cobrar la factura y es el unico dato que se modifica, pasando de 1 (sin pagar), a 3(efectivo), 4(debito) o 5(cheque).', 'Consulta la tabla facturas.', 'Recibe el id del usuario, su token, el id de la factura y el estado al que se desea pasar la factura.', 'Devuelve un JSON con un mensaje de estado.'
    ],
    exampleSend: `const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.token,
        'user-id': localStorage.id
      },
      body: JSON.stringify({ forma_pago: 3 })`,
    exampleResponse: '{"message": "Registro exitoso"}, 201'
  },
  {
    endpoin: '/user/<user_id>/facturas/<factura_id>',
    method: 'DELETE',
    fullUrl: API_BASE_URL + 'user/<user_id>/facturas/<factura_id>',
    describe: [
      'Endpoint para eliminar una factura de manera logica, pasando a estar inactiva (2), esta funcionalidad a pesar de que esta implementada esta pensada para una posible mejora a futuro con notas de credito.', 'Consulta la tabla facturas.', 'Recibe el id del usuario, su token y el id de la factura.', 'Devuelve un JSON con un mensaje de estado.'
    ],
    exampleSend: `const requestOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.token,
        'user-id': localStorage.id
      }`,
    exampleResponse: '{"message": "FC anulada exitosamente"}, 200'
  }
]
