import { calculateInvestmentResults } from "../util/investment.js";

export default function Results({ input }) {
  const resultsData = calculateInvestmentResults(input);

  return <p>Results...</p>;
}
