import * as DesignTenderRepository from './design-tenders.repository.js';
import * as DesignRequestRepository from '../design-requests/design-requests.repository.js';

export const getTenders = async (req, res, next) => {
  try {
    const filters = {
      status: req.query.status
    };
    const data = await DesignTenderRepository.findAll(filters);
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const getOpenTenders = async (req, res, next) => {
  try {
    const data = await DesignTenderRepository.findAll({ status: 'open' });
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const getTenderById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await DesignTenderRepository.findById(id);
    if (!data) {
      return res.status(404).json({ success: false, message: 'Design tender not found' });
    }
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const publishTender = async (req, res, next) => {
  try {
    const { designRequestId, baseDesignFee, title, description } = req.body;

    if (!designRequestId || !baseDesignFee) {
      return res.status(400).json({ success: false, message: 'Design Request ID and Base Design Fee are required' });
    }

    const designRequest = await DesignRequestRepository.findById(designRequestId);
    if (!designRequest) {
      return res.status(404).json({ success: false, message: 'Design Request not found' });
    }

    // Check if already published
    const existing = await DesignTenderRepository.findAll();
    if (existing.find(t => t.designRequestId === designRequestId && !t.deletedAt)) {
      return res.status(400).json({ success: false, message: 'Design Request already has an active tender' });
    }

    const fee = Number(baseDesignFee);
    const platformFee = fee * 0.3;
    const drafterBudget = fee * 0.7;

    const data = await DesignTenderRepository.create({
      designRequestId,
      title: title || designRequest.title,
      description: description || designRequest.description,
      baseDesignFee: fee,
      platformFeeAmount: platformFee,
      drafterBudgetAmount: drafterBudget,
      publishedAt: new Date(),
      status: 'open'
    });

    res.status(201).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const submitBid = async (req, res, next) => {
  try {
    const { id } = req.params; // tender id
    const { architectId, bidAmount, message, estimatedDurationDays } = req.body;

    if (!architectId || !bidAmount) {
      return res.status(400).json({ success: false, message: 'Architect ID and Bid Amount are required' });
    }

    const tender = await DesignTenderRepository.findById(id);
    if (!tender) {
      return res.status(404).json({ success: false, message: 'Tender not found' });
    }

    if (tender.status !== 'open') {
      return res.status(400).json({ success: false, message: 'Tender is not open for bidding' });
    }

    // Validate budget
    if (Number(bidAmount) > Number(tender.drafterBudgetAmount)) {
      return res.status(400).json({ 
        success: false, 
        message: `Bid amount cannot exceed drafter budget (Rp ${Number(tender.drafterBudgetAmount).toLocaleString('id-ID')})` 
      });
    }

    // Check if already bid
    const existingBid = await DesignTenderRepository.findBidByTenderAndArchitect(id, architectId);
    if (existingBid && !existingBid.deletedAt) {
      return res.status(400).json({ success: false, message: 'You have already submitted a bid for this tender' });
    }

    const data = await DesignTenderRepository.createBid({
      designTenderId: id,
      architectId,
      bidAmount: Number(bidAmount),
      message,
      estimatedDurationDays: estimatedDurationDays ? Number(estimatedDurationDays) : null,
      status: 'submitted'
    });

    res.status(201).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const awardBid = async (req, res, next) => {
  try {
    const { id, bidId } = req.params;

    const tender = await DesignTenderRepository.findById(id);
    if (!tender) {
      return res.status(404).json({ success: false, message: 'Tender not found' });
    }

    if (tender.status !== 'open') {
      return res.status(400).json({ success: false, message: 'Only open tenders can be awarded' });
    }

    const bid = await DesignTenderRepository.findBidById(bidId);
    if (!bid || bid.designTenderId !== id) {
      return res.status(404).json({ success: false, message: 'Bid not found for this tender' });
    }

    const data = await DesignTenderRepository.awardBid(id, bidId);
    res.json({ success: true, message: 'Bid awarded successfully', data });
  } catch (error) {
    next(error);
  }
};

export const getDesignTenderBids = async (req, res, next) => {
  try {
    const { id } = req.params;
    const tender = await DesignTenderRepository.findById(id);
    if (!tender) {
      return res.status(404).json({ success: false, message: 'Tender not found' });
    }
    res.json({ success: true, data: tender.bids || [] });
  } catch (error) {
    next(error);
  }
};

export const deleteTender = async (req, res, next) => {
  try {
    const { id } = req.params;
    await DesignTenderRepository.softDelete(id);
    res.json({ success: true, message: 'Tender cancelled successfully' });
  } catch (error) {
    next(error);
  }
};
