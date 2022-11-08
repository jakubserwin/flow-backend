import { Request, Response } from 'express'
import multer, { FileFilterCallback } from 'multer'
import { User } from '../models'

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'src/public')
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1]
    cb(null, `user-${req.params.id}.${ext}`)
  }
})

const multerFilter = (_: Request, file: Express.Multer.File, cb: FileFilterCallback): void => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true)
  } else {
    cb(new Error('Not an image! Please upload only images.'))
  }
}

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: {
    fileSize: 5000000
  }
})

export const uploadAvatar = upload.single('avatar')

export const updateUser = (req: Request, res: Response): void => {
  User.findByIdAndUpdate(req.params.id, {
    avatar: req.file?.filename
  }, {
    new: true
  })
    .then(response => {
      res.status(200).json({
        status: 'Success',
        user: response
      })
    })
    .catch(() => {
      res.status(400).json({
        status: 'Failure',
        message: 'Something went wrong while trying to upload avatar'
      })
    })
}
