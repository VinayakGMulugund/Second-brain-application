import { Router } from "express";
import { linksModel } from "../schema/linksModel";
import { auth } from "../middleware/auth";
import { contentModel } from "../schema/contentModel";
import { UserModel } from "../schema/userModel";

const shareRouter = Router();

// @ts-ignore
shareRouter.post('/share', auth, async (req, res) => {
  const share = req.body.share;
  if (share) {
    await linksModel.create({   // @ts-ignore
      userId: req.userId,      hash: randomHash(10)
    })
  } else {
    // @ts-ignore
    await linksModel.deleteOne({userId: req.userId})
  }
})

shareRouter.get('/:shareLink', async (req, res) => {
  const hash = req.params.shareLink;
  const link = await linksModel.findOne({hash});
  if (!link) {
    res.status(404).json({message: 'Incorrect request'})
    return
  }
  const content = await contentModel.find({userId: link.userId})
  const user = await UserModel.findOne({_id: link.userId});
  res.json({username: user?.username, content})
})

const randomHash = (len: number) => {
  const options = '1234567890qwertyuiopasdfghjklzxcvbnm';
  let ans = '';
  for (let i=0; i<len; i++) {
    ans += options[Math.floor(Math.random() * options.length)];
  }
  return ans;
}

export default shareRouter