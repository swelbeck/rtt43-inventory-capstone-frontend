# Home Inventory Management (Front-End)

## Description

This is the front-end portion of the **Inventory Management Application**, built using **React**. The application allows users to manage their inventory, add products to a shopping list, and track purchased items.

The front-end interacts with the back-end via RESTful API calls to perform CRUD operations on inventory items and categories.

## Features

- **Search Inventory**: Users can search for items in their inventory.
- **Add Items**: Add new items to the inventory.
- **Add to Shopping List**: Users can add items from the inventory to a shopping list.
- **Move Between Shopping and Bought**: Items can be moved between the "Shopping" and "Bought" sections.
- **Delete Items**: Items can be deleted from the inventory or shopping list.

## Technologies

- **React**: JavaScript library for building user interfaces.
- **React Router**: For navigation between pages.
- **Axios**: For making HTTP requests to the back-end API.
- **CSS**: For styling the application.

## Routes
| **Route**                         | **Component**        | **Description**                                                                                             |
|-----------------------------------|----------------------|-------------------------------------------------------------------------------------------------------------|
| `/`                               | `Dashboard`          | Displays key inventory metrics (e.g., total items, shopping list, bought items).                            |
| `/inventory`                      | `Inventory`          | Displays the list of inventory items with search and filter options.                                         |
| `/add-items`                      | `AddItemsForm`       | A form to add new items to the inventory.                                                                    |
| `/edit-item/:id`                  | `EditItemsForm`      | A form to edit an existing item in the inventory.                                                             |
| `/item-details/:id`               | `ItemDetails`        | Displays detailed information about a specific inventory item.                                               |
| `/categories`                     | `CategoryManagement` | Allows managing (adding, editing, deleting) inventory categories.                                            |
| `/shopping-list`                  | `ShoppingList`       | Displays the shopping list with the ability to move items between "shopping" and "bought".                   |
| `*`                               | `NotFound`           | A 404 page displayed when no matching route is found.                                                         |



### Front-End Setup

1. Clone the repository:
2. Navigate to the project directory
3. Install dependencies
4. Run the development server
5. Visit the localhost site in your browser to view the application

## Back-End Integration

The front-end is connected to a back-end server for inventory and category management. For details on the back-end server and how to set it up, refer to the back-end repository: [Home Inventory Backend](https://github.com/swelbeck/rtt43-inventory-capstone-backend)
