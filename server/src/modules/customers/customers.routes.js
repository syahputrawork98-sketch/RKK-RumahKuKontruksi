import express from 'express';
import * as CustomerController from './customers.controller.js';

const router = express.Router();

router.get('/', CustomerController.getCustomers);
router.get('/:id', CustomerController.getCustomerById);
router.post('/', CustomerController.createCustomer);
router.patch('/:id', CustomerController.updateCustomer);
router.delete('/:id', CustomerController.deleteCustomer);

export default router;
