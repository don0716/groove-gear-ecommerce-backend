## Groove Gear - Backend

---

### API REFERENCE

---

### PRODUCTS

### **POST /api/products**  
Create a product.  
Sample Response:  
```
{_id, name, type, category, brand, price, rating, available, imageUrl, description}
```

### **GET /api/products**  
Get all products.  
Sample Response:  
```
[{_id, name, type, category, brand, price, rating, available, imageUrl, description}]
```

### **GET /api/products/:productId**  
Get a product by ID.  
Sample Response:  
```
{_id, name, type, category, brand, price, rating, available, imageUrl, description}
```

---

### CATEGORIES

### **GET /api/categories**  
Get all categories.  
Sample Response:  
```
[{_id, name}]
```

### **GET /api/categories/:categoryId**  
Get one category by ID.  
Sample Response:  
```
{_id, name}
```

---

### USERS

### **GET /api/users**  
Get all users.  
Sample Response:  
```
[{_id, name, email, password, wishList, cart, addresses, defaultAddressId}]
```

### **POST /api/users/register**  
Register a new user.  
Sample Response:  
```
{_id, name, email, password}
```

---

### WISHLIST

### **POST /api/users/:userId/wishlist**  
Add product ID to wishlist.  
Sample Response:  
```
{wishList}
```

### **GET /api/users/:userId/wishList**  
Get all products from wishlist of selected user.  
Sample Response:  
```
{message, wishList}
```

### **DELETE /api/users/:userId/wishlist/:productId**  
Delete product from wishlist.  
Sample Response:  
```
{message, wishList}
```

---

### CART

### **GET /api/users/:userId/cart**  
Get all products from cart of selected user.  
Sample Response:  
```
{message, cart}
```

### **POST /api/users/:userId/cart**  
Add product ID to cart of selected user.  
Sample Response:  
```
{cart: [{product, quantity}]}
```

### **PATCH /api/users/:userId/cart/increase/:productId**  
Increase quantity of product in cart.  
Sample Response:  
```
{message, cart}
```

### **PATCH /api/users/:userId/cart/decrease/:productId**  
Decrease quantity of product in cart.  
Sample Response:  
```
{message, cart}
```

### **DELETE /api/users/:userId/cart/:productId**  
Remove product from cart.  
Sample Response:  
```
{message, cart}
```

### **DELETE /api/users/:userId/cart**  
Clear all products from cart.  
Sample Response:  
```
{message}
```

---

### ADDRESSES

### **POST /api/users/:userId/address**  
Add new address for user.  
Sample Response:  
```
{message, addresses}
```

### **GET /api/users/:userId/address**  
Get all addresses of user.  
Sample Response:  
```
{message, addresses}
```

### **PATCH /api/users/:userId/default-address**  
Set default address.  
Sample Response:  
```
{message, defaultAddress, user}
```

### **DELETE /api/users/:userId/address/:addressId**  
Delete specific address.  
Sample Response:  
```
{message, addresses}
```

##  Groove Gear - PRD Checklist

###  Product Models
#### Category
- `name` (String, required, unique)

#### Instrument (Product)
- `name` (String, required)
- `type` (String, required)
- `category` (ObjectId reference to Category, required)
- `brand` (String)
- `price` (Number)
- `rating` (Number, 0–5)
- `available` (Boolean, default: true)
- `imageUrl` (String)
- `description` (String)

#### User
- `name` (String, required)
- `email` (String, required, unique)
- `password` (String, required, unique)
- `wishList` (Array of Instrument ObjectIds)
- `cart` (Array of cart items)
  - `product` (ObjectId reference to Instrument, required)
  - `quantity` (Number, min: 1, max: 10)
- `addresses` (Array of addresses)
  - `name`, `street`, `city`, `state`, `pincode`, `phone`
- `defaultAddressId` (ObjectId of selected address)

---

###  Backend Features

#### Products
- **POST `/api/products`** — Create a product
- **GET `/api/products`** — Get all products
- **GET `/api/products/:productId`** — Get product by ID

#### Categories
- **GET `/api/categories`** — Get all categories
- **GET `/api/categories/:categoryId`** — Get category by ID

#### Users
- **POST `/api/users/register`** — Register a user
- **GET `/api/users`** — Get all users

####  Wishlist
- **GET `/api/users/:userId/wishList`** — Get user’s wishlist
- **POST `/api/users/:userId/wishlist`** — Add to wishlist
- **DELETE `/api/users/:userId/wishlist/:productId`** — Remove from wishlist

#### Cart
- **GET `/api/users/:userId/cart`** — Get cart items
- **POST `/api/users/:userId/cart`** — Add to cart
- **PATCH `/api/users/:userId/cart/increase/:productId`** — Increase quantity
- **PATCH `/api/users/:userId/cart/decrease/:productId`** — Decrease quantity
- **DELETE `/api/users/:userId/cart/:productId`** — Remove item from cart
- **DELETE `/api/users/:userId/cart`** — Clear cart

#### Addresses
- **POST `/api/users/:userId/address`** — Add address
- **GET `/api/users/:userId/address`** — Get all addresses
- **PATCH `/api/users/:userId/default-address`** — Set default address
- **DELETE `/api/users/:userId/address/:addressId`** — Remove address



