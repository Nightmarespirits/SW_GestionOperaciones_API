import {Router} from 'express';
import authRoutes from '../auth/routes/authRoutes.js';
import companyRoutes from '../company/routes/companyRoutes.js';
import empleadoRoutes from '../empleado/routes/empleadoRoutes.js';
import maquinaRoutes from '../maquina/routes/maquinaRoutes.js';
import operacionRoutes from '../operacion/routes/operacionRoutes.js'
import procesosRoutes from '../operacion/routes/procesosRoutes.js'
import sucursalRoutes from '../sucursal/routes/sucursalRoutes.js'

const mainRoutes = Router()
mainRoutes.use('/auth', authRoutes)
mainRoutes.use('/company', companyRoutes)
mainRoutes.use('/empleado', empleadoRoutes)
mainRoutes.use('/:companyId/maquinas', maquinaRoutes)
mainRoutes.use('/operacion', operacionRoutes)
mainRoutes.use('/procesos', procesosRoutes)
mainRoutes.use('/:companyId/sucursales', sucursalRoutes)

export default mainRoutes
