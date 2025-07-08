const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
  const { email, password } = req.body;


  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "Cet email est déjà utilisé." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "Utilisateur créé avec succès." });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de l'inscription." });
  }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;


    try {
        const user = await User.findOne({ email });
        if(!user) {
            return res.status(400).json({ message: "Erreur de mail ou mdp"})
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({ message: "Email ou mot de passe incorrect"})
        }

        const token = jwt.sign({ userId: user._id}, process.env.JWT_SECRET, { expiresIn: "1h",});

        res.json({ message: "Connexion ok", token});
    } catch (err) {
        res.status(500).json({ message: "Erreur de connexion"});
    }
};