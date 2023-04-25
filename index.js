import express from "express";
import morgan from "morgan";
import cors from "cors";
import tasksRoutes from "./routes/tasksRoutes.js";

const app = express();

app.use(morgan('dev'));
app.use(express.json());

const whitelist = [process.env.FRONTEND_URL];

const corsOptions = {
    origin: function(origin, callback) {
        if(whitelist.includes(origin)) {
            callback(null, true)
        }   else {
            callback(new Error('Error de Cors'))
        }
    }
}

app.use(cors(corsOptions));

app.use('/tasks', tasksRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})