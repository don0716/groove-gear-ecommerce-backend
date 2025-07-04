## Groove Gear - Backend

---
### API REFERENCE
### PRODUCTS
### **POST /products**<br>
Create a product<br>
Sample Response:<br>
```
{_id, name, type, category, rating, brand, price, available, imageUrl, description}
```
### **GET /products**<br>
Get all products<br>
Sample Response:<br>
```
{_id, name, type, category, rating, brand, price, available, imageUrl, description}
```
### **GET /products/:id**<br>
Get a product.<br>
Sample Response:<br>
```
{_id, name, type, category, rating, brand, price, available, imageUrl, description}
```
### CATEGORIES
### **GET /categories**<br>
Get all categories.<br>
Sample Response:<br>
```
{_id, name}
```
### **GET /categories/:id**<br>
Get one category.<br>
Sample Response:<br>
```
{_id, name}
```
### USERS
### **GET /users**<br>
Get all users.<br>
Sample Response:<br>
```
{_id, name, email, password, wishList, cart, addresses, defaultAddressId}
```
### **POST /users/register**<br>
Get all users.<br>
Sample Response:<br>
```
{_id, name, email, password}
```
### **POST /users/:id/wishlist**<br>
Add product Id to wishlist.<br>
Sample Response:<br>
```
{wishList}
```
### **GET /users/:id/wishlist**<br>
Get all products from wishlist of selected user.<br>
Sample Response:<br>
```
{message, wishList}
```
### **DELETE /users/:id/wishlist/:product-id**<br>
Delete product from wishlist.<br>
Sample Response:<br>
```
{message, wishList}
```
### **GET /users/:id/cart**<br>
Get all products from cart of selected user.<br>
Sample Response:<br>
```
{message, cart}
```
### **POST /users/:id/cart**<br>
Add product id to cart of selected user.<br>
Sample Response:<br>
```
{product, quantity}
```


