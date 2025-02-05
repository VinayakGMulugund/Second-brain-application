import express from 'express';
import { contentModel } from '../schema/contentModel';
import { auth } from '../middleware/auth';

const contentRouter = express.Router();

contentRouter.get('', (_req, res) => {
  try {
    const contents = contentModel.find();
    res.json({ content: contents });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
});

//@ts-ignore
contentRouter.delete('', auth, (req, res) => {
  try {
    const contentId = req.query.id;
    if (!contentId) {
      return res.status(400).json({ message: 'Bad Request' });
    }
    const content = contentModel.findOne({ id: contentId }) || {};

    //@ts-ignore
    if (content && content.userId && content.userId === res.userId) {
      // @ts-ignore
      contentModel.findByIdAndDelete(content._id);
      res.status(200).json({ message: 'Deleted Successfully' });
    } else {
      res.status(403).json({ message: 'You are not authorized to delete this document' });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
});

export default contentRouter;