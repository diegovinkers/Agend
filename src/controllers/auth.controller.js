import Professional from '../models/professional.models.js';
import Patient from '../models/patient.models.js';
import User from "../models/user.models.js";
import bcrypt from 'bcryptjs';
import { createAccessToken } from "../libs/jwt.js";
import { TOKEN_SECRET } from '../config.js';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  try {
    const { email, password, username, role } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    let newUser;


    if (role === "professional") {
      newUser = new Professional({ username, email, password: passwordHash });
    } else if (role === "patient") {
      newUser = new Patient({ username, email, password: passwordHash });
    } else {
      return res.status(400).json({ message: "Invalid role" });
    }

    const userSaved = await newUser.save();

    const token = await createAccessToken({ id: userSaved._id, role });

    res.cookie("token", token);
    res.json({ user: userSaved, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await Professional.findOne({ email });
    let role = 'professional';

    if (!user) {
      user = await Patient.findOne({ email });
      role = 'patient';
    }

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }


    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }


    const token = await createAccessToken({ id: user._id, role });


    res.cookie("token", token);
    res.json({ user, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const logout = (req, res) => {
  res.clearCookie("token");
  res.sendStatus(200);
};


export const profile = async (req, res) => {
  try {
    const { id, role } = req.user;


    let user;
    if (role === 'professional') {
      user = await Professional.findById(id);
    } else if (role === 'patient') {
      user = await Patient.findById(id);
    } else {
      return res.status(400).json({ message: "Invalid role" });
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }


    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const verifyToken = async (req, res) => {
  const { token }  = req.cookies

  if (!token) {
    return res.status(401).json({ message: "Unauthorized - No token provided" });
    console.log(token)

  }

  jwt.verify(token, TOKEN_SECRET, async (err, user) => {
    if (err) return res.status(402).json({ message: "Unauthorized" });

    const userFound = await User.findById(user.id);
    if (!userFound) return res.status(403).json({ message: "Unauthorized" });

    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      role: userFound.role
    });
  });
};
