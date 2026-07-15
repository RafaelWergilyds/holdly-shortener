import app from "./app";
import 'dotenv/config';

const PORT = process.env.PORT || 3000;


app.listen({ 
    port: Number(PORT), 
    host: "0.0.0.0" 
}).then(() => {
    console.log(`Server is running on port ${PORT}`);
})