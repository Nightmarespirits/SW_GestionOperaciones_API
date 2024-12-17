import mongoose from "mongoose";
import EmpleadoModel from "../model/EmpleadoModel.js";

export const getEmpleados = async (req, res) => {
    try {
        const {companyId} = req.params

        const {sucursal, areaTrabajo } = req.query

        let query = {company: companyId}

        if(sucursal) query.sucursal = sucursal
        if(areaTrabajo) query.areaTrabajo = areaTrabajo

        
        const empleados = await EmpleadoModel.find(query)

        if (empleados.length === 0) {
            return res.status(404).json({ message: 'No se encontraron Registro de empleados' });
        }
        res.json(empleados)

    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

//Crud
export const createEmpleado = async (req, res) => {
    try {
        const { companyId } = req.params;
        const { sucursalId } = req.params;

        // Validate ObjectId formats
        if (!mongoose.Types.ObjectId.isValid(companyId)) {
            return res.status(400).json({ message: 'ID de compañía inválido' });
        }
        if (!mongoose.Types.ObjectId.isValid(sucursalId)) {
            return res.status(400).json({ message: 'ID de sucursal inválido' });
        }

        const {
            apellidos,
            nombres, 
            dni,
            fechaNacimiento,
            genero,
            email,
            telefonoPrincipal,
            telefonoSecundario,
            puesto,
            areaTrabajo,
            tipoContrato,
            fechaIngreso,
            salario,
            direccion,
            estadoCivil
        } = req.body;

        // Check for existing employee with same DNI in the current company
        const existingDniEmployee = await EmpleadoModel.findOne({
            company: companyId,
            dni: dni
        });

        if (existingDniEmployee) {
            return res.status(400).json({ 
                message: 'El DNI ya está registrado en esta empresa.',
                details: {
                    dni: dni,
                    companyId: companyId
                }
            });
        }

        // Check for existing employee with same email in the current company
        const existingEmailEmployee = await EmpleadoModel.findOne({
            company: companyId,
            email: email
        });

        if (existingEmailEmployee) {
            return res.status(400).json({ 
                message: 'El email ya está registrado en esta empresa.',
                details: {
                    email: email,
                    companyId: companyId
                }
            });
        }

        // Create new employee
        const emp = new EmpleadoModel({
            company: companyId,
            sucursal: sucursalId,
            apellidos,
            nombres, 
            dni,
            fechaNacimiento,
            genero,
            email,
            telefonoPrincipal,
            telefonoSecundario,
            puesto,
            areaTrabajo,
            tipoContrato,
            fechaIngreso,
            salario,
            direccion,
            estadoCivil
        });

        // Save the new employee
        await emp.save();

        res.status(201).json({
            message: 'Empleado registrado exitosamente',
            empleado: {
                _id: emp._id,
                nombres: emp.nombres,
                apellidos: emp.apellidos,
                dni: emp.dni,
                email: emp.email
            }
        });  
    } catch (error) {
        // Handle potential validation errors
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                message: 'Error de validación',
                errors: Object.values(error.errors).map(err => err.message)
            });
        }

        // Generic error handling
        console.error('Error creating employee:', error);
        res.status(500).json({
            message: 'Error interno del servidor',
            error: error.message
        });
    }
};

export const getEmpById = async (req, res) => {
    try {
        const emp = await EmpleadoModel.findById(req.params.id)

        if(!emp){
            return res.status(404).json({message: "No se econtro el empleado"})
        }
        res.json(emp)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const updateEmp= async (req, res) => {
    try {
        const {companyId} = req.params

        // Validar que el companyId sea un ObjectId válido
        if (!mongoose.Types.ObjectId.isValid(companyId)) {
            return res.status(400).json({ message: 'ID de compañía inválido' });
        }
        
        const {
            sucursal,
            apellidos,
            nombres, 
            dni,
            fechaNacimiento,
            genero,
            email,
            telefonoPrincipal,
            telefonoSecundario,
            puesto,
            areaTrabajo,
            tipoContrato,
            fechaIngreso,
            salario,
            direccion,
            estadoCivil
        } = req.body

        const emp = await EmpleadoModel.findByIdAndUpdate(
            req.params.id,
            {
                company : {_id : companyId},
                sucursal,
                apellidos,
                nombres, 
                dni,
                fechaNacimiento,
                genero,
                email,
                telefonoPrincipal,
                telefonoSecundario,
                puesto,
                areaTrabajo,
                tipoContrato,
                fechaIngreso,
                salario,
                direccion,
                estadoCivil
                
            },
            {new: true}
        )

        if(!emp){
            return res.status(404).json({message: "No se econtro el empleado"})
        }
        res.status(201).json({message:'Empleado actualizado exitosamente'}) 
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const deleteEmp= async (req, res) => {
    try {
        const emp = await EmpleadoModel.findByIdAndDelete(req.params.id)

        if(!emp){
            return res.status(404).json({message: "No se econtro el empleado"})
        }
        res.status(201).json({message:'Registro eliminado correctamente'}) 
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
