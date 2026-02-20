import multer from "multer";

const storage = multer.memoryStorage()

// for single file upload
export const singleUpload = multer({storage}).single('files')

// for multiple file upload
export const multipleUpload = multer({storage}).array('files', 5) // max 5 images