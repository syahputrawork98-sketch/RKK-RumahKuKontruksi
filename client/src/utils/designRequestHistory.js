/**
 * Utility functions for parsing DesignRequestHistory
 * Principles: Pure functions, no side effects, no state mutation.
 */

export const getLatestHistoryByAction = (history, action) => {
    if (!history || !Array.isArray(history)) return null;
    return [...history]
        .filter(h => h.action === action)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];
};

export const hasHistoryAction = (history, action) => {
    if (!history || !Array.isArray(history)) return false;
    return history.some(h => h.action === action);
};

export const getLatestCustomerPostDesignDecision = (history) => {
    return getLatestHistoryByAction(history, 'customer_post_design_decision');
};

export const getLatestMandorPreparation = (history) => {
    return getLatestHistoryByAction(history, 'admin_mandor_selection_preparation');
};

export const getLatestConstructionReadiness = (history) => {
    return getLatestHistoryByAction(history, 'admin_construction_readiness_preparation');
};

export const getLatestConstructionTransitionReview = (history) => {
    return getLatestHistoryByAction(history, 'admin_construction_transition_review');
};

export const hasConstructionIntent = (history) => {
    const latest = getLatestCustomerPostDesignDecision(history);
    return latest?.metadata?.decision === 'continue_to_construction_preparation';
};

export const isMandorPreparationReady = (history) => {
    const latest = getLatestMandorPreparation(history);
    return latest?.metadata?.preparationStatus === 'shortlist_prepared';
};

export const isConstructionReadinessReady = (history) => {
    const latest = getLatestConstructionReadiness(history);
    return latest?.metadata?.readinessStatus === 'readiness_prepared';
};

export const isTransitionReviewReady = (history) => {
    const latest = getLatestConstructionTransitionReview(history);
    return latest?.metadata?.reviewStatus === 'reviewed_for_project_planning';
};

export const getConstructionTransitionFlags = (history) => {
    const latestDecision = getLatestCustomerPostDesignDecision(history);
    const latestMandorPrep = getLatestMandorPreparation(history);
    const latestReadiness = getLatestConstructionReadiness(history);

    return {
        hasConstructionIntent: latestDecision?.metadata?.decision === 'continue_to_construction_preparation',
        isMandorReady: latestMandorPrep?.metadata?.preparationStatus === 'shortlist_prepared',
        isReadinessReady: latestReadiness?.metadata?.readinessStatus === 'readiness_prepared',
        hasPlanning: hasHistoryAction(history, 'admin_curated_instruction'),
        hasReview: hasHistoryAction(history, 'admin_construction_transition_review')
    };
};

export const getProjectBridgeReadiness = (request) => {
    if (!request) return { isReady: false, reasons: ["Data tidak ditemukan."] };

    const history = request.history || [];
    const reasons = [];

    // 1. Status Check
    const isApproved = request.status === 'approved' || request.status === 'project_created' || request.status === 'finished';

    // 2. Project Existence Check
    const hasNoProject = !request.projectId && request.status !== 'project_created';

    // 3. Customer Intent Check
    const latestDecision = getLatestCustomerPostDesignDecision(history);
    const customerWantsConstruction = latestDecision?.metadata?.decision === 'continue_to_construction_preparation';

    // 4. Admin Review Check
    const hasFinalReview = hasHistoryAction(history, 'admin_construction_transition_review');

    if (!isApproved) {
        reasons.push("Status pengajuan belum Approved.");
    }
    if (!hasNoProject) {
        reasons.push("Project draft sudah pernah dibuat untuk pengajuan ini.");
    }
    if (!customerWantsConstruction) {
        reasons.push("Konsumen belum memilih alur 'Lanjut Konstruksi'.");
    }
    if (!hasFinalReview) {
        reasons.push("Review transisi final dari Admin belum dilakukan.");
    }

    return {
        isReady: isApproved && hasNoProject && customerWantsConstruction && hasFinalReview,
        isApproved,
        hasNoProject,
        customerWantsConstruction,
        hasFinalReview,
        reasons
    };
};
