const express = require('express');
const {
    getComments,
    createComment, // Ensure this matches the exported function name
    getComment,
    updateComment,
    deleteComment
} = require('../controllers/commentController'); // Ensure the path is correct

const router = express.Router({ mergeParams: true });

// Define routes
router.route('/')
    .get(getComments)
    .post(createComment); // Ensure createComment is defined

router.route('/:commentId')
    .get(getComment)
    .put(updateComment)
    .delete(deleteComment);

module.exports = router;