const bcrypt = require("bcrypt");
const prisma = require("../lib/prisma");
const { generateToken } = require("../utils/jwt");

/**
 * Register a new user with standard credentials.
 */
async function register(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password.",
      });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "A user with this email address already exists.",
      });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user in the database
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    // Generate JWT token
    const token = generateToken({ id: newUser.id, email: newUser.email });

    res.status(201).json({
      success: true,
      message: "Registration successful.",
      token,
      user: {
        id: newUser.id,
        email: newUser.email,
      },
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Login a user with standard credentials.
 */
async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password.",
      });
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !user.password) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    // Generate JWT token
    const token = generateToken({ id: user.id, email: user.email });

    res.status(200).json({
      success: true,
      message: "Login successful.",
      token,
      user: {
        id: user.id,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Handle Google OAuth login and registration.
 * Receives credential (ID Token) from frontend.
 */
async function googleLogin(req, res, next) {
  try {
    const { credential } = req.body;

    if (!credential) {
      return res.status(400).json({
        success: false,
        message: "No Google credential token provided.",
      });
    }

    let email;
    let name;

    // Handle Mock Token for local/e2e testing purposes
    if (credential.startsWith("mock-google-token-")) {
      email = credential.replace("mock-google-token-", "") + "@example.com";
      name = "Mock Google User";
      console.log(`[Google OAuth Mock] Simulating login for email: ${email}`);
    } else {
      // Verify Google ID Token via Google's tokeninfo API
      try {
        const verifyUrl = `https://oauth2.googleapis.com/tokeninfo?id_token=${credential}`;
        const response = await fetch(verifyUrl);
        const data = await response.json();

        if (data.error_description || !data.email) {
          return res.status(400).json({
            success: false,
            message: "Google token verification failed.",
            error: data.error_description,
          });
        }

        email = data.email;
        name = data.name || "Google User";
      } catch (err) {
        console.error("Google token verification network error:", err);
        return res.status(500).json({
          success: false,
          message: "Failed to verify Google token due to a network error.",
        });
      }
    }

    // Check if user exists
    let user = await prisma.user.findUnique({
      where: { email },
    });

    // If user does not exist, create a new one (password is nullable/null for OAuth users)
    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          password: null,
        },
      });
    }

    // Generate internal JWT token
    const token = generateToken({ id: user.id, email: user.email });

    res.status(200).json({
      success: true,
      message: "Google login successful.",
      token,
      user: {
        id: user.id,
        email: user.email,
        name,
      },
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  register,
  login,
  googleLogin,
};
