import Operacion from '../model/OperacionModel.js';

class OperacionService {
    async createOperacion(operacionData) {
        try {
            const operacion = new Operacion(operacionData);
            return await operacion.save();
        } catch (error) {
            throw new Error(`Error creando operación: ${error.message}`);
        }
    }

    async getOperacionById(id) {
        try {
            const operacion = await Operacion.findById(id)
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

    async getAllOperaciones(query = {}, page = 1, limit = 10) {
        try {
            const options = {
                page,
                limit,
                populate: [
                    { path: 'company', select: 'nombre' },
                    { path: 'sucursal', select: 'nombre' }
                ],
                sort: { createdAt: -1 }
            };

            return await Operacion.paginate(query, options);
        } catch (error) {
            throw new Error(`Error listando operaciones: ${error.message}`);
        }
    }

    async updateOperacion(id, updateData) {
        try {
            const operacion = await Operacion.findByIdAndUpdate(
                id, 
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

    async deleteOperacion(id) {
        try {
            const operacion = await Operacion.findByIdAndDelete(id);

            if (!operacion) {
                throw new Error('Operación no encontrada');
            }

            return operacion;
        } catch (error) {
            throw new Error(`Error eliminando operación: ${error.message}`);
        }
    }

    async addProcesoToOperacion(operacionId, procesoData) {
        try {
            const operacion = await Operacion.findById(operacionId);

            if (!operacion) {
                throw new Error('Operación no encontrada');
            }

            operacion.procesos.push(procesoData);
            return await operacion.save();
        } catch (error) {
            throw new Error(`Error agregando proceso: ${error.message}`);
        }
    }

    async updateCurrentStage(operacionId, newStage) {
        try {
            const operacion = await Operacion.findByIdAndUpdate(
                operacionId, 
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

    async updateProceso(operacionId, procesoId, updateData) {
        try {
            const operacion = await Operacion.findOneAndUpdate(
                { 
                    _id: operacionId,
                    'procesos._id': procesoId 
                },
                { 
                    $set: { 'procesos.$': { ...updateData, _id: procesoId } }
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

    async getProcesosByFilters(query = {}) {
        try {
            const { responsable, estado, tipo } = query;
            const matchQuery = {};
            
            if (responsable) matchQuery['procesos.responsable'] = responsable;
            if (estado !== undefined) matchQuery['procesos.estado'] = estado === 'true';
            if (tipo) matchQuery['procesos.tipo'] = tipo;

            const operaciones = await Operacion.aggregate([
                { $unwind: '$procesos' },
                { $match: matchQuery },
                { $replaceRoot: { newRoot: '$procesos' } }
            ]);

            return operaciones;
        } catch (error) {
            throw new Error(`Error filtrando procesos: ${error.message}`);
        }
    }

    async filterProcesosByNumOrden(numOrden) {
        try {
            const operaciones = await Operacion.aggregate([
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