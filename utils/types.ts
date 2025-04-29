export type BillingAddress = {
  street: string;
  city: string;
  state: string;
  country: string;
  postCode: string;
};

export type PaymentData = {
  cardNumber: string;
  cvv: string;
  cardHolder: string;
};

export type PaymentMethod = {
  paymentType1: string;
};
