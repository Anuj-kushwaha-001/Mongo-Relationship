const mongoose = require("mongoose");
const{ Schema } = mongoose;

main()
.then(() => console.log("connection successful"))
.catch(err => console.log(err));


async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/relation');
}

const userSchema = new Schema({ 
    username: String,
    addresses: [
        {
            _id: false, // Disable automatic _id generation for subdocuments
            location: String,
            city: String,
        },
    ],
});

const User = mongoose.model('User', userSchema);

const addUsers = async () => {
    let user1 = new User({
        username: "sherlockholmes",
        addresses: [{
             location: '123 Main St', 
             city: 'New York'
       }] 
    });

    user1.addresses.push({location: '456 Elm St', city: 'Los Angeles'});
    let result = await user1.save();
    console.log(result);
};

addUsers();