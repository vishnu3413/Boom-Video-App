import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from '../config/dotenv.js';

const { JWT_SECRET } = config;

const prisma = new PrismaClient();

// Register user
export const register = async (context) => {
    try {
        const {  email, password } = context.req.body;

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return context.res.status(400).json({ message: 'Email already registered' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword
            },
        });

        // Return token
        const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '30m' });

        return context.res.status(201).json({
            message: 'User registered successfully',
            user: { id: user.id, email: user.email },
            token,
        });
    } catch (error) {
        throw error;
    }
};

// Login user
export const login = async (context) => {
    try {
        const { email, password } = context.req.body;

        // Find user
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return context.res.status(404).json({ message: 'User not found' });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return context.res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate token
        const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '30m' });

        return context.res.status(200).json({
            message: 'Login successful',
            user: { id: user.id, email: user.email },
            token,
        });
    } catch (error) {
        throw error;
    }
};