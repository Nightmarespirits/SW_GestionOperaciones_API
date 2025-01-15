import Operacion from '../model/OperacionModel.js';

class OperacionService {
    async createOperacion(operacionData, companyId, sucursalId) {
        try {
            const operacion = new Operacion({
                company: companyId,
                sucursal: sucursalId,
                ...operacionData,
            });
            return await operacion.save();
        } catch (error) {
            throw new Error(`Error creando operación: ${error.message}`);
        }
    }

    async getOperacionById(companyId, sucursalId, id) {
        try {
            const operacion = await Operacion.findOne({
                _id: id,
                company: companyId,
                sucursal: sucursalId
            })
                .populate('company')
                .populate('sucursal')
                .populate({
                    path: 'procesos.responsable',
                    select: 'nombre apellido'
                })
                .populate({
                    path: 'procesos.detalles.maquina',
                    select: 'nombre codigo'
                });
            
            if (!operacion) {
                throw new Error('Operación no encontrada');
            }
            
            return operacion;
        } catch (error) {
            throw new Error(`Error obteniendo operación: ${error.message}`);
        }
    }

    async getAllOperaciones(companyId, sucursalId, query = {}, page = 1, limit = 10) {
        try {
            const filter = { company: companyId, sucursal: sucursalId, ...query };
            const operaciones = await Operacion.find(filter)
                .populate('company', 'nombre')
                .populate('sucursal', 'nombre')
                .sort({ createdAt: -1 })
                .skip((page - 1) * limit)
                .limit(limit);

            const total = await Operacion.countDocuments(filter);

            return {
                operaciones,
                total,
                page,
                limit
            };
        } catch (error) {
            throw new Error(`Error listando operaciones: ${error.message}`);
        }
    }

    async updateOperacion(companyId, sucursalId, id, updateData) {
        try {
            const operacion = await Operacion.findOneAndUpdate(
                { _id: id, company: companyId, sucursal: sucursalId },
                updateData, 
                { 
                    new: true, 
                    runValidators: true 
                }
            );

            if (!operacion) {
                throw new Error('Operación no encontrada');
            }

            return operacion;
        } catch (error) {
            throw new Error(`Error actualizando operación: ${error.message}`);
        }
    }

    async deleteOperacion(companyId, sucursalId, id) {
        try {
            const operacion = await Operacion.findOneAndDelete({
                _id: id,
                company: companyId,
                sucursal: sucursalId
            });

            if (!operacion) {
                throw new Error('Operación no encontrada');
            }

            return operacion;
        } catch (error) {
            throw new Error(`Error eliminando operación: ${error.message}`);
        }
    }

    async addProcesoToOperacion(companyId, sucursalId, operacionId, procesoData) {
        try {
            const operacion = await Operacion.findOne({
                _id: operacionId,
                company: companyId,
                sucursal: sucursalId
            });

            if (!operacion) {
                throw new Error('Operación no encontrada');
            }

            operacion.procesos.push(procesoData);
            return await operacion.save();
        } catch (error) {
            throw new Error(`Error agregando proceso: ${error.message}`);
        }
    }

    async updateCurrentStage(companyId, sucursalId, operacionId, newStage) {
        try {
            const operacion = await Operacion.findOneAndUpdate(
                { _id: operacionId, company: companyId, sucursal: sucursalId },
                { currentStage: newStage },
                { new: true }
            );

            if (!operacion) {
                throw new Error('Operación no encontrada');
            }

            return operacion;
        } catch (error) {
            throw new Error(`Error actualizando etapa actual: ${error.message}`);
        }
    }

    async updateProceso(companyId, sucursalId, operacionId, procesoId, updateData) {
        try {
            const operacion = await Operacion.findOneAndUpdate(
                { 
                    _id: operacionId,
                    company: companyId,
                    sucursal: sucursalId,
                    'procesos._id': procesoId 
                },
                { 
                    $set: { 
                        'procesos.$.responsable': updateData.responsable,
                        'procesos.$.detalles': updateData.detalles,
                        'procesos.$.estado': updateData.estado,
                        'procesos.$.tipo': updateData.tipo,
                        'procesos.$.fechaInicio': updateData.fechaInicio,
                        'procesos.$.fechaFin': updateData.fechaFin
                    }
                },
                { new: true, runValidators: true }
            );

            if (!operacion) {
                throw new Error('Operación o proceso no encontrado');
            }

            return operacion;
        } catch (error) {
            throw new Error(`Error actualizando proceso: ${error.message}`);
        }
    }

    async getProcesosByFilters(companyId, sucursalId, query = {}) {
        try {
            const { responsable, estado, tipo, fechaInicio, fechaFin, fecha } = query;
            const matchQuery = { company: companyId, sucursal: sucursalId };

            // Add filters based on query parameters
            if (responsable) matchQuery['procesos.responsable'] = responsable;
            if (estado !== undefined) matchQuery['procesos.estado'] = estado === 'true';
            if (tipo) matchQuery['procesos.tipo'] = tipo;

            // Handle date filtering
            if (fecha) {
                const date = new Date(fecha);
                matchQuery['procesos.fecha'] = {
                    $gte: new Date(date.setHours(0, 0, 0, 0)),
                    $lt: new Date(date.setHours(23, 59, 59, 999))
                };
            } else if (fechaInicio && fechaFin) {
                matchQuery['procesos.fecha'] = {
                    $gte: new Date(fechaInicio),
                    $lt: new Date(fechaFin)
                };
            }

            const operaciones = await Operacion.aggregate([
                { $match: matchQuery },
                { $unwind: '$procesos' },
                { $match: matchQuery },
                { $replaceRoot: { newRoot: '$procesos' } }
            ]);

            return operaciones;
        } catch (error) {
            throw new Error(`Error filtrando procesos: ${error.message}`);
        }
    }

    async filterProcesosByNumOrden(companyId, sucursalId, numOrden) {
        try {
            const operaciones = await Operacion.aggregate([
                { $match: { company: companyId, sucursal: sucursalId } },
                { $unwind: '$procesos' },
                { $unwind: '$procesos.detalles' },
                { $match: { 'procesos.detalles.numOrden': numOrden } },
                { $replaceRoot: { newRoot: '$procesos' } }
            ]);

            return operaciones;
        } catch (error) {
            throw new Error(`Error filtrando por número de orden: ${error.message}`);
        }
    }
}

export default new OperacionService();