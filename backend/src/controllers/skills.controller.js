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

export async function updateUserSkills(req, res) {
  try {
    const userId = req.user._id;
    const newSkills = req.body.skills; // Array of {title, category} objects

    if (!Array.isArray(newSkills)) {
      return res.status(400).json({
        success: false,
        message: "Skills must be provided as an array"
      });
    }

    // Get current user with their skills
    const user = await User.findById(userId).populate('skills');
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    const currentSkillIds = user.skills.map(skill => skill._id.toString());
    const updatedSkills = [];
    const skillsToAdd = [];

    // Process each skill in the new skills array
    for (const skillData of newSkills) {
      const { title, category } = skillData;

      // Check if skill already exists in database (case insensitive)
      let skill = await Skill.findOne({
        title: { $regex: new RegExp(`^${title}$`, 'i') },
        category: { $regex: new RegExp(`^${category}$`, 'i') }
      });

      // If skill doesn't exist in database, create it
      if (!skill) {
        skill = await new Skill({ title, category }).save();
      }

      skillsToAdd.push(skill._id);
      updatedSkills.push(skill);
    }

    // Update user's skills array
    // This will add new skills and remove skills that are not in the new array
    await User.findByIdAndUpdate(userId, {
      $set: { skills: skillsToAdd }
    });

    res.status(200).json({
      success: true,
      message: "User skills updated successfully",
      data: {
        added: updatedSkills.filter(skill => !currentSkillIds.includes(skill._id.toString())),
        removed: user.skills.filter(skill => !skillsToAdd.includes(skill._id.toString())),
        current: updatedSkills
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating user skills",
      error: error.message
    });
  }
}
