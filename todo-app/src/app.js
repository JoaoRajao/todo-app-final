const express = require('express');
const app = express();
const taskRoutes = require('./routes/taskRoutes');
const cors = require('cors');


app.use(express.json());
app.use(cors());
app.use('/tasks', taskRoutes);
app.use(cors({origin: '*'}))
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
