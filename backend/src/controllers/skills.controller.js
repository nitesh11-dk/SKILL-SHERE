import Skill from "../models/skills.model.js";
import User from "../models/user.model.js";

export async function addSkill(req, res) {
  try {
    const userId = req.user._id;
    const skills = req.body.skills; // Array of {title, category} objects

    if (!Array.isArray(skills)) {
      return res.status(400).json({
        success: false,
        message: "Skills must be provided as an array"
      });
    }

    const addedSkills = [];

    for (const skillData of skills) {
      const { title, category } = skillData;

      // Check if skill already exists (case insensitive)
      const existingSkill = await Skill.findOne({
        title: { $regex: new RegExp(`^${title}$`, 'i') },
        category: { $regex: new RegExp(`^${category}$`, 'i') }
      });

      let skill;
      if (existingSkill) {
        skill = existingSkill;
      } else {
        // Create new skill if it doesn't exist
        const newSkill = new Skill({
          title,
          category
        });
        skill = await newSkill.save();
      }

      // Check if user already has this skill
      const userHasSkill = await User.findOne({
        _id: userId,
        skills: skill._id
      });

      if (!userHasSkill) {
        // Add the skill ID to the user's skills array only if not already present
        await User.findByIdAndUpdate(userId, { $push: { skills: skill._id } });
      }

      addedSkills.push(skill);
    }

    res.status(201).json({
      success: true,
      message: "Skills added successfully",
      data: addedSkills,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error adding skills",
      error: error.message,
    });
  }
}


export async function removeSkill(req, res) {
  try {
    const userId = req.user._id;
    const skillsToRemove = req.body.skills; // Array of skill IDs to remove

    if (!Array.isArray(skillsToRemove)) {
      return res.status(400).json({
        success: false,
        message: "Skills must be provided as an array"
      });
    }

    // Get user with their skills array
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Filter out all skills that need to be removed
    const updatedSkills = user.skills.filter(
      (skillId) => !skillsToRemove.includes(skillId.toString())
    );

    // Update user with new skills array
    user.skills = updatedSkills;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Skills removed from user successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error removing skills from user",
      error: error.message,
    });
  }
}
