// fileUploadMiddleware.ts
import multer from 'multer';


// Define storage options for Multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Middleware function to handle file upload
export const fileUploadMiddleware = upload.single('image');
