import app from "./app";
import 'dotenv/config';
import { syncClicks } from "./jobs/syncClicks";

const PORT = process.env.PORT || 3000;


app.listen({ 
    port: Number(PORT), 
    host: "0.0.0.0" 
}).then(() => {
    console.log(`Server is running on port ${PORT}`);
})

setInterval(() => {
    syncClicks().catch((err) => console.error('Error synchronizing clicks:', err));
}, 60_000);