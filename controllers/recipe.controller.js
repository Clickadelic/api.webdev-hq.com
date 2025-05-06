const Recipe = require("../database/models/recipe.model")

const recipeController = {
	getRecipes: async (req, res) => {
		try {
			const recipes = await Recipe.findAll()
			if (recipes === null || recipes === undefined || recipes <= 1) {
				res.status(200).json({ message: "There are currently no recipes in the database." })
			}
			res.status(200).json(recipes)
		} catch (error) {
			res.status(400).json({ error: error })
		}
	},
	addRecipe: async (req, res) => {
		try {
			const { title, subtitle, imageurl, teasertext, bodytext, numberOfPersons, category, preparationTime, cookingTime, rating } = req.body
			const newRecipe = await Recipe.build({
				title: title,
				subtitle: subtitle,
				imageurl: imageurl,
				teasertext: teasertext,
				bodytext: bodytext,
				numberOfPersons: numberOfPersons,
				category: category,
				preparationTime: preparationTime,
				cookingTime: cookingTime,
				rating: rating
			})
			newRecipe.save()
			res.status(201).json({ message: "recipe_created" })
		} catch (error) {
			res.status(400).json({ message: error })
		}
	},
	getRecipe: async (req, res) => {
		try {
			const recipe = await Recipe.findOne({
				where: {
					id: req.params.id
				}
			})
			res.status(200).json(recipe)
		} catch (error) {
			res.status(400).json({ message: error })
		}
	},
	patchRecipe: async (req, res) => {
		try {
			const recipe = await Recipe.findOne({
				where: {
					id: req.params.id
				}
			})
			const { bodytext } = req.body
			recipe.set({
				bodytext: bodytext
			})
			await recipe.save()
			res.status(200).json(recipe)
		} catch (error) {
			res.status(400).json({ message: error })
		}
	},
	putRecipe: async (req, res) => {
		const recipe = await Recipe.findOne({
			where: {
				id: req.params.id
			}
		})
		const { title, subtitle, imageurl, teasertext, bodytext, numberOfPersons, category, preparationTime, cookingTime, rating } = req.body
		recipe.set({
			title: title,
			subtitle: subtitle,
			imageurl: imageurl,
			teasertext: teasertext,
			bodytext: bodytext,
			numberOfPersons: numberOfPersons,
			category: category,
			preparationTime: preparationTime,
			rating: rating
		})
		await recipe.save()
		res.status(200).json(recipe)
	},
	deleteRecipe: async (req, res) => {
		const recipe = await Recipe.findOne({
			where: {
				id: req.params.id
			}
		})
		await recipe.destroy()
		res.status(200).json({ message: "recipe_deleted" })
	}
}

module.exports = recipeController
