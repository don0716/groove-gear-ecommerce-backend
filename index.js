const express = require("express");
const app = express();

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
};
app.use(express.json());
app.use(cors(corsOptions));

const { initializeDatabase } = require("./db/db.connect");

const Product = require("./models/product.model");
const Category = require("./models/category.model");
const User = require("./models/user.model");
initializeDatabase();

app.post("/api/products", async (req, res) => {
  try {
    const {
      name,
      type,
      category: categoryName,
      brand,
      price,
      rating,
      available,
      imageUrl,
      description,
    } = req.body;

    // Checks if the category Already Exists
    let category = await Category.findOne({ name: categoryName });

    // If It doesn't exist then, creates a new one.
    if (!category) {
      category = new Category({ name: categoryName });
      await category.save();
    }

    // create product with the category Id

    const newProduct = new Product({
      name,
      type,
      category: category._id,
      brand,
      price,
      rating,
      available,
      imageUrl,
      description,
    });

    const saveProduct = await newProduct.save();
    console.log(saveProduct);

    res
      .status(201)
      .json({ message: "Product Added Successfully.", product: saveProduct });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find().populate("category");
    if (products.length != 0) {
      res.json(products);
    } else {
      res.status(401).json({ error: "No Products Found." });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/products/:productId", async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    res.status(201).json({ message: "Product Found", prod: product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/categories", async (req, res) => {
  try {
    const categories = await Category.find();
    if (categories.length > 0) {
      res.json({ message: "Categories Found.", prod: categories });
    } else {
      res.status(404).json({ error: "No Categories Found." });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/categories/:categoryId", async (req, res) => {
  try {
    const categories = await Category.findById(req.params.categoryId);
    res.status(201).json({ message: "Category Found", prod: categories });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// User Model

app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    if (users.length > 0) {
      res.status(200).json({ message: "Found Users", data: users });
    } else {
      res.status(401).json({ error: "Users not found." });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/users/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check if user already Exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already Exists." });
    }

    // Create User
    const newUser = new User({ name, email, password });
    const savedUser = await newUser.save();

    res
      .status(201)
      .json({ message: "User Registered Successfully", user: savedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get products from wishList
app.get("/api/users/:userId/wishList", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate("wishList");

    res.status(200).json({
      message: "Wishlist fetched Successfully",
      wishList: user.wishList,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add Product to Wishlist.
app.post("/api/users/:userId/wishlist", async (req, res) => {
  try {
    const { productId } = req.body;
    const user = await User.findById(req.params.userId);

    if (!user.wishList.includes(productId)) {
      user.wishList.push(productId);
      await user.save();
    } else {
      res.status(404).json({
        error: "Product already added to wishlist",
        wishList: user.wishList,
      });
    }

    res
      .status(200)
      .json({ message: "Added to Wish List", wishList: user.wishList });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete Products from wishList
app.delete("/api/users/:userId/wishlist/:productId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    user.wishList = user.wishList.filter(
      (id) => id && id.toString() != req.params.productId
    );

    await user.save();

    res
      .status(200)
      .json({ message: "Removed from wishList", wishList: user.wishList });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// get cart items
app.get("/api/users/:userId/cart", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate(
      "cart.product"
    );

    res
      .status(200)
      .json({ message: "Cart items Found.", cartItems: user.cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add products to cart
app.post("/api/users/:userId/cart", async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    const user = await User.findById(req.params.userId);

    const existingProduct = user.cart.find(
      (item) => item.product.toString() === productId
    );

    if (existingProduct) {
      // existingProduct.quantity += quantity;
      res.status(400).json({ message: "Product Already Exists in Cart." });
    } else {
      user.cart.push({ product: productId, quantity });
    }
    await user.save();
    res.status(200).json({ message: "Cart Updated", cart: user.cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to update the quantity of a product in the cart
app.patch("/api/users/:userId/cart/increase/:productId", async (req, res) => {
  try {
    const { quantity } = req.body;
    const user = await User.findById(req.params.userId);
    const product = user.cart.find(
      (item) => item.product.toString() === req.params.productId
    );
    if (!product) {
      return res.status(404).json({ error: "Product not found in cart. " });
    } else {
      product.quantity += quantity;
      await user.save();
      const updatedUser = await User.findById(req.params.userId).populate(
        "cart.product"
      );
      res
        .status(200)
        .json({ message: "Product quantity updated", cart: updatedUser.cart });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Decrease product quantity by 1.
app.patch("/api/users/:userId/cart/decrease/:productId", async (req, res) => {
  try {
    const { quantity } = req.body;
    const user = await User.findById(req.params.userId);
    const product = user.cart.find(
      (item) => item.product.toString() === req.params.productId
    );
    if (!product) {
      return res.status(404).json({ error: "Product not found in cart. " });
    } else if (product.quantity > 1) {
      product.quantity -= quantity;
      await user.save();
      const updatedUser = await User.findById(req.params.userId).populate(
        "cart.product"
      );
      res
        .status(200)
        .json({ message: "Product quantity updated", cart: updatedUser.cart });
    } else {
      return res
        .status(404)
        .json({ error: "Product quantity can't be less than 1." });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete products from Cart.
app.delete("/api/users/:userId/cart/:productId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);

    user.cart = user.cart.filter(
      (item) => item.product.toString() !== req.params.productId
    );
    await user.save();
    res.status(200).json({ message: "Removed from Cart", cart: user.cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add New Address
app.post("/api/users/:userId/address", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);

    user.addresses.push(req.body);
    await user.save();
    res
      .status(200)
      .json({ message: "Address Added", addresses: user.addresses });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get All addresses
app.get("/api/users/:userId/address", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    res
      .status(200)
      .json({ message: "Addresses Found", addresses: user.addresses });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Set Default Address.
app.patch("/api/users/:userId/default-address", async (req, res) => {
  try {
    const { addressId } = req.body;
    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const addressExists = user.addresses.some(
      (add) => add._id.toString() === addressId
    );

    if (!addressExists) {
      return res.status(404).json({ error: "Address not found." });
    }

    user.defaultAddressId = addressId;
    await user.save();

    res.status(200).json({
      message: "Default Address Updated. ",
      defaultAddress: addressId,
      user,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete Addresses
app.delete("/api/users/:userId/address/:addressId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    user.addresses = user.addresses.filter(
      (add) => add._id.toString() !== req.params.addressId
    );
    await user.save();
    res
      .status(200)
      .json({ message: "Address Removed.", addresses: user.addresses });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = 3005;
app.listen(PORT, () => {
  console.log("Server is running on ", PORT);
});
