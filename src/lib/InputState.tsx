import React from 'react';
import { formatDateComp } from './utilities';

const today = new Date();

const firstDayNextMonth = new Date(
  today.getFullYear(),
  today.getMonth() + 1,
  1
);

const defaultInputs = {
  //Dates
  start_date: '2020-09-28',
  end_date: '2021-06-01',
  //Income
  maintenance_loan: '',
  additional_income: '',
  //Rent
  include_rent: 'yes',
  rent_cost: '',
  rent_cost_MonthlyWeekly: 'monthly',
  rent_payment_period: '',
  next_rent_payment: formatDateComp(firstDayNextMonth),
  last_rent_payment: '2021-06-01',
  contract_start: '2020-07-01',
  contract_end: '2021-06-30',
  total_payments: '',
  payments_left: '',
  bills_included: 'no',
  bills_cost: '',
  bills_cost_MonthlyWeekly: 'monthly',
  //Groceries
  groceries_cost: '',
  start_balance: '0',
  input_choice: 'range',
  disposable_cash: '0',
};

const InputState = React.createContext(defaultInputs);

export const AppStateWrapper: React.FC = ({ children }) => {
  return (
    <InputState.Provider value={defaultInputs}>{children}</InputState.Provider>
  );
};

export default InputState;
