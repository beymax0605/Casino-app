import {JackpotsAggregate} from "../../../../core/aggregate/jackpots.aggregate";

export const jackpotAggregateStub = new JackpotsAggregate();
jackpotAggregateStub["BSTHEEXTERMINATOR"] = {
  "game": "BSTHEEXTERMINATOR",
  "amount": 29699
};

jackpotAggregateStub["NYXSUPERMAN"] = {
  "game": "NYXSUPERMAN",
  "amount": 9670
};

export const jackpotsDataStub = [
  {
    "game": "BSTHEEXTERMINATOR",
    "amount": 29699
  },
  {
    "game": "NYXSUPERMAN",
    "amount": 9670
  }
];
