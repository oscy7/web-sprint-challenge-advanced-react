import React from "react";
import MutationObserver from 'mutationobserver-shim';
import { render, screen, waitFor } from "@testing-library/react";
import CheckoutForm from "./CheckoutForm";
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom/extend-expect';

// Write up the two tests here and make sure they are testing what the title shows

test("renders without errors", () => {
    render (<CheckoutForm/>)
});

test("shows success message on submit with form details", async () => {
    render(<CheckoutForm/>)

    const firstN = screen.getByLabelText(/first name:/i);
    const lastN = screen.getByLabelText(/last name:/i);
    const myAddress = screen.getByLabelText(/address:/i);
    const myCity = screen.getByLabelText(/city:/i);
    const myState = screen.getByLabelText(/state:/i);
    const myZip = screen.getByLabelText(/zip/i);

    userEvent.type(firstN, 'thisismyname');
    userEvent.type(lastN, 'thisismylastname');
    userEvent.type(myAddress, 'thisismyaddress');
    userEvent.type(myCity, 'thisismycity');
    userEvent.type(myState, 'thisisstate');
    userEvent.type(myZip, '123456');

    const pressButton = screen.getByRole('button');
    userEvent.click(pressButton);

    await waitFor(() => {
        const showFirstN = screen.queryByText(/thisismyname/i);
        const showLastN = screen.queryByText(/thisismylastname/i);
        const showMyAddress = screen.queryByText(/thisismyaddress/i);
        const showMyCity = screen.queryByText(/thisismycity/i);
        const showMyState = screen.queryByText(/thisisstate/i);
        const showMyZip = screen.queryByText(/123456/i);

        const successMessage = screen.queryByText(/You have ordered some plants! Woo-hoo!/i);

        expect(showFirstN).toBeInTheDocument();
        expect(showLastN).toBeInTheDocument();
        expect(showMyAddress).toBeInTheDocument();
        expect(showMyCity).toBeInTheDocument();
        expect(showMyState).toBeInTheDocument();
        expect(showMyZip).toBeInTheDocument();


        expect(successMessage).toBeInTheDocument();
        

    })
    
 })
