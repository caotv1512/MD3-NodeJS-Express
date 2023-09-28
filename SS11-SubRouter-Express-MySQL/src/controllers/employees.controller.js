const connection = require("../configs/db.config");

const getAllEmployee = (req, res, next) => {
    connection.query("SELECT * FROM employees", function(err, data, fields) {
        if (err) return next(new AppError(err));
        return res.status(200).json({
            status: "success",
            length: data ? data.length : 0,
            data: data,
        });
    });
};
const deleteTodo = (req, res, next) => {
    const data = this.getData(getAllEmployee);
    console.log(data, 'data');
    if (!req.params.id) {
        return next(new AppError("No todo id found", 404));
    }
    connection.query(
        "DELETE FROM todolist WHERE id=?", [req.params.id],
        function(err, fields) {
            if (err) return next(new AppError(err, 500));
            res.status(201).json({
                status: "success",
                message: "todo deleted!",
            });
        }
    );
}

module.exports = {
    getAllEmployee,
    deleteTodo,
}