import {JackpotsAggregate} from "../../../../core/aggregate/jackpots.aggregate";
import {graphqlStub} from "./graphql.stub";

export const jackpotAggregateStub = new JackpotsAggregate();
jackpotAggregateStub[graphqlStub.data.jackpots[0].game] = {
  "game": graphqlStub.data.jackpots[0].game,
  "amount": graphqlStub.data.jackpots[0].amount
};
