# Modulo Autenticación
## Registro
### Registro Completo (isVerified sera Falso)
POST
http://localhost:8080/api/auth/register
body:
{
  "nombreLegal": "Lavandería Express S.A.C.",
  "companyName": "LavanderiaExpress",
  "companyPassword": "contraseña123",
  "email": "contacto@lavanderiaexpress.com",
  "ruc": "20123456789",
  "plan": "premium",
  "sucursales": ["64a5f2d37e2517e6c45a1234"], 
  "estado": true,
  "logoUrl": "https://ejemplo.com/logo.png",
  "descripcion": "Servicio de lavandería industrial con más de 10 años de experiencia",
  "telefono": "987654321",
  "direccion": "Av. Industrial 123, Lima"
}
RESPUESTA:
{
    "message": "Empresa registrada exitosamente"
}
### Registro para verificacion de email ( solo campos estrictamente requeridos)
POST
http://localhost:8080/api/auth/register
body
{
  "nombreLegal": "Speed Wash  SAC",
  "companyName": "speedwash",
  "companyPassword": "sw1234",
  "email": "shunshine@gmail.com"
}
RESPUESTA:
{
    "message": "Empresa registrada exitosamente"
}

### Verificacion de Email
#### Solicitar Codigo de Verificacion
POST 
http://localhost:8080/api/auth/request-verification-code
body
{
  "email": "clidertutayarivera@gmail.com"
}
#### Verificar Codigo
POST 
http://localhost:8080/api/auth/verify
body
{
  "email": "clidertutayarivera@gmail.com",
  "verificationCode" : "520045"
}
verificationCode -> Codigo de verificacion enviado al Email
## Login
POST
http://localhost:8080/api/auth/login
body:
{
    "companyName" : "LavanderiaExpress", 
    "companyPassword" : "contraseña123"
}
RESPUESTA:
{   
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb21wYW55SWQiOiI2NzU1ZGIxMjMyZjc1Mzk1MTZlM2VjNjAiLCJub21icmVMZWdhbCI6IkxhdmFuZGVyw61hIEV4cHJlc3MgUy5BLkMuIiwicnVjIjoiMjAxMjM0NTY3ODkiLCJjb21wYW55TmFtZSI6IkxhdmFuZGVyaWFFeHByZXNzIiwicGxhbiI6InByZW1pdW0iLCJsb2dvVXJsIjoiaHR0cHM6Ly9lamVtcGxvLmNvbS9sb2dvLnBuZyIsImRlc2NyaXBjaW9uIjoiU2VydmljaW8gZGUgbGF2YW5kZXLDrWEgaW5kdXN0cmlhbCBjb24gbcOhcyBkZSAxMCBhw7FvcyBkZSBleHBlcmllbmNpYSIsInRlbGVmb25vIjoiOTg3NjU0MzIxIiwiZW1haWwiOiJjb250YWN0b0BsYXZhbmRlcmlhZXhwcmVzcy5jb20iLCJkaXJlY2Npb24iOiJBdi4gSW5kdXN0cmlhbCAxMjMsIExpbWEiLCJpYXQiOjE3MzM2ODA2NDcsImV4cCI6MTczMzcyMzg0N30.w6elUiUjhhPUQdeaj7bQZKhK5rlbHTS9um3KZZvUT0s"
}

### Contraseña Olvidada
#### Restaurar Contraseña
* Previo envio de codigo de restauracion en email
POST 
http://localhost:8080/api/auth//forget-password
body
{
    "email": "clidertutayarivera@gmail.com",
    "verificationCode". "988712", 
    "newPassword": "minuevacontraseña"
 }
RESPUESTA:
{ message: 'Se Restablecio la contraseña, Vuelva a Iniciar Session' };

# Modulo Empresa
## Obtener todas las empresas
GET
http://localhost:8080/api/company/
RESPUESTA:
[{},{}] -> Array de empresas


## Obtener empresa por ID   
GET
http://localhost:8080/api/company/:id
RESPUESTA:
{} -> Empresa

## Actualizar empresa
PUT
http://localhost:8080/api/company/:id
body:
{
  "nombreLegal": "Lavandería Express S.A.C.",
  "ruc": "20123456789",
  "companyPassword": "newpassword",
  "companyName": "express",
  "plan": "premium",
  "sedes": ["64a5f2d37e2517e6c45a1234"], 
  "estado": true,
  "logoUrl": "https://ejemplo.com/logo.png",
  "descripcion": "Servicio de lavandería industrial con más de 10 años de experiencia, nos especializamos en la lavandería de ropa de cama y telas de cama, además de ofrecer servicios de planchado y tintorería",
  "telefono": "987654321",
  "email": "contacto@express.com",
  "direccion": "Av. Industrial 123, Lima"
}
parametros:
id: 64a5f2d37e2517e6c45a1234
RESPUESTA:
{} -> Empresa

## Eliminar empresa
DELETE
http://localhost:8080/api/company/:id
parametros:
id: 64a5f2d37e2517e6c45a1234
RESPUESTA:
{
    "message": "Empresa Elimiada exitosamente"
}

## Cambiar Contraseña Empresa
POST
http://localhost:8080/api/company/:companyId/change-password
BODY
{
    "companyPassword" : "root12", 
    "newPassword" : "123456"
}
RESPONSE
{
    "message": "Contraseña cambiada exitosamente"
}

## Validar Contraseña de Empresa
POST http://localhost:8080/api/company/6756e09183b64ad9c902c08c/validate-password
BODY
{
    "attempPassword" : "123456"
}
RESPONSE
{
    "message": "Contraseña Correcta"
}

# Modulo Sucursal
## Crear Sucursal
POST
http://localhost:8080/api/:companyId/sucursales
body:
{
    "nombreSucursal": "Sede Central Lima",
    "direccion": "Av. Javier Prado 1234, San Isidro",
    "telefono": "+51 987654321",
    "email": "sede.central@lavanderiaexpress.com",
    "estado": true,
    "horarioAtencion": {
        "apertura": "08:00",
        "cierre": "20:00"
    },
    "ubicacionGPS": {
        "latitude": -12.0864,
        "longitude": -77.0348
    },
    "capacidadMaxima": 100,
    "maquinas": ["64a5f2d37e2517e6c45a1234", "64a5f2d37e2517e6c45a5678"],
    "encargado": {
        "nombre": "Juan Pérez",
        "telefono": "+51 999888777",
        "email": "juan.perez@lavanderiaexpress.com"
    }
}
RESPUESTA:
{
    "message": "Sucursal registrada exitosamente"
}

## Obtener todas las sucursales
GET
http://localhost:8080/api/:companyId/sucursales/
RESPUESTA:
[{},{}] -> Array de sucursales
PARAMETROS
:companyId -> el id de la empresa

## Obtener sucursal por ID
GET
http://localhost:8080/api/:companyId/sucursales/:id
RESPUESTA:
{} -> Sucursal  
PARAMETROS:
:companyId -> ID de la empresa
:id  -> ID de la sucursal

## Actualizar sucursal
PUT
http://localhost:8080/api/:companyId/sucursales/:id
body:
{} -> Sucursal con los datos a actualizar
PARAMETROS:
:companyId -> ID de la empresa
id:  -> ID de la sucursal
RESPUESTA:
{
  message: "Sucursal actualizada exitosamente"
}

## Eliminar sucursal
DELETE
http://localhost:8080/api/:companyId/sucursales/:id
PARAMETROS:
:id -> ID de la sucursal
:companyId -> ID de la empresa
RESPUESTA:
{
  message: "Sucursal eliminada exitosamente"
}



# Modulo Maquina
## Crear Maquina
POST
http://localhost:8080/api/:companyId/maquinas/:sucursalId/
body:
{
    "tipo": "Secadora",
    "modelo": "Secadora",
    "marca": "Samsumg",
    "codigoFabrica": "HAAS-FR2000-0123",
    "nombreMaquina": "Secadora 2",
    "caracteristicas": {
        "capacidad": 500,
        "unidadCapacidad": "kg",
        "consumoEnergetico": 7500,
        "dimensiones": {
            "alto": 220,
            "ancho": 180,
            "profundidad": 250
        }
    },
    "fechaInstalacion": "2023-01-15",
    "ultimoMantenimiento": {
        "fecha": "2023-06-20",
        "descripcion": "Mantenimiento preventivo y cambio de aceite",
        "tecnico": "Juan Pérez"
    },
    "proximoMantenimiento": "2023-12-20",
    "horasUso": 2500,
}
PARAMETROS:
:companyId -> ID de la empresa
:sucursalId -> ID de la sucursal

RESPUESTA:
{
    "message": "Maquina registrada exitosamente"
}

## Obtener todas las maquinas de una empresa
GET
http://localhost:8080/api/:companyId/maquinas
PARAMETROS:
companyId: 6755fb8457ffc88c52f7b277 -> ID de la empresa
RESPUESTA:
[{},{}] -> Array de maquinas de la empresa


## Filtar maquinas por Tipo
GET
http://localhost:8080/api/:companyId/maquinas?tipo=Lavadora
PARAMETROS:
companyId: 6755fb8457ffc88c52f7b277 -> ID de la empresa
tipo: Secadora | Lavadora | Planchadora -> Tipo de maquina
RESPUESTA:
{} -> Maquina filtradas por tipo de la empresa

## Filtar maquinas por Sucursal
GET
http://localhost:8080/api/6755fb8457ffc88c52f7b277/maquinas?sucursal=67561bff59f74bee5fbcfc26
PARAMETROS:
companyId: 6755fb8457ffc88c52f7b277 -> ID de la empresa
sucursal: 67561bff59f74bee5fbcfc26 -> ID de la sucursal
RESPUESTA:
{} -> Maquinas filtradas por sucursal de la empresa

## Filtrar maquinas por Tipo y Sucursal
GET
http://localhost:8080/api/:companyId/maquinas?tipo=Lavadora&sucursal=ID
PARAMETROS:
companyId: 6755fb8457ffc88c52f7b277 -> ID de la empresa
tipo: Secadora | Lavadora | Planchadora -> Tipo de maquina
sucursal: 67561bff59f74bee5fbcfc26 -> ID de la sucursal
RESPUESTA:
{} -> Maquinas filtradas por tipo y sucursal de la empresa

## Obtener maquinas por codigo de fabrica
GET
http://localhost:8080/api/:companyId/maquinas/codigo/:codigoFabrica
PARAMETROS:
companyId: 6755fb8457ffc88c52f7b277 -> ID de la empresa
codigoFabrica: HAAS-FR2000-0123 -> Codigo de fabrica de la maquina
RESPUESTA:
{} -> Maquina

## Obtener maquinas por ID
GET
http://localhost:8080/api/:companyId/maquinas/:id
PARAMETROS:
companyId: 6755fb8457ffc88c52f7b277 -> ID de la empresa
id: 6755fb8457ffc88c52f7b277 -> ID de la maquina
RESPUESTA:
{} -> Maquina

## Actualizar maquina
PUT
http://localhost:8080/api/:companyId/maquinas/:id
body:
{}
PARAMETROS:
companyId: 6755fb8457ffc88c52f7b277 -> ID de la empresa
id: 6755fb8457ffc88c52f7b277 -> ID de la maquina
RESPUESTA:
{
    "message": "Maquina actualizada exitosamente"
}

## Eliminar maquina
DELETE
http://localhost:8080/api/:companyId/maquinas/:id
PARAMETROS:
companyId: 6755fb8457ffc88c52f7b277 -> ID de la empresa
id: 6755fb8457ffc88c52f7b277 -> ID de la maquina
RESPUESTA:
{
    "message": "Maquina eliminada exitosamente"
}


# Modulo Empleado

## Crear Empleado
POST
http://localhost:8080/api/companyId/empleado/sucursalId
BODY
{
    "apellidos": "Garcia Lopez",
    "nombres": "Juan Carlos",
    "dni": "98789904",
    "fechaNacimiento": "1990-05-15",
    "genero": "Masculino",
    "email": "some@otra.com",
    "telefonoPrincipal": "+51519123456",
    "telefonoSecundario": "+51912345678",
    "puesto": "Analista de Sistemas",
    "areaTrabajo": "Tecnología",
    "tipoContrato": "Tiempo Completo",
    "fechaIngreso": "2022-01-15",
    "salario": 45000,
    "direccion": {
        "calle": "Av. Lima 123",
        "ciudad": "Lima",
        "provincia": "Lima",
        "codigoPostal": "15001"
    },
    "activo": true,
    "estadoCivil": "Soltero"
}
RESPONSE 
{
    "message": "Empleado registrado exitosamente",
    "empleado": {
        "_id": "675b7a703c2e8e6476da2aea",
        "nombres": "Luis Alberto",
        "apellidos": "Sanchez Gomez",
        "dni": "13314312",
        "email": "luis@empresa.com"
    }
}


## FILTRAR Todos los empleados de la empresa
GET
http://localhost:8080/api/:companyId/empleado/?sucursal=6759b77b86c3fc581f75f083&areaTrabajo=Tecnología
PARAMS
:companyId -> ID de la empresa
QUERY PARAMS    
sucursal -> SUCURSAL DE LA EMPRESA (opcional)
areaTrabajo -> area de trabajo de empleado
RESPONSE
[ { }]-> resultado de el filtro

## Obtener empleado por ID
GET
http://localhost:8080/api/:companyId/empleado/id
RESPONSE
{} -> EMP
## Actualizar Empleado
PUT
http://localhost:8080/api/:companyId/empleado/id
BODY
{
    "apellidos": "Ordoñez Cente",
    "nombres": "Zosimo Nestor",
    "dni": "98123312",
    "fechaNacimiento": "1990-05-15",
    "genero": "Piedra"

}
RESPONSE
{
    "message": "Empleado actualizado exitosamente"
}

## Eliminar empleado
DELETE
http://localhost:8080/api/:companyId/empleado/id


# MODULO OPERACIONES (CORE)
## CREAR OPERACION
## ACTUALIZAR OPERACION

## OBTENER TODAS LAS OPERACIONES DE LA EMPRESA
### FILTRAR OPERACION POR TIPO
###  FILTRAR OPERACION POR MAQUINA
### FILTRAR OPERACION POR 
## OBTENER OPERACION POR ID
## ELIMINAR OPERACION

# Modulo Operaciones
## Crear Operación
POST
http://localhost:8080/api/:companyId/operaciones/:sucursalId/

### Ejemplo 1: Operación de Lavado
{
    "fecInicio": "2024-03-20T10:00:00Z",
    "fecFinal": "2024-03-20T18:00:00Z",
    "currentStage": "lavado",
    "nextStage": "secado",
    "procesos": [{
        "tipo": "Lavado",
        "fecha": "2024-03-20",
        "hora": "10:00",
        "responsable": "675b7a703c2e8e6476da2aea",
        "detalles": [{
            "numOrden": "LAV-001",
            "maquina": "675c8b92d4f3e789a0bc1234",
            "cantPrendas": 50,
            "etiqueta": "Ropa clara",
            "observaciones": "Lavado delicado"
        }]
    }]
}

### Ejemplo 2: Operación con Múltiples Procesos
{
    "fecInicio": "2024-03-20T09:00:00Z",
    "fecFinal": "2024-03-21T17:00:00Z",
    "currentStage": "lavado",
    "nextStage": "secado",
    "procesos": [{
        "tipo": "Lavado",
        "fecha": "2024-03-20",
        "hora": "09:30",
        "responsable": "675b7a703c2e8e6476da2aea",
        "detalles": [{
            "numOrden": "LAV-002",
            "maquina": "675c8b92d4f3e789a0bc1234",
            "cantPrendas": 75,
            "etiqueta": "Ropa oscura",
            "observaciones": "Temperatura media"
        }]
    },
    {
        "tipo": "Secado",
        "fecha": "2024-03-20",
        "hora": "11:30",
        "responsable": "675b7a703c2e8e6476da2aeb",
        "detalles": [{
            "numOrden": "SEC-002",
            "maquina": "675c8b92d4f3e789a0bc5678",
            "cantPrendas": 75,
            "etiqueta": "Ropa oscura",
            "observaciones": "Secado normal"
        }]
    }]
}

### Ejemplo 3: Operación Compleja
{
    "fecInicio": "2024-03-20T08:00:00Z",
    "fecFinal": "2024-03-22T16:00:00Z",
    "currentStage": "lavado",
    "nextStage": "secado",
    "procesos": [{
        "tipo": "Lavado",
        "fecha": "2024-03-20",
        "hora": "08:15",
        "responsable": "675b7a703c2e8e6476da2aea",
        "detalles": [
            {
                "numOrden": "LAV-003A",
                "maquina": "675c8b92d4f3e789a0bc1234",
                "cantPrendas": 30,
                "etiqueta": "Uniformes",
                "observaciones": "Lavado intensivo"
            },
            {
                "numOrden": "LAV-003B",
                "maquina": "675c8b92d4f3e789a0bc1235",
                "cantPrendas": 45,
                "etiqueta": "Sábanas",
                "observaciones": "Lavado estándar"
            }
        ]
    }]
}

RESPUESTA:
{
    "message": "Operación creada exitosamente",
    "operacion": {
        "_id": "675d9c12e4f5a6b7c8d9e0f1",
        "currentStage": "lavado",
        "nextStage": "secado"
    }
}

## Obtener Todas las Operaciones
GET
http://localhost:8080/api/:companyId/operaciones/:sucursalId/
RESPUESTA:
[{},{}] -> Array de operaciones

## Obtener Operación por ID
GET
http://localhost:8080/api/:companyId/operaciones/:id
RESPUESTA:
{} -> Objeto operación

## Actualizar Operación
PUT
http://localhost:8080/api/:companyId/operaciones/:id
BODY:
{
    "currentStage": "secado",
    "nextStage": "planchado",
    "estadoOperacion": true
}
RESPUESTA:
{
    "message": "Operación actualizada exitosamente"
}

## Eliminar Operación
DELETE
http://localhost:8080/api/:companyId/operaciones/:id
RESPUESTA:
{
    "message": "Operación eliminada exitosamente"
}

## Agregar Proceso a Operación
POST
http://localhost:8080/api/:companyId/operaciones/:sucursalId/:operacionId/procesos
BODY:
{
    "tipo": "Secado",
    "fecha": "2024-03-20",
    "hora": "14:30",
    "responsable": "675b7a703c2e8e6476da2aea",
    "detalles": [{
        "numOrden": "SEC-001",
        "maquina": "675c8b92d4f3e789a0bc5678",
        "cantPrendas": 50,
        "etiqueta": "Ropa clara",
        "observaciones": "Secado suave"
    }]
}
RESPUESTA:
{
    "message": "Proceso agregado exitosamente"
}

## Actualizar Etapa Actual
PATCH
http://localhost:8080/api/:companyId/operaciones/:id/stage
BODY:
{
    "currentStage": "secado",
    "nextStage": "planchado"
}
RESPUESTA:
{
    "message": "Etapa actualizada exitosamente"
}

## Actualizar Proceso
PATCH
http://localhost:8080/api/:companyId/operaciones/:operacionId/procesos/:procesoId
BODY:
{
    "estado": true,
    "observaciones": "Proceso completado satisfactoriamente"
}
RESPUESTA:
{
    "message": "Proceso actualizado exitosamente"
}

## Filtrar Procesos
GET
http://localhost:8080/api/:companyId/operaciones/procesos/filter?tipo=Lavado&fecha=2024-03-20
PARÁMETROS DE CONSULTA:
- tipo: Tipo de proceso (opcional)
- fecha: Fecha del proceso (opcional)
- responsable: ID del responsable (opcional)
RESPUESTA:
[{}, {}] -> Array de procesos filtrados

## Filtrar Procesos por Número de Orden
GET
http://localhost:8080/api/:companyId/operaciones/procesos/by-orden?numOrden=LAV-001
PARÁMETROS DE CONSULTA:
- numOrden: Número de orden a buscar
RESPUESTA:
[{}, {}] -> Array de procesos que coinciden con el número de orden
