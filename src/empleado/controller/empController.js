import EmpleadoModel from "../model/EmpleadoModel.js";

export const getAllEmpleados = async (req, res) => {
    try {
        const empleados = await EmpleadoModel.find()
        res.json(empleados)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

//Crud
export const createEmpleado = async (req, res) => {
    try {
        const {apellidos, nombres, dni, puesto, sede} = req.body
        const emp = new EmpleadoModel({
            apellidos,
            nombres, 
            dni,
            puesto,
            sede
        })
        await emp.save()
        res.status(201).json({message:'Empleado registrado exitosamente'})  
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

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
        const{apellidos, nombres, dni, puesto, sede} = req.body
        const emp = await EmpleadoModel.findByIdAndUpdate(
            req.params.id,
            {apellidos, nombres, dni, puesto, sede },
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
