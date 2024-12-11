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
    "company": {
        "_id": "6755fa58993692540816de04"
    },
    "nombre": "Sede Central Lima",
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
http://localhost:8080/api/sucursal/
RESPUESTA:
[{},{}] -> Array de sucursales

## Obtener sucursal por ID
GET
http://localhost:8080/api/sucursal/:id
RESPUESTA:
{} -> Sucursal  
PARAMETROS:
id: 64a5f2d37e2517e6c45a1234 -> ID de la sucursal

## Obtener sucursal por company ID
GET
http://localhost:8080/api/sucursal/company/:id
RESPUESTA:
[{},{}] -> Array de sucursales de la empresa 
PARAMETROS:
id: 64a5f2d37e2517e6c45a1234 -> ID de la empresa

## Actualizar sucursal
PUT
http://localhost:8080/api/sucursal/:id
body:
{}
PARAMETROS:
id: 64a5f2d37e2517e6c45a1234 -> ID de la sucursal
RESPUESTA:
{
  message: "Sucursal actualizada exitosamente"
}

## Eliminar sucursal
DELETE
http://localhost:8080/api/sucursal/:id
PARAMETROS:
id: 64a5f2d37e2517e6c45a1234 -> ID de la sucursal
RESPUESTA:
{
  message: "Sucursal eliminada exitosamente"
}



# Modulo Maquina
## Crear Maquina
POST
http://localhost:8080/api/:companyId/maquinas
body:
{
    "tipo": "Secadora",
    "modelo": "Secadora",
    "marca": "Samsumg",
    "codigoFabrica": "HAAS-FR2000-0123",
    "nombre": "Secadora 2",
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
    "sucursal": "67561bff59f74bee5fbcfc26"
}
PARAMETROS:
companyId: 6755fb8457ffc88c52f7b277 -> ID de la empresa
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
http://localhost:8080/api/6755fb8457ffc88c52f7b277/maquinas?tipo=Lavadora
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
http://localhost:8080/api/6755fb8457ffc88c52f7b277/maquinas?tipo=Lavadora&sucursal=67561bff59f74bee5fbcfc26
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


# Modulo Mantenimiento










eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb21wYW55SWQiOiI2NzU3N2FjZDdkMDg0ZWU2Y2ZiODdmZjAiLCJub21icmVMZWdhbCI6InJvb3QiLCJjb21wYW55TmFtZSI6InJvb3QiLCJwbGFuIjoicm9vdCIsImVtYWlsIjoiY2xpZGVydHV0YXlhcml2ZXJhQGdtYWlsLmNvbSIsImlhdCI6MTczMzc4NjM1NywiZXhwIjoxNzMzODI5NTU3fQ.py2gQiNRuYsfxRPfdJmc73dMAYv2iJ4TLlp7ZrsEa3k
