import app from './app.js';
import { authenticated, synchonize } from './config/database/database.js';
import { envs } from './config/enviroments/enviroments.js';

async function main() {
    try {
        await authenticated();
        await synchonize();
    } catch (error) {
        console.log(error);
    }
}

main();

app.listen(envs.PORT, () => {
    console.log(`Server running on port ${envs.PORT} 😄`);
});
