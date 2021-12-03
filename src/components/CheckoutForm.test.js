import React from "react";
import MutationObserver from 'mutationobserver-shim';
import { render, screen, waitFor } from "@testing-library/react";
import CheckoutForm from "./CheckoutForm";
import userEvent from "@testing-library/user-event";
//import '@testing-library/jest-dom/extend-expect';

// Write up the two tests here and make sure they are testing what the title shows

test("renders without errors", () => {
    render (<CheckoutForm/>)
});

test("shows success message on submit with form details", () => {
    render(<CheckoutForm/>)

    const firstN = screen.getByLabelText(/first name:/i);
    const lastN = screen.getByLabelText(/last name:/i);
    const myAddress = screen.getByLabelText(/address:/i);
    const myCity = screen.getByLabelText(/city:/);
    const myState = screen.getByLabelText(/state:/i);
    const myZip = screen.getByLabelText(/zip/i);

    userEvent.type(firstN, 'thisismyname');
    userEvent.type(lastN, 'thisismylastname');
    userEvent.type(myAddress, 'thisismyaddress');
    userEvent.type(myCity, 'thisismycity');
    userEvent.type(myState, 'thisisstate');
    userEvent.type(myZip, 'thisismyzip');

    const pressButton = screen.getByRole('button');
    userEvent.click(pressButton);

    await waitFor(() => {
        const showFirstN = screen.queryByText(/first name:/i);
        const showLastN = screen.queryByText(/last name:/i);
        const showMyAddress = screen.queryByText(/address:/i);
        const showMyCity = screen.queryByText(/city:/);
        const showMyState = screen.queryByText(/state:/i);
        const showMyZip = screen.queryByText(/zip/i);

        expect(showFirstN).toBeInTheDocument();
        expect(showLastN).toBeInTheDocument();
        expect(showMyAddress).toBeInTheDocument();
        expect(showMyCity).toBeInTheDocument();
        expect(showMyState).toBeInTheDocument();
        expect(showMyZip).toBeInTheDocument();

    })
});
