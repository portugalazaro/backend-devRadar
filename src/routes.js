const { Router } = require("express");

const devController = require("./controllers/DevController");
const searchController = require("./controllers/SearchController");
const router = Router();

router.get("/devs", devController.index)
router.post("/devs", devController.store);
router.get("/search", searchController.index);
router.put("/devs", devController.update);
// router.patch("/devs", devController.onlyPart)
router.delete("/devs/:github_username", devController.destroy);

router.get('/devs/:github_username',devController.dev);

// router.delete("/devs/")

module.exports = router