import { User } from './users.model.js';

export class UserService {
    async createUser(name, email, password, role) {
        try {
            const newUser = await User.create({ name, email, password, role });
            return newUser;
        } catch (error) {
            throw error;
        }
    }

    async findUserByEmail(email) {
        try {
            const user = await User.findOne({ where: { email } });
            return user;
        } catch (error) {
            throw error;
        }
    }

    async updateUser(userId, name, email, password) {
        try {
            const user = await User.findByPk(userId);
            if (!user) {
                throw new Error('Usuario no encontrado');
            }
            user.name = name || user.name;
            user.email = email || user.email;
            if (password) {
                user.password = password;
            }
            await user.save();
            return user;
        } catch (error) {
            throw error;
        }
    }


    async getUserById(id) {
        try {
            const user = await User.findByPk(id);
            if (!user) {
                throw new Error('Usuario no encontrado');
            }
            return user;
        } catch (error) {
            throw error;
        }
    }

    async deleteUser(id) {
        try {
            const user = await User.findByPk(id);
            if (!user) {
                throw new Error('Usuario no encontrado');
            }
            await user.destroy();
        } catch (error) {
            throw error;
        }
    }
}
