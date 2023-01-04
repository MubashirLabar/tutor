import * as multer from 'multer';
import { v4 as uuidv4 } from 'uuid';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + '../../../public/images/');
  },

  filename: function (req, file, cb) {
    if (!req.body.documents) req.body.documents = [];
    const unique_code = uuidv4();
    const name = file.originalname;
    const image_path = unique_code + '_' + name;
    req.body.documents.push({ name, image_path });
    cb(null, image_path);
    req.body.image_path = image_path;
  }
});
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/png'
  ) {
    cb(null, true);
  } else {
    cb(new Error('Image uploaded is not of type jpg/jpeg  or png'), false);
  }
};

export const upload = multer({ storage: storage, fileFilter: fileFilter });
