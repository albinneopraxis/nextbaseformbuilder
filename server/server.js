const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();

// CORS configuration
app.use((req, res, next) => {
  res.setHeader('X-Frame-Options', 'ALLOW-FROM https://your-pegasus-domain.com');
  next();
});

app.use(bodyParser.json());
app.use(cors(corsOptions));

// Set up file storage with multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Connect to MongoDB
mongoose.connect('mongodb+srv://albinmathew:Albinkmathew@nextbase.c5n35.mongodb.net/?retryWrites=true&w=majority&appName=Nextbase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define Schema and Model
const formSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  contactNumber: String,
  description: String,
  incidentDate: String,
  dashCam: String,
  files: [String],
  city: String,
  state: String,
  country: String,
  termsAccepted: Boolean,
  name: String,
});
const Form = mongoose.model('Form', formSchema);

// Ensure uploads directory exists
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

// POST endpoint for form submission
app.post('/submit-form', upload.array('files'), async (req, res) => {
  const { fullName, email, contactNumber, description, incidentDate, dashCam, city, state, country, termsAccepted, name } = req.body;
  const files = req.files.map(file => file.path);

  const formData = new Form({
    fullName,
    email,
    contactNumber,
    description,
    incidentDate,
    dashCam,
    files,
    city,
    state,
    country,
    termsAccepted,
    name,
  });

  try {
    await formData.save();
    res.status(200).send('Form submitted successfully');
  } catch (error) {
    res.status(500).send('Error submitting form: ' + error.message);
  }
});

// GET endpoint to fetch forms
app.get('/form', async (req, res) => {
  try {
    const forms = await Form.find();
    res.status(200).json(forms);
  } catch (error) {
    console.error('Error fetching forms:', error);
    res.status(500).send('Error fetching forms: ' + error.message);
  }
});

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
