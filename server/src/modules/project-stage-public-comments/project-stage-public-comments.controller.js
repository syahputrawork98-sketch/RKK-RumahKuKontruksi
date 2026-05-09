import * as repository from './project-stage-public-comments.repository.js';

export const getStageComments = async (req, res, next) => {
  try {
    const { stageId } = req.params;
    const comments = await repository.findByStageId(stageId);
    res.json({ success: true, data: comments });
  } catch (error) {
    next(error);
  }
};

export const createComment = async (req, res, next) => {
  try {
    const { stageId } = req.params;
    const { projectId, authorRole, authorId, authorName, message, parentId, isOfficial } = req.body;

    // Basic Validation
    if (!message || !authorRole || !projectId) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    // Role-based Validation
    if (isOfficial && authorRole !== 'admin') {
      return res.status(403).json({ success: false, message: 'Only admins can post official updates' });
    }

    if (authorRole === 'customer' && !parentId) {
      return res.status(403).json({ success: false, message: 'Customers can only reply to existing updates' });
    }

    // If it's a reply, verify parent exists
    if (parentId) {
      const parent = await repository.findById(parentId);
      if (!parent) {
        return res.status(404).json({ success: false, message: 'Parent comment not found' });
      }
    }

    const comment = await repository.create({
      projectId,
      stageId,
      authorRole,
      authorId,
      authorName,
      message,
      parentId,
      isOfficial: isOfficial || false,
      status: 'published'
    });

    res.status(201).json({ success: true, data: comment });
  } catch (error) {
    next(error);
  }
};

export const updateComment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { message, status } = req.body;
    
    const comment = await repository.update(id, { message, status });
    res.json({ success: true, data: comment });
  } catch (error) {
    next(error);
  }
};

export const deleteComment = async (req, res, next) => {
  try {
    const { id } = req.params;
    await repository.softDelete(id);
    res.json({ success: true, message: 'Comment deleted successfully' });
  } catch (error) {
    next(error);
  }
};
