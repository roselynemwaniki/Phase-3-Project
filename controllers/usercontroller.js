const User = require("../models/user")

const registerUser = async (req, res) => {
    //Logic to register a new user
    res.status(201).json({success: true, message: "User registered successfully"});
    };

const loginUser = async (req, res) => {
    //Logic to login a user
    res.status(200).json({success: true, message: "User logged in successfully"});

};

// Get a single user by ID
const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id); // Fetch user by ID
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Error fetching user", error });
    }
};

// Update a user by ID
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        const user = await User.findByIdAndUpdate(id, updatedData, {
            new: true, // Return the updated user
            runValidators: true, // Ensure validation rules are applied
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User updated successfully", user });
    } catch (error) {
        res.status(500).json({ message: "Error updating user", error });
    }
};

// Delete a user by ID
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting user", error });
    }
};


module.exports = {registerUser, loginUser, getUser, updateUser, deleteUser};