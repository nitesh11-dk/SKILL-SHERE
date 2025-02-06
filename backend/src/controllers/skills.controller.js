import Skill from "../models/skills.model.js";
import User from "../models/user.model.js";

export async function addSkill(req, res) {
  try {
    const userId = req.user._id; // Get the authenticated user's ID
    const { title, category } = req.body;

    const newSkill = new Skill({
      title,
      category,
      user: userId,
    });

    const skill = await newSkill.save();

    // Add the skill ID to the user's skills array
    await User.findByIdAndUpdate(userId, { $push: { skills: skill._id } });

    res.status(201).json({
      success: true,
      message: "Skills added successfully",
      data: skill,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error adding skill",
      error: error.message,
    });
  }
}

export async function updateSkill(req, res) {
  try {
    const userId = req.user._id; // Get the authenticated user's ID
    const { title, category, experience } = req.body;

    const skill = await Skill.findOneAndUpdate(
      { user: userId, _id: req.params.id },
      { title, category, experience },
      { new: true, runValidators: true }
    );

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: "Skill not found for this user",
      });
    }

    res.status(200).json({
      success: true,
      message: "Skill updated successfully",
      data: skill,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error updating skill",
      error: error.message,
    });
  }
}

export async function deleteSkill(req, res) {
  try {
    const userId = req.user._id; // Get the authenticated user's ID
    const skill = await Skill.findOneAndDelete({ user: userId, _id: req.params.id });

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: "Skill not found to delete",
      });
    }

    // Remove the skill ID from the user's skills array
    await User.findByIdAndUpdate(userId, { $pull: { skills: skill._id } });

    res.status(201).json({
      success: true,
      message: "Skill deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting skill",
      error: error.message,
    });
  }
}

export async function getAllSkills(req, res) {
  try {
    const userId = req.user._id; // Get the authenticated user's ID
    const skills = await Skill.find({ user: userId }).populate("user", "name email");

    res.status(200).json({
      success: true,
      count: skills.length,
      data: skills,
      message: "Skills retrieved successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving skills",
      error: error.message,
    });
  }
}
