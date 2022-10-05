const router = require("express").Router();
const controller = require("../controller/merchant")
const multer = require("multer")

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images")
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + Math.random() + file.originalname)
    }
})

const upload = multer({ storage })
router.post("/admin/login", controller.adminLogIn);
router.post("/admin/signup", controller.adminSignUp);
router.post("/admin/product", upload.any(), controller.addProduct);
router.get("/admin/:email", controller.getMerchantAllProduct);
router.delete("/admin/delete/:id", controller.deleteProduct);
router.get("/admin/product/:id", controller.getProduct);
router.get("/admin/men/products", controller.menProduct)
router.get("/admin/women/products", controller.womenProduct)
router.get("/admin/kid/products", controller.kidProduct)
router.get("/admin/beauty/products", controller.beautyProduct)
router.get("/admin/homeliving/products", controller.homelivingProduct)
router.post("/user/login", controller.userLogIn);
router.post("/user/register", controller.userSignUp);
router.put("/user/addtowishlist/:email", controller.addToWishlist);
router.get("/user/isaddtowishlist/:email/:id", controller.isAddToWishlist);
router.get("/user/wishlistitem/:email", controller.wishlistItem);
router.put("/user/delete/wishlistitem/:email", controller.deleteWishlistItem);
router.put("/user/addtocart/:email", controller.addToCart);
router.get("/user/isaddtocart/:email/:id", controller.isAddToCart);
router.put("/user/movetobag/:email", controller.moveToCart)
router.get("/user/bagitem/:email", controller.bagItem);
router.put("/user/delete/bagitem/:email", controller.deleteBagItem);
router.post("/user/addnewaddress", controller.addNewAddress);
router.get("/user/getaddress/:email", controller.getAddress);
router.get("/user/username/:email", controller.getName);
router.get("/user/search/:type/:text", controller.searchText)
router.delete("/user/delete/address/:id", controller.deleteAddress);
router.get("/admin/men/products/filter", controller.filterProducts)
router.post("/user/addorders", controller.addOrders);
router.delete("/delete/cart/:prodId/:email", controller.deleteCart);
router.get("/user/fetch/orders/:email", controller.getAllOrders)
router.delete("/user/delete/order/:id", controller.deleteOrder)

module.exports = router