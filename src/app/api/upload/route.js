import multer from "multer";
import path from "path";
import { NextResponse } from "next/server";

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/uploads/");
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  }),
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export const POST = (req, res) => {
  return new Promise((resolve, reject) => {
    upload.single("file")(req, res, (err) => {
      if (err) {
        reject(NextResponse.json({ error: err.message }, { status: 500 }));
        return;
      }

      const filePath = `/uploads/${req.file.filename}`;
      resolve(
        NextResponse.json({
          message: "File uploaded successfully",
          path: filePath,
        }),
      );
    });
  });
};
