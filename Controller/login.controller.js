const models = require("../models");
function userLogin(req, res) {
	// Website you wish to allow to connect
	models.user
		.findAll({
			include: [
				{
					model: models.role,
					include: [
						{
							model: models.permission,
							where: {
								is_deleted: 0,
							},
							required: false,
						},
					],
					required: false,
				},
			],
			where: {
				email: req.body.email,
				password: req.body.password,
				is_deleted: 0,
			},
		})
		.then((result) => {
			console.log(result[0].id);
			res.status(200).json(result[0]);
		})
		.catch((error) => {
			res.status(500).json({
				message: "Error: Incorrect Id or Password",
			});
		})
		.then((result) => {
			res.status(200).json(result);
		})
		.catch((error) => {
			res.status(500).json({
				message: "error occurred",
			});
		});
}

module.exports = {
	userLogin: userLogin,
};
