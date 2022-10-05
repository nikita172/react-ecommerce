const Merchant = require("../models/Merchant");
const Product = require("../models/Product");
const Orders = require("../models/Orders");
const User = require("../models/User");
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");
const UserAddress = require("../models/UserAddress");

module.exports.adminLogIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email) throw new Error("Email cannot be empty");
        if (!password) throw new Error("Password cannot be empty");
        const user = await Merchant.findOne({ email: email }).lean();
        if (!user) throw new Error("Incorrect email");
        const passwordMatches = await bcrypt.compare(password, user.password);
        if (!passwordMatches) throw new Error("Incorrect Password");
        const token = jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET, {
            expiresIn: 365 * 60 * 24 * 1000,
        });
        const response = {
            status: 1,
            message: "Login Successful",
            user,
            token: token,
        };
        res.json(response);
    } catch (err) {
        res.send({
            status: 0,
            message: err.message,
        });
    }
};

module.exports.adminSignUp = async (req, res) => {
    try {
        const { userName, email, password, brandName } = req.body;
        if (!userName) throw new Error("User Name cannot be empty");
        if (!email) throw new Error("Email cannot be empty");
        if (!password) throw new Error("Password cannot be empty");
        const check = await Merchant.findOne({ email: email });
        if (check) throw new Error("Email Already exists");
        const hash = await bcrypt.hash(password, 10);
        const user = new Merchant({
            userName: userName,
            email: email,
            password: hash,
            brandName: brandName
        });
        const userObj = await user.save();
        const token = jwt.sign(
            {
                userId: userObj._id,
                email: email,
            },
            process.env.TOKEN_SECRET,
            { expiresIn: 365 * 60 * 24 * 1000 }
        );
        const response = {
            status: 1,
            message: "Registration Successful",
            user: userObj,
            token: token,
        };
        res.json(response);
    } catch (err) {
        res.send({
            status: 0,
            message: err.message,
        });
    }
};

module.exports.addProduct = (async (req, res) => {
    const { email, sizesQuan, ...other } = req.body;
    try {
        const user = await Merchant.findOne({ email: email })
        const userId = user._id;
        const newProduct = new Product({
            merchantId: userId,
            img: req.files.map((f) => f.filename),
            quantity: req.body.sizeQuan ?
                req.body.sizesQuan.reduce(function (passedIn, item) { return passedIn + parseInt(item) }, 0) :
                null
            ,
            sells: 0,
            remaining: req.body.sizeQuan ? req.body.sizesQuan.reduce(function (passedIn, item) { return passedIn + parseInt(item) }, 0) :
                null
            ,
            sizesQuan: req.body.sizeQuan ? req.body.sizesQuan.map((f) => f) :
                null
            ,
            ...other
        })
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    }
    catch (err) {
        res.status(500).json(err)
    }
})

module.exports.getMerchantAllProduct = (async (req, res) => {
    const { email } = req.params;
    try {
        const user = await Merchant.findOne({ email: email })
        const product = await Product.find({ merchantId: user._id })
        if (product.length === 0) {
            res.status(200).json("No Product yet !");
        }
        else {
            res.status(200).json(product)
        }
    }
    catch (err) {
        res.status(500).json(err)
    }
})

module.exports.deleteProduct = (async (req, res) => {
    const email = req.params.email
    const id = req.params.id
    try {
        const product = await Product.findOne({ _id: id })
        await product.deleteOne()
        res.status(200).json({ message: "Product has been deleted" })
    }
    catch (err) {
        res.status(500).json(err)
    }
})

module.exports.getProduct = ((req, res) => {
    const { id } = req.params;
    Product.findOne({ _id: id }).then((product) => {
        res.json(product)
    }).catch(err => {
        res.status(500).json(err)
    })
})

module.exports.menProduct = (async (req, res) => {
    try {
        const product = await Product.find({ productType: "Men" })
        res.status(200).json(product)
    }
    catch (err) {
        res.status(500).json(err)
    }
})

module.exports.womenProduct = (async (req, res) => {
    try {
        const product = await Product.find({ productType: "Women" })
        res.status(200).json(product)
    }
    catch (err) {
        res.status(500).json(err)
    }
})

module.exports.kidProduct = (async (req, res) => {
    try {
        const product = await Product.find({ productType: "Kid" })
        res.status(200).json(product)
    }
    catch (err) {
        res.status(500).json(err)
    }
})

module.exports.beautyProduct = (async (req, res) => {
    try {
        const product = await Product.find({ productType: "Beauty" })
        res.status(200).json(product)
    }
    catch (err) {
        res.status(500).json(err)
    }
})

module.exports.homelivingProduct = (async (req, res) => {
    try {
        const product = await Product.find({ productType: "HomeLiving" })
        res.status(200).json(product)
    }
    catch (err) {
        res.status(500).json(err)
    }
})


module.exports.userLogIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email) throw new Error("Email cannot be empty");
        if (!password) throw new Error("Password cannot be empty");
        const user = await User.findOne({ email: email }).lean();
        if (!user) throw new Error("Incorrect email");
        const passwordMatches = await bcrypt.compare(password, user.password);
        if (!passwordMatches) throw new Error("Incorrect Password");
        const token = jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET, {
            expiresIn: 365 * 60 * 24 * 1000,
        });
        const response = {
            status: 1,
            message: "Login Successful",
            user,
            token: token,
        };
        res.json(response);
    } catch (err) {
        res.send({
            status: 0,
            message: err.message,
        });
    }
};

module.exports.userSignUp = async (req, res) => {
    try {
        const { userName, email, password } = req.body;
        if (!userName) throw new Error("User Name cannot be empty");
        if (!email) throw new Error("Email cannot be empty");
        if (!password) throw new Error("Password cannot be empty");
        const check = await User.findOne({ email: email });
        if (check) throw new Error("Email Already exists");
        const hash = await bcrypt.hash(password, 10);
        const user = new User({
            userName: userName,
            email: email,
            password: hash,
        });
        const userObj = await user.save();
        const token = jwt.sign(
            {
                userId: userObj._id,
                email: email,
            },
            process.env.TOKEN_SECRET,
            { expiresIn: 365 * 60 * 24 * 1000 }
        );
        const response = {
            status: 1,
            message: "Registration Successful",
            user: userObj,
            token: token,
        };
        res.json(response);
    } catch (err) {
        res.send({
            status: 0,
            message: err.message,
        });
    }
};

module.exports.addToWishlist = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email });
        if (!user.wishlist.includes(req.body.productId)) {
            await user.updateOne({ $push: { wishlist: req.body.productId } });
            res.status(200).json({
                message: "Product is added to your wishlist",
                status: 0
            });
        } else {
            res.status(200).json({
                message: "This Product is already added in wishlist",
                status: 1
            });
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

module.exports.isAddToWishlist = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email });
        if (user.wishlist.includes(req.params.id)) {
            res.status(200).json({ status: 1 })
        }
        else {
            res.status(200).json({ status: 0 })
        }
    } catch (err) {
        res.status(500).json(err)
    }
}

module.exports.wishlistItem = async (req, res) => {
    try {
        const user = await User.find({ email: req.params.email });
        const items = await Promise.all(
            user[0].wishlist.map((productId) => {
                return Product.findById(productId);
            })
        );
        res.status(200).json(items)
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports.deleteWishlistItem = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email });
        if (user.wishlist.includes(req.body.productId)) {
            await user.updateOne({ $pull: { wishlist: req.body.productId } });
            res.status(200).json({
                message: "Product is deleted from  wishlist",
                status: 1
            });
        } else {
            res.status(200).json({
                message: "This Product is already deleted from wishlist",
                status: 0
            });
        }
    } catch (err) {
        res.status(500).json(err);
    }
}


module.exports.addToCart = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email });
        if (!user.bag.includes(req.body.productId)) {
            await user.updateOne({ $push: { bag: req.body.productId } });
            res.status(200).json({
                message: "Product is added to your Cart",
                status: 0
            });
        } else {
            res.status(200).json({
                message: "This Product is already added in Cart",
                status: 1
            });
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

module.exports.isAddToCart = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email });
        if (user.bag.includes(req.params.id)) {
            res.status(200).json({ status: 1 })
        }
        else {
            res.status(200).json({ status: 0 })
        }
    } catch (err) {
        res.status(500).json(err)
    }
}

module.exports.moveToCart = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email });
        if (!user.bag.includes(req.body.productId)) {
            await user.updateOne({ $push: { bag: req.body.productId } });
            await user.updateOne({ $pull: { wishlist: req.body.productId } });
            res.status(200).json("The product has been moved into Bag");
        }
        else {
            res.status(200).json("Already added in bag")
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

module.exports.bagItem = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email });
        const items = await Promise.all(
            user.bag.map((productId) => {
                return Product.findById(productId);
            })
        );
        res.status(200).json(items)
    } catch (err) {
        res.status(500).json(err);
    }
}
module.exports.deleteBagItem = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email });
        if (user.bag.includes(req.body.productId)) {
            await user.updateOne({ $pull: { bag: req.body.productId } });
            res.status(200).json({
                message: "Product is removed from  bag",
                status: 1
            });
        } else {
            res.status(200).json({
                message: "This Product is already removed from bag",
                status: 0
            });
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

module.exports.addNewAddress = (async (req, res) => {
    const add = new UserAddress(req.body)
    try {
        const saveAdd = await add.save();
        res.status(200).json(
            {
                message: "address has been added !"
            }
        );
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports.getAddress = async (req, res) => {
    try {
        const userAdd = await UserAddress.find({ email: req.params.email });
        res.status(200).json(userAdd)
    } catch (err) {
        res.status(500).json(err);
    }
}

module.exports.deleteAddress = (async (req, res) => {
    const { id } = req.params
    try {
        const user = await UserAddress.findOne({ _id: id });
        await user.deleteOne()
        res.status(200).json({ message: "address has been deleted" })
    }
    catch (err) {
        res.status(500).json(err)
    }
})

module.exports.getName = async (req, res) => {
    const { email } = req.params
    try {
        const user = await User.findOne({ email: email });
        res.status(200).json(user)
    } catch (err) {
        res.status(500).json(err);
    }
}

module.exports.searchText = async (req, res) => {
    const { text } = req.params
    const { type } = req.params
    try {
        const products = await Product.find({ productType: type });
        const prod = products.filter((val) => {
            if (val.brandName.toLowerCase().includes(text.toLowerCase())
                || val.aboutProductLong.toLowerCase().includes(text.toLowerCase())
                || val.productType.toLowerCase().includes(text.toLowerCase())) {
                return val;
            }
        })
        res.status(200).json(prod)
    } catch (err) {
        res.status(500).json(err);
    }
}

module.exports.filterProducts = async (req, res) => {
    const brand = req.query.brand.split(",");
    const color = req.query.color.split(",");
    const type = req.query.type
    try {
        if (req.query.brand !== "" && req.query.color !== "") {
            const data1 = await Product.find({ productType: type, }).where('brandName').in(brand);
            const data2 = await Product.find({ productType: type, }).where('color').in(color);
            const data = data1.concat(data2);
            const filter = [];
            const newArray = []
            data.map(element => {
                const objId = element._id.toString()
                if (filter.includes(objId)) {
                } else {
                    filter.push(objId)
                    newArray.push(element)
                }
            })
            res.status(200).json(newArray)
        } else if (req.query.brand === "" && req.query.color === "") {
            const data = await Product.find({ productType: type })
            res.status(200).json(data)
        }
        else if (req.query.brand === "") {
            const data2 = await Product.find({ productType: type, }).where('color').in(color);
            res.status(200).json(data2)
        } else {
            const data = await Product.find({ productType: type, }).where('brandName').in(brand);
            res.status(200).json(data)
        }
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
}

module.exports.addOrders = (async (req, res) => {
    const { email, addressId, productIds } = req.body;
    try {
        const user = await User.findOne({ email: email })
        const address = await UserAddress.findOne({ _id: addressId })
        productIds.map(async (id) => {
            const add = new Orders({
                userId: user._id,
                productsId: id,
                address: address
            })
            const saveAdd = await add.save();
        })
        res.status(200).json(
            {
                message: "Order is Placed !",
                status: 1,
            }
        );
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports.deleteCart = (async (req, res) => {
    const { prodId, email } = req.params
    const Ids = prodId.split(",")
    try {
        const user = await User.findOne({ email: email })
        Ids.map(async (i) => {
            if (user.bag.includes(i)) {
                await user.updateOne({ $pull: { bag: i } });
            }
        })
        res.status(200).json({ message: "cart has been deleted" })
    }
    catch (err) {
        res.status(500).json(err)
    }
})

module.exports.getAllOrders = async (req, res) => {
    const { email } = req.params;
    try {
        const user = await User.findOne({ email: email })
        const orders = await Orders.find({ userId: user._id }).populate("productsId")
        res.status(200).json(orders)
    } catch (err) {
        res.status(500).json(err);
    }
}

module.exports.deleteOrder = async (req, res) => {
    const { id } = req.params;
    try {
        await Orders.deleteOne({ _id: id })
        res.status(200).json("Order deleted")
    } catch (err) {
        res.status(500).json(err);
    }
}