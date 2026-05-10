import * as PaymentRepository from './customer-payment-plans.repository.js';
import * as ProjectRepository from '../projects/projects.repository.js';
import { serializeDecimal } from '../../utils/decimalHelper.js';

export const getPaymentPlan = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const plan = await PaymentRepository.findByProjectId(projectId);
    
    res.json({
      success: true,
      data: serializeDecimal(plan)
    });
  } catch (error) {
    next(error);
  }
};

export const setupPaymentPlan = async (req, res, next) => {
  try {
    const { projectId, type, milestones } = req.body;
    const { actorRole } = req.body; // In local dev, we pass this in body

    if (actorRole !== 'admin' && actorRole !== 'superadmin') {
      return res.status(403).json({
        success: false,
        message: 'Only Admin or Superadmin can setup payment plans.'
      });
    }

    const project = await ProjectRepository.findById(projectId);
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    const existingPlan = await PaymentRepository.findByProjectId(projectId);
    
    let result;
    if (existingPlan) {
      result = await PaymentRepository.updatePlan(existingPlan.id, { type, milestones });
    } else {
      result = await PaymentRepository.createPlan({ projectId, type, milestones });
    }

    res.json({
      success: true,
      message: 'Payment plan setup successfully (Local Billing Plan).',
      data: serializeDecimal(result)
    });
  } catch (error) {
    next(error);
  }
};

export const updateMilestone = async (req, res, next) => {
  try {
    const { milestoneId } = req.params;
    const { status, actorRole } = req.body;

    if (actorRole !== 'admin' && actorRole !== 'superadmin') {
      return res.status(403).json({
        success: false,
        message: 'Only Admin or Superadmin can update milestone status.'
      });
    }

    const updated = await PaymentRepository.updateMilestoneStatus(milestoneId, status);

    res.json({
      success: true,
      message: `Status milestone diperbarui menjadi ${status} (Simulasi Lokal).`,
      data: serializeDecimal(updated)
    });
  } catch (error) {
    next(error);
  }
};

export const getInitializationData = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const project = await ProjectRepository.findById(projectId);
    const rab = await ProjectRepository.findRabByProjectId(projectId);

    if (!project) {
       return res.status(404).json({ success: false, message: 'Project not found' });
    }

    // Default milestones for PROGRESS_BASED
    const totalBudget = parseFloat(project.budgetTotal || 0);
    const defaultProgressMilestones = [
      { label: 'Down Payment (Awal)', percentage: 30, amount: totalBudget * 0.3, dueOrder: 1 },
      { label: 'Termin 2 (Progress 50%)', percentage: 30, amount: totalBudget * 0.3, dueOrder: 2 },
      { label: 'Termin 3 (Pelunasan 100%)', percentage: 30, amount: totalBudget * 0.3, dueOrder: 3 },
      { label: 'Retensi (Pemeliharaan)', percentage: 10, amount: totalBudget * 0.1, dueOrder: 4 },
    ];

    // Default milestones for CATEGORY_BASED
    const defaultCategoryMilestones = rab?.categories?.map((cat, index) => ({
      label: `Penyelesaian ${cat.name}`,
      categoryId: cat.id,
      amount: parseFloat(cat.subtotal || 0),
      dueOrder: index + 1
    })) || [];

    res.json({
      success: true,
      data: serializeDecimal({
        project,
        rab,
        defaults: {
          PROGRESS_BASED: defaultProgressMilestones,
          CATEGORY_BASED: defaultCategoryMilestones
        }
      })
    });
  } catch (error) {
    next(error);
  }
};
