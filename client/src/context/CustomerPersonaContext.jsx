import React, { createContext, useContext, useState, useEffect } from "react";
import customerService from "../services/customerService";

const CustomerPersonaContext = createContext();

export const useCustomerPersona = () => {
    const context = useContext(CustomerPersonaContext);
    if (!context) {
        throw new Error("useCustomerPersona must be used within a CustomerPersonaProvider");
    }
    return context;
};

export const CustomerPersonaProvider = ({ children }) => {
    const [customers, setCustomers] = useState([]);
    const [selectedCustomerId, setSelectedCustomerId] = useState(
        localStorage.getItem("rkk_selected_customer_id") || ""
    );
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchCustomers = async () => {
        try {
            setLoading(true);
            const response = await customerService.getAllCustomers();
            if (response.data) {
                setCustomers(response.data);
                
                // If no customer selected yet, or selected customer not in list, pick the first one
                if (!selectedCustomerId && response.data.length > 0) {
                    handleSelectCustomer(response.data[0].id);
                } else if (selectedCustomerId) {
                    const found = response.data.find(c => c.id === selectedCustomerId);
                    if (found) {
                        setSelectedCustomer(found);
                    } else if (response.data.length > 0) {
                        handleSelectCustomer(response.data[0].id);
                    }
                }
            }
        } catch (error) {
            console.error("Failed to fetch customers for persona:", error);
        } finally {
            setLoading(false);
        }
    };

    // Fetch all customers for the switcher
    useEffect(() => {
        fetchCustomers();
    }, []);

    // Sync selectedCustomer when selectedCustomerId changes
    useEffect(() => {
        if (selectedCustomerId && customers.length > 0) {
            const found = customers.find(c => c.id === selectedCustomerId);
            if (found) {
                setSelectedCustomer(found);
            }
        }
    }, [selectedCustomerId, customers]);

    const handleSelectCustomer = (id) => {
        setSelectedCustomerId(id);
        localStorage.setItem("rkk_selected_customer_id", id);
        const found = customers.find(c => c.id === id);
        if (found) {
            setSelectedCustomer(found);
        }
    };

    return (
        <CustomerPersonaContext.Provider 
            value={{ 
                customers, 
                selectedCustomerId, 
                selectedCustomer, 
                handleSelectCustomer,
                refreshCustomerData: fetchCustomers,
                loading 
            }}
        >
            {children}
        </CustomerPersonaContext.Provider>
    );
};
