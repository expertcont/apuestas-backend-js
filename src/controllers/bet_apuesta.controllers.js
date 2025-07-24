const pool = require('../models/db');

const obtenerTodasApuestas = async (req,res,next)=> {
    try {
        const result = await pool.query(
            `SELECT id,id_evento,equipo_sel,monto,cast(fecha_apuesta as varchar)::varchar(16) as fecha_apuesta,apuesta_estado,apuesta_resultado
             FROM bet_apuesta 
             ORDER BY fecha_apuesta DESC`
        );
        res.json(result.rows);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Error al obtener apuestas' });
    }
};

const obtenerApuesta = async (req,res,next)=> {
    try {
        const { id } = req.params;
        const result = await pool.query(`SELECT id,id_evento,equipo_sel,monto,cast(fecha_apuesta as varchar)::varchar(16) as fecha_apuesta,apuesta_estado,apuesta_resultado FROM bet_apuesta WHERE id = $1`, [id]);

        if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Apuesta no encontrada' });
        }

        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener la apuesta' });
    }
};

const crearApuesta = async (req,res,next)=> {
    try {
        const {
            id_anfitrion,
            id_evento,
            equipo_sel,
            monto,
            apuesta_estado
        } = req.body;

        const result = await pool.query(
        `INSERT INTO bet_apuesta 
            (id_anfitrion, id_evento, equipo_sel, monto, apuesta_estado) 
        VALUES ($1, $2, $3, $4, $5) 
        RETURNING *`,
        [id_anfitrion, id_evento, equipo_sel, monto, apuesta_estado]
        );

        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al crear la apuesta' });
    }
};

const eliminarApuesta = async (req,res,next)=> {
    try {
        const { id } = req.params;
        const result = await pool.query(`DELETE FROM bet_apuesta WHERE id = $1 RETURNING *`, [id]);

        if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Apuesta no encontrada' });
        }

        //res.json({ mensaje: 'Apuesta eliminada' });
        return res.sendStatus(204);
    } catch (err) {
        res.status(500).json({ error: 'Error al eliminar la apuesta' });
    }
};

const actualizarApuesta = async (req,res,next)=> {
    try {
        const { id } = req.params;
        const {
            equipo_sel,
            monto,
            apuesta_estado,
            apuesta_resultado
        } = req.body;

        const result = await pool.query(
        `UPDATE bet_apuesta SET 
            equipo_sel = COALESCE($1, equipo_sel),
            monto = COALESCE($2, monto),
            apuesta_estado = COALESCE($3, apuesta_estado),
            apuesta_resultado = COALESCE($4, apuesta_resultado)
        WHERE id = $5
        RETURNING *`,
        [equipo_sel, monto, apuesta_estado, apuesta_resultado, id]
        );

        if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Apuesta no encontrada' });
        }

        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: 'Error al actualizar la apuesta' });
    }
};

module.exports = {
    obtenerTodasApuestas,
    obtenerApuesta,
    crearApuesta,
    eliminarApuesta,
    actualizarApuesta
 }; 