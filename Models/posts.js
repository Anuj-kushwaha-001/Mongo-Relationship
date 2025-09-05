const mongoose = require("mongoose");
const{ Schema } = mongoose;

main()
.then(() => console.log("connection successful"))
.catch(err => console.log(err));


async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/relation');
}

const userSchema = new Schema({ 
  usename: String,
  email: String,
});

const postSchema = new Schema({
    content : String,
    likes : Number,
    user : { type: Schema.Types.ObjectId, ref: 'User' }
});

const User = mongoose.model('User', userSchema);
const Post = mongoose.model('Post', postSchema);    

const addData = async () => {
    const user1 = await User.findOne({ usename: "john" });
    
    
    let Post2 = new Post({
        content: "bye bye",
        likes: 10,
    });

    Post2.user = user1;
    await Post2.save();     
};

addData();