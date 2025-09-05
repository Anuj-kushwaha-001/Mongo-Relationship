const mongoose = require("mongoose");
const{ Schema } = mongoose;

main()
.then(() => console.log("connection successful"))
.catch(err => console.log(err));


async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/relation');
}

const orderSchema = new Schema({ 
  item: String,
  price: Number,
});

const customerSchema = new Schema({
  name: String,
  orders: [{ type: Schema.Types.ObjectId, ref: "Order" }]
});

// customerSchema.pre("findOneAndDelete", async () => {
//   console.log("PRE MIDDLEWARE TRIGGERED");
// });

customerSchema.post("findOneAndDelete", async (customer) => {
  if (customer.orders.length) {
  let res = await Order.deleteMany({ _id: { $in: customer.orders } });
  console.log(res);
  }
});

const Order = mongoose.model("Order", orderSchema);
const Customer = mongoose.model("Customer", customerSchema);

// const addCustomers = async () => {
//   let customer1 = new Customer({
//     name: "John Doe",
//   });
//   let order1 = await Order.findOne({ item: "Book" });
//   let order2 = await Order.findOne({ item: "Pen" });
//   customer1.orders.push(order1);
//   customer1.orders.push(order2);
//   let result = await customer1.save();
//   console.log(result);
// };

// addCustomers();





// const addOrders

// const addOrders = async () => {
//   let res = await Order.insertMany([
//     {item: "Book", price: 20},
//     {item: "Pen", price: 5},
//     {item: "Notebook", price: 15}
//   ]);
//   console.log(res);
// };
// addOrders();

// Functions
const findCustomers = async () => {
  let result = await Customer.find({}).populate("orders");
  console.log(result[0]);
};

const addCust = async () => {
  let newCust = new Customer({
    name: "Karan Arjun"
  });

  let newOrder = new Order({
    item: "Pizza",
    price: 799
  });

  newCust.orders.push(newOrder);
  await newOrder.save();
  await newCust.save();
  console.log("adeed new customer");
};

const delCust = async () => {
 let data = await Customer.findByIdAndDelete('68b53f9325559d1783942bb5');
console.log(data);
}
// addCust();
delCust();
