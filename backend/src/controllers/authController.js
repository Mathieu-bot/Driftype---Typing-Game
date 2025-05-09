import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import { OAuth2Client } from 'google-auth-library';
import User from '../models/user.js';

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const passwordRegex = /^.{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({ message: 'Password must be at least 8 characters' });
    }

    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const user = await User.create({ username, email, password });

    // Generate JWT token
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || '1h',
    });

    console.log(`User registered: ${email}`);

    // response
    res.status(201).json({
      message: 'Registration successful',
      token,
      user: { username: user.username, id: user.id, email: user.email },
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findByEmail(email);

    if (!user) {
      return res.status(401).json({ message: 'Email or password incorrect!' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Email or password incorrect!' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.json({
      message: 'Login successful',
      token,
      user: { id: user.id, email: user.email },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Find user
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 3600000); // 1 hour from now

    // Save token to database
    await User.createPasswordResetToken(user.id, resetToken, expiresAt);

    // Send reset email
    const resetUrl = `${process.env.FRONTEND_URL}/src/components/pages/reset-password.html?token=${resetToken}`;
    await transporter.sendMail({
      to: email,
      subject: '[Driftype] Password Reset Request',
      html: `
      <div style="color: #333; width: 100%;margin: 0 auto;text-align: center">
        <div><img src="http://127.0.0.1:5500/src/assets/noBg.png" alt="" /></div>
        <p style="margin: 10px 0;font-size: 16px;">You requested a password reset</p>
        <p>Click this <a href="${resetUrl}">link</a> to reset your password</p>
        <p>If you didn't request this, please ignore this email</p>
      </div>
      `,
    });

    res.json({ message: 'Password reset email sent' });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    // Verify token
    const resetToken = await User.verifyPasswordResetToken(token);
    if (!resetToken) {
      return res
        .status(400)
        .json({ message: 'Invalid or expired reset token' });
    }

    // Update password
    await User.updatePassword(resetToken.user_id, newPassword);

    // Mark token as used
    await User.markPasswordResetTokenAsUsed(token);

    res.json({ message: 'Password reset successful' });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const googleSignIn = async (req, res) => {
  try {
    const { credential } = req.body;

    // Verify Google token
    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, sub: googleId } = payload;

    // Check if user exists
    let user = await User.findByEmail(email);

    if (!user) {
      // Create new user if doesn't exist
      const randomPassword = crypto.randomBytes(32).toString('hex');
      user = await User.create({
        email,
        password: randomPassword,
        googleId,
      });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.json({
      message: 'Google sign-in successful',
      token,
      user: { id: user.id, email: user.email },
    });
  } catch (error) {
    console.error('Google sign-in error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getProfile = async (req, res) => {
  try {
    const user = await User.findByEmail(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ user: { id: user.id, email: user.email } });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
