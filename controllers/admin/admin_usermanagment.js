import User from "../../model/User.js";





export const viewUser = async (req, res) => {
    const users = await User.find({})
    res.status(200).json({ message: "User list retrieved successfully", users })
};


export const userProfileedit = async (req, res) => {
    const { userId } = req.params
    const update = req.body

    const user = await User.findOneAndUpdate({_id:userId},update,{ new: true })
    if (!user) return res.status(404).json({ message: "User not found" })

    res.status(200).json({ message: "User updated successfully",User_details:user })
}


export const blockUser = async (req, res) => {
    const { userId } = req.params
    const user = await User.findByIdAndUpdate(userId)
    if (!user) return res.status(404).json({ message: "User not found" })

    user.isBlocked = !user.isBlocked
    await user.save()

    res.status(200).json({
        message: user.isBlocked ? "User blocked successfully" : "User unblocked successfully",
        user,
    })
}


export const deleteUser = async (req, res) => {
    const { userId } = req.params;
    const user = await User.findByIdAndUpdate(userId, { isDeleted: true });
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "User deleted successfully" });
};
