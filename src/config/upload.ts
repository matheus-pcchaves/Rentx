import crypto from "crypto"
import multer from "multer";
import { resolve } from "path"

const tmpfolder = resolve(__dirname, "..", "..", "tmp")

export default {
    tmpfolder,
    
    storage: multer.diskStorage({
        destination: tmpfolder,
        filename: (request, file, callback) => {
            const fileHash = crypto.randomBytes(16).toString("hex")
            const fileName = `${fileHash}-${file.originalname}`

            return callback(null, fileName)
        }
    })
}