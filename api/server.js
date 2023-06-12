const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const cors = require("cors")
const app = express();
const port = 9000;
const { uuid } = require("uuidv4");

// setup middleware
app.use(bodyParser.json());
app.use(cors());

//
var _dishes = [{
    "_id": "1",
    "name": "Veggie Delight Salad",
    "shortDescription": "A refreshing mix of fresh vegetables and greens",
    "price": 9.99,
    "category": "Starter",
    "type": "lunch",
    "available": true,
    "bestSeller":true,
    "waitTime": 10
  },
  {
    "_id": "2",
    "name": "Spicy Tofu Stir Fry",
    "shortDescription": "Tofu and mixed vegetables in a flavorful sauce",
    "price": 12.99,
    "category": "Main course",
    "type": "dinner",
    "available": true,
    "bestSeller":true,
    "waitTime": 20
  },
  {
    "_id": "3",
    "name": "Mushroom Risotto",
    "shortDescription": "Creamy risotto with fresh mushrooms",
    "price": 11.99,
    "category": "Main course",
    "type": "Weekends",
    "available": true,
    "bestSeller":true,
    "waitTime": 25
  },
  {
    "_id": "4",
    "name": "Chocolate Mousse",
    "shortDescription": "Rich and creamy chocolate dessert",
    "price": 6.99,
    "category": "Dessert",
    "type": "Weekdays",
    "available": true,
    "bestSeller":true,
    "waitTime": 15
  },
  {
    "_id": "5",
    "name": "Fresh Fruit Smoothie",
    "shortDescription": "A refreshing blend of assorted fresh fruits",
    "price": 5.99,
    "category": "Beverage",
    "type": "breakfast",
    "available": false,
    "bestSeller":false,
    "waitTime": 5
  },
  {
    "_id": "6",
    "name": "Stuffed Bell Peppers",
    "shortDescription": "Bell peppers stuffed with rice and vegetables",
    "price": 8.99,
    "category": "Starter",
    "type": "lunch",
    "available": true,
    "bestSeller":true,
    "waitTime": 12
  },
  {
    "_id": "7",
    "name": "Paneer Tikka Masala",
    "shortDescription": "Cubes of paneer cooked in a rich tomato-based sauce",
    "price": 13.99,
    "category": "Main course",
    "type": "dinner",
    "available": true,
    "bestSeller": true,
    "waitTime": 18
  },
  {
    "_id": "8",
    "name": "Vegetable Biryani",
    "shortDescription": "Fragrant basmati rice cooked with mixed vegetables and spices",
    "price": 10.99,
    "category": "Main course",
    "type": "Weekends",
    "available": true,
    "bestSeller":true,
    "waitTime": 22
  },
  {
    "_id": "9",
    "name": "Mango Sorbet",
    "shortDescription": "Refreshing mango-flavored frozen dessert",
    "price": 7.99,
    "category": "Dessert",
    "type": "Weekdays",
    "available": true,
    "bestSeller":true,
    "waitTime": 10
  },
  {
    "_id": "10",
    "name": "Mint Lemonade",
    "shortDescription": "Cool and refreshing lemonade with a hint of mint",
    "price": 3.99,
    "category": "Beverage",
    "type": "Weekdays",
    "available": true,
    "bestSeller":true,
    "waitTime": 10
  }
];

// get dishes
router.get('/dishes', (req, res) => {
    res.json({
        status: "OK",
        data: _dishes
    });
});

// clear dishes
router.get('/dishes/clear', (req, res) => {
    _dishes = [];
    
    res.json({
        status: "OK"
    });
});

// get dish by id
router.get('/dishes/:_id', (req, res) => {
    const dish = _dishes.find(x => x._id === req.params._id);

    res.json({
        status: "OK",
        data: dish ? dish : null
    });
});

// insert/update dish
router.put('/dishes', (req, res) => {
    if (req.body == null) {
        res.json({
            status: "Failed",
            message: "No content provided"
        });
    }
    else {
        let dish = req.body,
            status = "OK";
        
        if (!dish._id) {
            //
            dish._id = uuid();
            dish._Created = new Date();
            dish._Changed = null;

            //
            _dishes.push(dish);
        }
        else {
            //
            const dishIndex = _dishes.findIndex(x => x._id === dish._id);

            //
            if (dishIndex >= 0) {
                //
                dish._Changed = new Date();

                //
                _dishes[dishIndex] = dish;
            }
            else {
                //
                status = `dish not found for _id ${dish._id}`;
            }
        }

        res.json({
            status: status,
            data: dish
        });
    }
});

// delete dish
router.delete('/dishes/:_id', (req, res) => {
    let dishIndex = _dishes.findIndex(x => x._id === req.params._id);

    if (dishIndex !== -1) {
        _dishes.splice(dishIndex, 1);
    }

    res.json({
        status: "OK",
        message: dishIndex !== -1 ? "Dish deleted" : "Dish not found"
    });
});


//
app.use(router);

//
app.listen(port, () => {
    console.log(`api is ready on http://localhost:${port}`)
});