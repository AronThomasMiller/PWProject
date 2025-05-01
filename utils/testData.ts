import { BillingAddress, PaymentData, PaymentMethod } from "./types";

export const billingAddressData: BillingAddress = {
  street: "Main St, 123",
  city: "Kyiv",
  state: "UA",
  country: "UA",
  postCode: "01001",
};

export const paymentData: PaymentData = {
  cardNumber: "1111-1111-1111-1111",
  cvv: "111",
  cardHolder: "Test User",
};

export const paymentMethod: PaymentMethod = {
  paymentType1: "Credit Card",
};
