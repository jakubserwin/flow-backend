import { Request, Response, NextFunction } from 'express'
import multer, { FileFilterCallback } from 'multer'
// import sharp from 'sharp'
// import Jimp from 'jimp';
import { Board, User } from '../models'

const multerStorage = multer.memoryStorage()

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

export const resizeAvatar = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  if (req.file === undefined) return next()

  req.file.filename = `user-${req.params.id}-${Date.now()}.jpeg`
  // await sharp(req.file.buffer)
  //   .resize(500, 500)
  //   .toFormat('jpeg')
  //   .jpeg({ quality: 90 })
  //   .toFile(`src/public/${req.file.filename}`)

  // await Jimp.read('lenna.png', (err, lenna) => {
  //   if (err !== null) throw err
  //   lenna
  //     .resize(256, 256) // resize
  //     .quality(60) // set JPEG quality
  //     .greyscale() // set greyscale
  //     .write('lena-small-bw.jpg'); // save
  // });

  next()
}

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
    .catch((error) => {
      res.status(400).json({
        status: 'Failure',
        message: 'Something went wrong while trying to upload avatar',
        error
      })
    })
}

export const getMembers = async (req: Request, res: Response): Promise<void> => {
  try {
    const board = await Board.findById(req.params.id).populate('members')
    if (board === null) return
    res.status(200).json({
      status: 'Success',
      members: board.members
    })
  } catch (error) {
    res.status(400).json({
      status: 'Failure',
      message: 'Something went wrong while trying to get members!',
      error
    })
  }
}
