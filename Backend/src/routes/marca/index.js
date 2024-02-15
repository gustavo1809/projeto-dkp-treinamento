const { Router } = require("express");
const mysql = require('mysql2');

const router = Router();

const conn = mysql.createConnection({
    host: 'localhost',
    database: 'dkp-treinamento',
    user: 'root',
    password: 'parique30'
});

router.get('/listar', function (req, res) {

    try {
        conn.execute('SELECT * FROM tbl_marcas;', function (err, response, fields) {

            if (err) throw err;

            res.status(200).json({
                msg: 'Sucesso na listagem de marcas!',
                data: response
            });
        });

    } catch (error) {

        res.status(200).json({
            msg: 'Erro ao listar marcas!',
            data: error
        });
    }
});

router.post('/cadastrar', function (req, res) {

    try {

        conn.execute('INSERT INTO tbl_marcas (nome) VALUES (?);', [req.body.nome], function (err, response, fields) {

            if (err) throw err;

            res.status(200).json({
                msg: 'Marca cadastrado com sucesso!',
                data: response
            });
        });

    } catch (error) {

        res.status(500).json({
            msg: 'Erro ao cadastrar marca!',
            data: error
        });
    }
});

router.put('/alterar/:id', function (req, res) {

    try {

        conn.execute('UPDATE tbl_marcas SET  nome = ? WHERE id = ?;', [ req.body.nome, req.params.id], function (err, response, fields) {

            if (err) throw err;

            res.status(200).json({
                msg: 'Marca atualizado com sucesso!',
                data: response
            });
        });

    } catch (error) {

        res.status(500).json({
            msg: 'Erro ao atualizar marca!',
            data: error
        });
    }
});

router.delete('/excluir/:id', function (req, res) {

    try {

        conn.execute('DELETE FROM tbl_marcas WHERE id = ?;', [req.params.id], function (err, response, fields) {

            if (err) throw err;

            res.status(200).json({
                msg: 'Marca excluída com sucesso!',
                data: response
            });
        });

    } catch (error) {

        res.status(500).json({
            msg: 'Erro ao excluir marca!',
            data: error
        });
    }
});

module.exports = router;
