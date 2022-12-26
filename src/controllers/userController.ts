import { Request, Response } from 'express'
import { Board } from '../models'

// const multerStorage = multer.diskStorage({
//   destination: (req: Request, res: Express.Multer.File, cb: (error: (Error | null), filename: string) => void) => {
//     cb(null, './src/public')
//   },
//   filename: (req: Request, file: Express.Multer.File, callback: (error: (Error | null), filename: string) => void) => {
//     callback(null, `user-${req.params.id}-${Date.now()}.${file.originalname}`)
//   }
// })
//
// const multerFilter = (_: Request, file: Express.Multer.File, cb: FileFilterCallback): void => {
//   if (file.mimetype.startsWith('image')) {
//     cb(null, true)
//   } else {
//     cb(new Error('Not an image! Please upload only images.'))
//   }
// }
//
// const upload = multer({
//   storage: multerStorage,
//   fileFilter: multerFilter,
//   limits: {
//     fileSize: 5000000
//   }
// })

// export const uploadAvatar = upload.single('avatar')

// TODO: Choosing avatar then we need to update avatar field
// export const updateUser = (req: Request, res: Response): void => {
//   User.findByIdAndUpdate(req.params.id, {
//     avatar: req.file?.filename
//   }, {
//     new: true
//   })
//     .then(response => {
//       res.status(200).json({
//         status: 'Success',
//         user: response
//       })
//     })
//     .catch((error) => {
//       res.status(400).json({
//         status: 'Failure',
//         message: 'Something went wrong while trying to upload avatar',
//         error
//       })
//     })
// }

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
