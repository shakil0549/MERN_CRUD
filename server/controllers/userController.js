const User = require('../models/User.js');

// @desc    Get all users
// @route   GET /api/users
// @access  Public
const getUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password'); // Exclude passwords
        res.json({
            success: true,
            count: users.length,
            data: users
        });
    } catch (error) {
        console.error('Get Users Error:', error);
        res.status(500).json({ 
            success: false,
            message: 'Server Error' 
        });
    }
}

// Export using CommonJS
module.exports = {
    getUsers
};
 