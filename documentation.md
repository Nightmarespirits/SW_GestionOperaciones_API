# Modulo Autenticación

## Registro

### Registro Completo (isVerified sera Falso)

**POST**  
`http://localhost:8080/api/auth/register`

**Body:**
```json
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
```

**Respuesta:**
```json
{
    "message": "Empresa registrada exitosamente"
}
```

### Registro para verificación de email (solo campos estrictamente requeridos)

**POST**  
`http://localhost:8080/api/auth/register`

**Body:**
```json
{
  "nombreLegal": "Speed Wash  SAC",
  "companyName": "speedwash",
  "companyPassword": "sw1234",
  "email": "shunshine@gmail.com"
}
```

**Respuesta:**
```json
{
    "message": "Empresa registrada exitosamente"
}
```

### Verificación de Email

#### Solicitar Código de Verificación

**POST**  
`http://localhost:8080/api/auth/request-verification-code`

**Body:**
```json
{
  "email": "clidertutayarivera@gmail.com"
}
```

#### Verificar Código

**POST**  
`http://localhost:8080/api/auth/verify`

**Body:**
```json
{
  "email": "clidertutayarivera@gmail.com",
  "verificationCode" : "520045"
}
```
`verificationCode` -> Código de verificación enviado al Email

## Login

**POST**  
`http://localhost:8080/api/auth/login`

**Body:**
```json
{
    "companyName" : "LavanderiaExpress", 
    "companyPassword" : "contraseña123"
}
```

**Respuesta:**
```json
{   
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb21wYW55SWQiOiI2NzU1ZGIxMjMyZjc1Mzk1MTZlM2VjNjAiLCJub21icmVMZWdhbCI6IkxhdmFuZGVyw61hIEV4cHJlc3MgUy5BLkMuIiwicnVjIjoiMjAxMjM0NTY3ODkiLCJjb21wYW55TmFtZSI6IkxhdmFuZGVyaWFFeHByZXNzIiwicGxhbiI6InByZW1pdW0iLCJsb2dvVXJsIjoiaHR0cHM6Ly9lamVtcGxvLmNvbS9sb2dvLnBuZyIsImRlc2NyaXBjaW9uIjoiU2VydmljaW8gZGUgbGF2YW5kZXLDrWEgaW5kdXN0cmlhbCBjb24gbcOhcyBkZSAxMCBhw7FvcyBkZSBleHBlcmllbmNpYSIsInRlbGVmb25vIjoiOTg3NjU0MzIxIiwiZW1haWwiOiJjb250YWN0b0BsYXZhbmRlcmlhZXhwcmVzcy5jb20iLCJkaXJlY2Npb24iOiJBdi4gSW5kdXN0cmlhbCAxMjMsIExpbWEiLCJpYXQiOjE3MzM2ODA2NDcsImV4cCI6MTczMzcyMzg0N30.w6elUiUjhhPUQdeaj7bQZKhK5rlbHTS9um3KZZvUT0s"
}
```

### Contraseña Olvidada

#### Restaurar Contraseña

* Previo envío de código de restauración en email

**POST**  
`http://localhost:8080/api/auth/forget-password`

**Body:**
```json
{
    "email": "clidertutayarivera@gmail.com",
    "verificationCode": "988712", 
    "newPassword": "minuevacontraseña"
}
```

**Respuesta:**
```json
{ "message": "Se Restablecio la contraseña, Vuelva a Iniciar Session" }
```

# Modulo Empresa

## Obtener todas las empresas

**GET**  
`http://localhost:8080/api/company/`

**Respuesta:**
```json
[{},{}] -> Array de empresas
```

## Obtener empresa por ID

**GET**  
`http://localhost:8080/api/company/:id`

**Respuesta:**
```json
{} -> Empresa
```

## Actualizar empresa

**PUT**  
`http://localhost:8080/api/company/:id`

**Body:**
```json
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
```

**Parámetros:**
- `id`: 64a5f2d37e2517e6c45a1234

**Respuesta:**
```json
{} -> Empresa
```

## Eliminar empresa

**DELETE**  
`http://localhost:8080/api/company/:id`

**Parámetros:**
- `id`: 64a5f2d37e2517e6c45a1234

**Respuesta:**
```json
{
    "message": "Empresa Elimiada exitosamente"
}
```

## Cambiar Contraseña Empresa

**POST**  
`http://localhost:8080/api/company/:companyId/change-password`

**Body:**
```json
{
    "companyPassword" : "root12", 
    "newPassword" : "123456"
}
```

**Respuesta:**
```json
{
    "message": "Contraseña cambiada exitosamente"
}
```

## Validar Contraseña de Empresa

**POST**  
`http://localhost:8080/api/company/6756e09183b64ad9c902c08c/validate-password`

**Body:**
```json
{
    "attempPassword" : "123456"
}
```

**Respuesta:**
```json
{
    "message": "Contraseña Correcta"
}
```

# Modulo Sucursal

## Crear Sucursal

**POST**  
`http://localhost:8080/api/:companyId/sucursales`

**Body:**
```json
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
```

**Respuesta:**
```json
{
    "message": "Sucursal registrada exitosamente"
}
```

## Obtener todas las sucursales

**GET**  
`http://localhost:8080/api/:companyId/sucursales/`

**Respuesta:**
```json
[{},{}] -> Array de sucursales
```

**Parámetros:**
- `:companyId` -> el id de la empresa

## Obtener sucursal por ID

**GET**  
`http://localhost:8080/api/:companyId/sucursales/:id`

**Respuesta:**
```json
{} -> Sucursal  
```

**Parámetros:**
- `:companyId` -> ID de la empresa
- `:id`  -> ID de la sucursal

## Actualizar sucursal

**PUT**  
`http://localhost:8080/api/:companyId/sucursales/:id`

**Body:**
```json
{} -> Sucursal con los datos a actualizar
```

**Parámetros:**
- `:companyId` -> ID de la empresa
- `:id`  -> ID de la sucursal

**Respuesta:**
```json
{
  "message": "Sucursal actualizada exitosamente"
}
```

## Eliminar sucursal

**DELETE**  
`http://localhost:8080/api/:companyId/sucursales/:id`

**Parámetros:**
- `:id` -> ID de la sucursal
- `:companyId` -> ID de la empresa

**Respuesta:**
```json
{
  "message": "Sucursal eliminada exitosamente"
}
```

# Modulo Maquina

## Crear Maquina

**POST**  
`http://localhost:8080/api/:companyId/maquinas/:sucursalId/`

**Body:**
```json
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
    "horasUso": 2500
}
```

**Parámetros:**
- `:companyId` -> ID de la empresa
- `:sucursalId` -> ID de la sucursal

**Respuesta:**
```json
{
    "message": "Maquina registrada exitosamente"
}
```

## Obtener todas las maquinas de una empresa

**GET**  
`http://localhost:8080/api/:companyId/maquinas`

**Parámetros:**
- `companyId`: 6755fb8457ffc88c52f7b277 -> ID de la empresa

**Respuesta:**
```json
[{},{}] -> Array de maquinas de la empresa
```

## Filtrar maquinas por Tipo

**GET**  
`http://localhost:8080/api/:companyId/maquinas?tipo=Lavadora`

**Parámetros:**
- `companyId`: 6755fb8457ffc88c52f7b277 -> ID de la empresa
- `tipo`: Secadora | Lavadora | Planchadora -> Tipo de maquina

**Respuesta:**
```json
{} -> Maquina filtradas por tipo de la empresa
```

## Filtrar maquinas por Sucursal

**GET**  
`http://localhost:8080/api/6755fb8457ffc88c52f7b277/maquinas?sucursal=67561bff59f74bee5fbcfc26`

**Parámetros:**
- `companyId`: 6755fb8457ffc88c52f7b277 -> ID de la empresa
- `sucursal`: 67561bff59f74bee5fbcfc26 -> ID de la sucursal

**Respuesta:**
```json
{} -> Maquinas filtradas por sucursal de la empresa
```

## Filtrar maquinas por Tipo y Sucursal

**GET**  
`http://localhost:8080/api/:companyId/maquinas?tipo=Lavadora&sucursal=ID`

**Parámetros:**
- `companyId`: 6755fb8457ffc88c52f7b277 -> ID de la empresa
- `tipo`: Secadora | Lavadora | Planchadora -> Tipo de maquina
- `sucursal`: 67561bff59f74bee5fbcfc26 -> ID de la sucursal

**Respuesta:**
```json
{} -> Maquinas filtradas por tipo y sucursal de la empresa
```

## Obtener maquinas por código de fabrica

**GET**  
`http://localhost:8080/api/:companyId/maquinas/codigo/:codigoFabrica`

**Parámetros:**
- `companyId`: 6755fb8457ffc88c52f7b277 -> ID de la empresa
- `codigoFabrica`: HAAS-FR2000-0123 -> Código de fabrica de la maquina

**Respuesta:**
```json
{} -> Maquina
```

## Obtener maquinas por ID

**GET**  
`http://localhost:8080/api/:companyId/maquinas/:id`

**Parámetros:**
- `companyId`: 6755fb8457ffc88c52f7b277 -> ID de la empresa
- `id`: 6755fb8457ffc88c52f7b277 -> ID de la maquina

**Respuesta:**
```json
{} -> Maquina
```

## Actualizar maquina

**PUT**  
`http://localhost:8080/api/:companyId/maquinas/:id`

**Body:**
```json
{}
```

**Parámetros:**
- `companyId`: 6755fb8457ffc88c52f7b277 -> ID de la empresa
- `id`: 6755fb8457ffc88c52f7b277 -> ID de la maquina

**Respuesta:**
```json
{
    "message": "Maquina actualizada exitosamente"
}
```

## Eliminar maquina

**DELETE**  
`http://localhost:8080/api/:companyId/maquinas/:id`

**Parámetros:**
- `companyId`: 6755fb8457ffc88c52f7b277 -> ID de la empresa
- `id`: 6755fb8457ffc88c52f7b277 -> ID de la maquina

**Respuesta:**
```json
{
    "message": "Maquina eliminada exitosamente"
}
```

# Modulo Empleado

## Crear Empleado

**POST**  
`http://localhost:8080/api/companyId/empleado/sucursalId`

**Body:**
```json
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
```

**Respuesta:**
```json
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
```

## Filtrar Todos los empleados de la empresa

**GET**  
`http://localhost:8080/api/:companyId/empleado/?sucursal=6759b77b86c3fc581f75f083&areaTrabajo=Tecnología`

**Parámetros:**
- `:companyId` -> ID de la empresa

**Query Params:**
- `sucursal` -> SUCURSAL DE LA EMPRESA (opcional)
- `areaTrabajo` -> área de trabajo de empleado

**Respuesta:**
```json
[ { }]-> resultado de el filtro
```

## Obtener empleado por ID

**GET**  
`http://localhost:8080/api/:companyId/empleado/id`

**Respuesta:**
```json
{} -> EMP
```

## Actualizar Empleado

**PUT**  
`http://localhost:8080/api/:companyId/empleado/id`

**Body:**
```json
{
    "apellidos": "Ordoñez Cente",
    "nombres": "Zosimo Nestor",
    "dni": "98123312",
    "fechaNacimiento": "1990-05-15",
    "genero": "Piedra"
}
```

**Respuesta:**
```json
{
    "message": "Empleado actualizado exitosamente"
}
```

## Eliminar empleado

**DELETE**  
`http://localhost:8080/api/:companyId/empleado/id`

**Respuesta:**
```json
{
    "message": "Empleado eliminado exitosamente"
}
```

# Modulo Operaciones (CORE)

## Crear Operación

**POST**  
`http://localhost:8080/api/:companyId/operaciones/:sucursalId/`

### Ejemplo 1: Operación de Lavado
```json
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
```

### Ejemplo 2: Operación con Múltiples Procesos
```json
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
```

### Ejemplo 3: Operación Compleja
```json
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
```

**Respuesta:**
```json
{
    "message": "Operación creada exitosamente",
    "operacion": {
        "_id": "675d9c12e4f5a6b7c8d9e0f1",
        "currentStage": "lavado",
        "nextStage": "secado"
    }
}
```

## Obtener Todas las Operaciones

**GET**  
`http://localhost:8080/api/:companyId/operaciones/:sucursalId`

**Respuesta:**
```json
{
    "success": true,
    "data": {
        "operaciones": [
            
        ],
        "total": 2,
        "page": 1,
        "limit": 10
    }
}
```
**Parametros Filtro (Opcional, filtro basado en propiedades del Modelo)**
`http://localhost:8080/api/:companyId/operaciones/:sucursalId/?estadoOperacion=true`
estadoOperacion -> true o false, filtra de acuerdo a esa propiedad las operaciones

**Parametros Paginacion(Opcional)**
`http://localhost:8080/api/:companyId/operaciones/:sucursalId/?page=1&limit=1`
Paginacion Agregada
page -> Pagina Actual
limit -> Limite por pagina


## Obtener Operación por ID

**GET**  
`http://localhost:8080/api/:companyId/operaciones/:sucursalId/:id`

**Respuesta:**
```json
{
    "success": true,
    "data": {
        "_id": "67872a73a840b674d6dce739",
        "company": {
            "_id": "677d27370ed9325d9e4a33c7",
            "nombreLegal": "root",
            "companyName": "root",
            "companyPassword": "$2a$10$KPhv4xfoQY5udPiTsOd7EeUzUrC3E6uwQNznjj1KtSMEALxz3tBLm",
            "email": "root@gmail.com",
            "plan": "root",
            "sucursales": [],
            "estado": true,
            "isVerified": false,
            "createdAt": "2025-01-07T13:08:07.541Z",
            "updatedAt": "2025-01-07T13:08:07.541Z",
            "__v": 0
        },
        "sucursal": {
            "horarioAtencion": {
                "apertura": "08:00",
                "cierre": "20:00"
            },
            "ubicacionGPS": {
                "latitude": -12.0864,
                "longitude": -77.0348
            },
            "encargado": {
                "nombre": "Juan Pérez",
                "telefono": "+51 999888777",
                "email": "juan.perez@lavanderiaexpress.com"
            },
            "_id": "6786aa52abdf96d3b6322316",
            "company": "677d27370ed9325d9e4a33c7",
            "nombreSucursal": "Sucursal secundaria",
            "direccion": "Av. Javier Prado 1234, San Isidro",
            "telefono": "+51 987654321",
            "email": "sede.central@lavanderiaexpress.com",
            "estado": true,
            "capacidadMaxima": 100,
            "maquinas": [
                "64a5f2d37e2517e6c45a1234",
                "64a5f2d37e2517e6c45a5678"
            ],
            "createdAt": "2025-01-14T18:17:54.772Z",
            "updatedAt": "2025-01-14T18:17:54.772Z",
            "__v": 0
        },
        "fecInicio": "2024-03-20T10:00:00.000Z",
        "fecFinal": "2024-03-20T18:00:00.000Z",
        "estadoOperacion": false,
        "currentStage": "lavado",
        "nextStage": "secado",
        "procesos": [
            {
                "tipo": "Lavado",
                "fecha": "2024-03-20T00:00:00.000Z",
                "hora": "10:00",
                "responsable": null,
                "detalles": [
                    {
                        "numOrden": "LAV-001",
                        "maquina": null,
                        "cantPrendas": 50,
                        "etiqueta": "Ropa clara",
                        "observaciones": "Lavado delicado"
                    }
                ],
                "estado": false,
                "_id": "67872a73a840b674d6dce73a",
                "createdAt": "2025-01-15T03:24:35.666Z",
                "updatedAt": "2025-01-15T03:24:35.666Z"
            }
        ],
        "createdAt": "2025-01-15T03:24:35.667Z",
        "updatedAt": "2025-01-15T03:24:35.667Z",
        "__v": 0
    }
}
```

## Actualizar Operación

**PUT**  
`http://localhost:8080/api/:companyId/operaciones/:sucursalId/:id`

**Body:**
```json
{
    "currentStage": "secado",
    "nextStage": "planchado",
    "estadoOperacion": true
}
```

**Respuesta:**
```json
{
    "success": true,
    "message": "Operación actualizada exitosamente",
    "data": {
        "_id": "67872bc0a3c92668a1055548",
        "company": "677d27370ed9325d9e4a33c7",
        "sucursal": "6786aa52abdf96d3b6322316",
        "fecInicio": "2024-03-20T09:00:00.000Z",
        "fecFinal": "2024-03-21T17:00:00.000Z",
        "estadoOperacion": true,
        "currentStage": "secado",
        "nextStage": "planchado",
        "procesos": [
            {
                "tipo": "Lavado",
                "fecha": "2024-03-20T00:00:00.000Z",
                "hora": "09:30",
                "responsable": "675b7a703c2e8e6476da2aea",
                "detalles": [
                    {
                        "numOrden": "LAV-002",
                        "maquina": "675c8b92d4f3e789a0bc1234",
                        "cantPrendas": 75,
                        "etiqueta": "Ropa oscura",
                        "observaciones": "Temperatura media"
                    }
                ],
                "estado": false,
                "_id": "67872bc0a3c92668a1055549",
                "createdAt": "2025-01-15T03:30:08.738Z",
                "updatedAt": "2025-01-15T03:30:08.738Z"
            },
            {
                "tipo": "Secado",
                "fecha": "2024-03-20T00:00:00.000Z",
                "hora": "11:30",
                "responsable": "675b7a703c2e8e6476da2aeb",
                "detalles": [
                    {
                        "numOrden": "SEC-002",
                        "maquina": "675c8b92d4f3e789a0bc5678",
                        "cantPrendas": 75,
                        "etiqueta": "Ropa oscura",
                        "observaciones": "Secado normal"
                    }
                ],
                "estado": false,
                "_id": "67872bc0a3c92668a105554a",
                "createdAt": "2025-01-15T03:30:08.740Z",
                "updatedAt": "2025-01-15T03:30:08.740Z"
            }
        ],
        "createdAt": "2025-01-15T03:30:08.742Z",
        "updatedAt": "2025-01-15T04:55:25.087Z",
        "__v": 0
    }
}
```

## Eliminar Operación

**DELETE**  
`http://localhost:8080/api/:companyId/operaciones/:id`

**Respuesta:**
```json
{
    "success": true,
    "message": "Operación eliminada exitosamente",
    "data": {
        "_id": "67872a73a840b674d6dce739",
        "company": "677d27370ed9325d9e4a33c7",
        "sucursal": "6786aa52abdf96d3b6322316",
        "fecInicio": "2024-03-20T10:00:00.000Z",
        "fecFinal": "2024-03-20T18:00:00.000Z",
        "estadoOperacion": true,
        "currentStage": "lavado",
        "nextStage": "secado",
        "procesos": [
            {
                "tipo": "Lavado",
                "fecha": "2024-03-20T00:00:00.000Z",
                "hora": "10:00",
                "responsable": "675b7a703c2e8e6476da2aea",
                "detalles": [
                    {
                        "numOrden": "LAV-001",
                        "maquina": "675c8b92d4f3e789a0bc1234",
                        "cantPrendas": 50,
                        "etiqueta": "Ropa clara",
                        "observaciones": "Lavado delicado"
                    }
                ],
                "estado": false,
                "_id": "67872a73a840b674d6dce73a",
                "createdAt": "2025-01-15T03:24:35.666Z",
                "updatedAt": "2025-01-15T03:24:35.666Z"
            }
        ],
        "createdAt": "2025-01-15T03:24:35.667Z",
        "updatedAt": "2025-01-15T04:49:58.579Z",
        "__v": 0
    }
}
```

## Agregar Proceso a Operación

**POST**  
`http://localhost:8080/api/:companyId/operaciones/:sucursalId/:operacionId/procesos`

**Body:**
```json
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
```

**Respuesta:**
```json
{
    "success": true,
    "message": "Proceso agregado exitosamente",
    "data": {
        "_id": "67872bc0a3c92668a1055548",
        "company": "677d27370ed9325d9e4a33c7",
        "sucursal": "6786aa52abdf96d3b6322316",
        "fecInicio": "2024-03-20T09:00:00.000Z",
        "fecFinal": "2024-03-21T17:00:00.000Z",
        "estadoOperacion": true,
        "currentStage": "secado",
        "nextStage": "planchado",
        "procesos": [
            {
                "tipo": "Lavado",
                "fecha": "2024-03-20T00:00:00.000Z",
                "hora": "09:30",
                "responsable": "675b7a703c2e8e6476da2aea",
                "detalles": [
                    {
                        "numOrden": "LAV-002",
                        "maquina": "675c8b92d4f3e789a0bc1234",
                        "cantPrendas": 75,
                        "etiqueta": "Ropa oscura",
                        "observaciones": "Temperatura media"
                    }
                ],
                "estado": false,
                "_id": "67872bc0a3c92668a1055549",
                "createdAt": "2025-01-15T03:30:08.738Z",
                "updatedAt": "2025-01-15T03:30:08.738Z"
            },
            {
                "tipo": "Secado",
                "fecha": "2024-03-20T00:00:00.000Z",
                "hora": "11:30",
                "responsable": "675b7a703c2e8e6476da2aeb",
                "detalles": [
                    {
                        "numOrden": "SEC-002",
                        "maquina": "675c8b92d4f3e789a0bc5678",
                        "cantPrendas": 75,
                        "etiqueta": "Ropa oscura",
                        "observaciones": "Secado normal"
                    }
                ],
                "estado": false,
                "_id": "67872bc0a3c92668a105554a",
                "createdAt": "2025-01-15T03:30:08.740Z",
                "updatedAt": "2025-01-15T03:30:08.740Z"
            },
            {
                "tipo": "Doblado",
                "fecha": "2024-03-20T00:00:00.000Z",
                "hora": "14:30",
                "responsable": "675b7a703c2e8e6476da2aea",
                "detalles": [
                    {
                        "numOrden": "SEC-001",
                        "maquina": "675c8b92d4f3e789a0bc5678",
                        "cantPrendas": 50,
                        "etiqueta": "Ropa Oscura",
                        "observaciones": "Nuevo Proceso de Doblado agregado"
                    }
                ],
                "estado": false,
                "_id": "678741250aeac7616747d0c3",
                "createdAt": "2025-01-15T05:01:25.733Z",
                "updatedAt": "2025-01-15T05:01:25.733Z"
            }
        ],
        "createdAt": "2025-01-15T03:30:08.742Z",
        "updatedAt": "2025-01-15T05:01:25.734Z",
        "__v": 1
    }
}
```

## Actualizar Etapa Actual

**PATCH**  
`http://localhost:8080/api/:companyId/operaciones/:sucursalId/:id/stage`

**Body:**
```json
{
    "currentStage": "secado",
    "nextStage": "planchado"
}
```

**Respuesta:**
```json
{
    "success": true,
    "message": "Etapa actualizada exitosamente",
    "data": {
        "_id": "67872bc0a3c92668a1055548",
        "company": "677d27370ed9325d9e4a33c7",
        "sucursal": "6786aa52abdf96d3b6322316",
        "fecInicio": "2024-03-20T09:00:00.000Z",
        "fecFinal": "2024-03-21T17:00:00.000Z",
        "estadoOperacion": true,
        "currentStage": "doblado",
        "nextStage": "planchado",
        "procesos": [
            {
                "tipo": "Lavado",
                "fecha": "2024-03-20T00:00:00.000Z",
                "hora": "09:30",
                "responsable": "675b7a703c2e8e6476da2aea",
                "detalles": [
                    {
                        "numOrden": "LAV-002",
                        "maquina": "675c8b92d4f3e789a0bc1234",
                        "cantPrendas": 75,
                        "etiqueta": "Ropa oscura",
                        "observaciones": "Temperatura media"
                    }
                ],
                "estado": false,
                "_id": "67872bc0a3c92668a1055549",
                "createdAt": "2025-01-15T03:30:08.738Z",
                "updatedAt": "2025-01-15T03:30:08.738Z"
            },
            {
                "tipo": "Secado",
                "fecha": "2024-03-20T00:00:00.000Z",
                "hora": "11:30",
                "responsable": "675b7a703c2e8e6476da2aeb",
                "detalles": [
                    {
                        "numOrden": "SEC-002",
                        "maquina": "675c8b92d4f3e789a0bc5678",
                        "cantPrendas": 75,
                        "etiqueta": "Ropa oscura",
                        "observaciones": "Secado normal"
                    }
                ],
                "estado": false,
                "_id": "67872bc0a3c92668a105554a",
                "createdAt": "2025-01-15T03:30:08.740Z",
                "updatedAt": "2025-01-15T03:30:08.740Z"
            },
            {
                "tipo": "Doblado",
                "fecha": "2024-03-20T00:00:00.000Z",
                "hora": "14:30",
                "responsable": "675b7a703c2e8e6476da2aea",
                "detalles": [
                    {
                        "numOrden": "SEC-001",
                        "maquina": "675c8b92d4f3e789a0bc5678",
                        "cantPrendas": 50,
                        "etiqueta": "Ropa Oscura",
                        "observaciones": "Nuevo Proceso de Doblado agregado"
                    }
                ],
                "estado": false,
                "_id": "678741250aeac7616747d0c3",
                "createdAt": "2025-01-15T05:01:25.733Z",
                "updatedAt": "2025-01-15T05:01:25.733Z"
            }
        ],
        "createdAt": "2025-01-15T03:30:08.742Z",
        "updatedAt": "2025-01-15T05:06:18.116Z",
        "__v": 1
    }
}
```

## Actualizar Proceso

**PATCH**  
`http://localhost:8080/api/:companyId/operaciones/:sucursalId/:operacionId/procesos/:procesoId`

**Body:**
```json
{
    "estado": true
}
```

**Respuesta:**
```json
{
    "success": true,
    "message": "Proceso actualizado exitosamente",
    "data": {
        "_id": "67872bc0a3c92668a1055548",
        "company": "677d27370ed9325d9e4a33c7",
        "sucursal": "6786aa52abdf96d3b6322316",
        "fecInicio": "2024-03-20T09:00:00.000Z",
        "fecFinal": "2024-03-21T17:00:00.000Z",
        "estadoOperacion": true,
        "currentStage": "doblado",
        "nextStage": "planchado",
        "procesos": [
            {
                "tipo": "Lavado",
                "fecha": "2024-03-20T00:00:00.000Z",
                "hora": "09:30",
                "responsable": "675b7a703c2e8e6476da2aea",
                "detalles": [
                    {
                        "numOrden": "LAV-002",
                        "maquina": "675c8b92d4f3e789a0bc1234",
                        "cantPrendas": 75,
                        "etiqueta": "Ropa oscura",
                        "observaciones": "Temperatura media"
                    }
                ],
                "estado": true,
                "_id": "67872bc0a3c92668a1055549",
                "createdAt": "2025-01-15T03:30:08.738Z",
                "updatedAt": "2025-01-15T05:18:36.958Z"
            },
            {
                "tipo": "Secado",
                "fecha": "2024-03-20T00:00:00.000Z",
                "hora": "11:30",
                "responsable": "675b7a703c2e8e6476da2aeb",
                "detalles": [
                    {
                        "numOrden": "SEC-002",
                        "maquina": "675c8b92d4f3e789a0bc5678",
                        "cantPrendas": 75,
                        "etiqueta": "Ropa oscura",
                        "observaciones": "Secado normal"
                    }
                ],
                "estado": true,
                "_id": "67872bc0a3c92668a105554a",
                "createdAt": "2025-01-15T03:30:08.740Z",
                "updatedAt": "2025-01-15T05:20:45.577Z"
            },
            {
                "tipo": "Doblado",
                "fecha": "2024-03-20T00:00:00.000Z",
                "hora": "14:30",
                "responsable": "675b7a703c2e8e6476da2aea",
                "detalles": [
                    {
                        "numOrden": "SEC-001",
                        "maquina": "675c8b92d4f3e789a0bc5678",
                        "cantPrendas": 50,
                        "etiqueta": "Ropa Oscura",
                        "observaciones": "Nuevo Proceso de Doblado agregado"
                    }
                ],
                "estado": false,
                "_id": "678741250aeac7616747d0c3",
                "createdAt": "2025-01-15T05:01:25.733Z",
                "updatedAt": "2025-01-15T05:01:25.733Z"
            }
        ],
        "createdAt": "2025-01-15T03:30:08.742Z",
        "updatedAt": "2025-01-15T05:20:45.577Z",
        "__v": 1
    }
}
```

## Filtrar Procesos

**GET**  
`http://localhost:8080/api/:companyId/operaciones/procesos/filter?tipo=Lavado&fecha=2024-03-20`

**Parámetros de Consulta:**
- `tipo`: Tipo de proceso (opcional)
- `fecha`: Fecha del proceso (opcional) *Formato: fecha=YYYY-MM-DD*
- `responsable`: ID del responsable (opcional)
- ``

**Respuesta:**
```json
[{}, {}] -> Array de procesos filtrados
```

## Documentación del Endpoint `getProcesosByFilters` **De Filtrar Procesos**

### Descripción
Obtiene procesos específicos de una operación, filtrados por compañía, sucursal y parámetros adicionales (responsable, estado, tipo, fechas). Incluye paginación para manejar grandes conjuntos de datos.

---

### URL y Método HTTP
```http
GET /api/operaciones/{sucursalId}/procesos/filter
```

#### Parámetros de la Solicitud

#### Parámetros de la URL
| Parámetro   | Tipo      | Descripción                                 | Requerido |
|-------------|-----------|---------------------------------------------|-----------|
| companyId   | ObjectId   | ID de la compañía (se envía en el cuerpo)   | Sí        |
| sucursalId  | ObjectId   | ID de la sucursal (en la URL)                | Sí        |

#### Parámetros de Consulta (Query)
| Parámetro    | Tipo      | Descripción                                  | Requerido | Valores Válidos                   |
|--------------|-----------|----------------------------------------------|-----------|-----------------------------------|
| page         | Integer   | Página actual (por defecto: 1)              | No        | Número ≥ 1                     |
| limit        | Integer   | Número de resultados por página (por defecto: 10) | No        | Número entre 1-100               |
| responsable  | ObjectId  | ID del responsable del proceso               | No        | ObjectId válido                   |
| estado       | Boolean   | Estado del proceso                           | No        | true/false (como string o booleano) |
| tipo         | String    | Tipo de proceso                              | No        | Lavado, Secado, Planchado, CC, etc. |
| fecha        | Date      | Fecha específica (formato: YYYY-MM-DD)       | No        | Fecha válida                        |
| fechaInicio  | Date      | Fecha de inicio del rango                    | No        | Fecha válida                        |
| fechaFin     | Date      | Fecha final del rango                        | No        | Fecha válida                        |

#### Ejemplo de Solicitud
```http
GET /api/operaciones/65f3b1a7c1b6d4a9e4f3d2a1/procesos/filter?page=1&limit=10&tipo=Lavado&estado=true&fecha=2024-03-15
```

---

### Respuesta Exitosa

**Código:** `200 OK`

**Estructura:**

```json
{
    "success": true,
    "data": {
        "procesos": [
            {
                "_id": "65f3b1a7c1b6d4a9e4f3d2a1",
                "tipo": "Lavado",
                "fecha": "2024-03-15T08:00:00.000Z",
                "responsable": "65f3b1a7c1b6d4a9e4f3d2a2",
                "estado": true,
                "detalles": []
            }
        ],
        "total": 1,
        "page": 1,
        "limit": 10,
        "message": "Procesos obtenidos exitosamente"
    }
}
```

---

### Posibles Errores

| Código | Mensaje                          | Causa Típica                         |
|--------|----------------------------------|--------------------------------------|
| 400    | IDs de compañía o sucursal no válidos | ObjectId inválido en la URL o parámetros. |
| 400    | Formato de fecha inválido        | Fecha no sigue el formato YYYY-MM-DD. |
| 500    | Error interno del servidor       | Fallo en la base de datos o validación. |

---

### Notas Adicionales

### Validaciones:
- Los IDs (`companyId`, `sucursalId`, `responsable`) deben ser ObjectId válidos.
- Las fechas se interpretan en UTC para evitar inconsistencias horarias.
- Si se proporciona `fecha`, se ignora `fechaInicio` y `fechaFin`.

### Paginación:
- Si no se especifican `page` o `limit`, se usan los valores por defecto (`page=1`, `limit=10`).

### Rendimiento:
Se recomienda crear índices en MongoDB para los campos frecuentes:

```javascript
db.operaciones.createIndex({ "procesos.fecha": 1 });
db.operaciones.createIndex({ "procesos.responsable": 1 });
```

---

### Ejemplo de Uso en Código

```javascript
const response = await fetch('/api/operaciones/65f3b1a7c1b6d4a9e4f3d2a1/procesos/filter?page=1&limit=10&tipo=Lavado&estado=true&fecha=2024-03-15');
const data = await response.json();
console.log(data);
```

---

### Referencias
- [MongoDB Aggregation Pipeline](https://www.mongodb.com/docs/manual/core/aggregation-pipeline/)
- [Mongoose Documentation](https://mongoosejs.com/docs/)



## Filtrar Procesos por Número de Orden

**GET**  
`http://localhost:8080/api/:companyId/operaciones/procesos/by-orden?numOrden=LAV-001`

**Parámetros de Consulta:**
- `numOrden`: Número de orden a buscar

**Respuesta:**
```json
[{}, {}] -> Array de procesos que coinciden con el número de orden
```
