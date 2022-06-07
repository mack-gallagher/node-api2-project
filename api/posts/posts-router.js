// implement your posts router here

const express = require('express');
const Post = require('./posts-model');


/*
module.exports = {
  find,
  findById,
  insert,
  update,
  remove,
  findPostComments,
  findCommentById,
  insertComment,
};
*/

const postsRouter = express.Router();
postsRouter.use(express.json());

postsRouter.get('/', (req, res) => {
  Post.find()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      res.status(500).json({ message: 'The posts information could not be retrieved' });
    })
}) 

postsRouter.get('/:id', (req, res) => {
  Post.findById(req.params.id)
    .then(result => {
      if (!result) {
        res.status(404).json({ message: 'The post with the specified ID does not exist.' });
        return;
      }
      res.status(200).json(result);
    })
    .catch(err => {
      res.status(500).json({ message: 'The posts information could not be retrieved' });
    })
})

postsRouter.post('/', (req, res) => {
  const form = Object.keys(req.body);
  if (form.length !== 2 || form.indexOf('title') === -1 || form.indexOf('title') === -1) {
    res.status(400).json({ message: 'Please provide title and contents for the post.' });
    return;
  }
  Post.insert(req.body)
    .then(result => {
      Post.findById(result.id)
        .then(result2 => {
          res.status(201).json(result2);
        })
    })
    .catch(err => {
      res.status(500).json(err);
    })
})

postsRouter.put('/:id', (req, res) => {
  const form = Object.keys(req.body);
  if (form.length !== 2 || form.indexOf('title') === -1 || form.indexOf('contents') === -1) {
    res.status(400).json({ message: 'Please provide title and contents for the post.' });
    return;
  }
  Post.update(req.params.id, req.body)
    .then(result => {
      if (!result) {
        res.status(404).json({ message: 'The post with the specified ID does not exist.' });
        return;
      }
      Post.findById(req.params.id)
        .then(result2 => {
          console.log(req.params.id);
          console.log(result2);
          res.json(result2);
        })
    })
    .catch(err => {
      res.status(500).json({ message: 'no' });
    })
})

postsRouter.delete('/:id', (req, res) => {
  Post.findById(req.params.id)
    .then(result => {
      if (!result) {
        res.status(404).json({ message: 'The post with the specified ID does not exist.' });
        return;
      }
      Post.remove(req.params.id)
        .then(result2 => {
          res.status(200).json(result);
        })
    })
    .catch(result => {
    })
})

postsRouter.get('/:id/comments', (req, res) => {
  Post.findById(req.params.id)
    .then(result => {
      if (!result) {
        res.status(404).json({ message: 'The post with the specified ID does not exist.' });
        return;
      }
      Post.findPostComments(req.params.id)
        .then(result2 => {
          res.status(200).json(result2);
        })
    })  
})

module.exports = postsRouter;
