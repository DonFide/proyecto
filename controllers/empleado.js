const empleadoService = require("../services/empleado");

const listar = async (req, res) => {
  try {
    const empleados = await empleadoService.obtenerEmpleados();
    res.json(empleados);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const listarTodo = async (req, res) => {
  try {
    const empleados = await empleadoService.obtenerTodosLosEmpleados();
    res.json(empleados);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const registrar = async (req, res) => {
  try {
    await empleadoService.insertarEmpleado(req.body,req.user);
    res.json({ mensaje: "Empleado registrado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const actualizar = async (req, res) => {
  const { id } = req.params;
  try {
    const cambios = await empleadoService.actualizarEmpleado(id, req.body,req.user);
    if (cambios === 0) return res.status(404).json({ error: "Empleado no encontrado" });
    res.json({ mensaje: "Empleado actualizado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const eliminar = async (req, res) => {
  const { id } = req.params;
  try {
    const cambios = await empleadoService.eliminarEmpleado(id,req.user);
    if (cambios === 0) return res.status(404).json({ error: "Empleado no encontrado" });
    res.json({ mensaje: "Empleado eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  listar,
  listarTodo,
  registrar,
  actualizar,
  eliminar
};