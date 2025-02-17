import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import ImplementationBlock from "@/components/ImplementationBlock";

const error1 = `interface WalletBalance {
  currency: string;
  amount: number;
}`;

const filterError = `if (lhsPriority > -99) {
  if (balance.amount <= 0) {
    return true;
  }
}
return false;`;

const sortError = `if (leftPriority > rightPriority) {
  return -1;
} else if (rightPriority > leftPriority) {
  return 1;
}`;

const useMemoIssue = `const sortedBalances = useMemo(() => {
  return balances.filter((balance: WalletBalance) => {
    const balancePriority = getPriority(balance.blockchain);
    if (lhsPriority > -99) {
      if (balance.amount <= 0) {
        return true;
      }
    }
    return false;
  }).sort((lhs: WalletBalance, rhs: WalletBalance) => {
    const leftPriority = getPriority(lhs.blockchain);
    const rightPriority = getPriority(rhs.blockchain);
    if (leftPriority > rightPriority) {
      return -1;
    } else if (rightPriority > leftPriority) {
      return 1;
    }
  });
}, [balances, prices]);`;

const solution4 = `.sort((a, b) => getPriority(b.blockchain) - getPriority(a.blockchain))`

const Solution3: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Code Analysis</CardTitle>
        <CardDescription>
          Detailed analysis of computational inefficiencies and anti-patterns in
          the provided code.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Issue 1: Missing Blockchain in WalletBalance Interface */}
        <div>
          <p className="text-sm font-semibold">
            1. Missing Blockchain in WalletBalance Interface
          </p>
          <ImplementationBlock
            title="1. Missing Blockchain in WalletBalance Interface"
            code={error1}
          />
          <p className="text-sm mt-2">
            The <code>blockchain</code> property is used in the code but is not
            declared in the <code>WalletBalance</code> interface.
          </p>
          <p className="text-sm mt-2">
            <strong>Solution:</strong> Add <code>blockchain: string;</code> to
            the <code>WalletBalance</code> interface.
          </p>
        </div>

        {/* Issue 2: Incorrect Use of useMemo */}
        <div>
          <ImplementationBlock
            title="2. Incorrect Use of useMemo"
            code={useMemoIssue}
          />
          <p className="text-sm mt-2">
            The <code>useMemo</code> hook is used to filter and sort{" "}
            <code>balances</code>, but <code>prices</code> is included in the
            dependency array unnecessarily.
          </p>
          <p className="text-sm mt-2">
            <strong>Solution:</strong> Remove <code>prices</code> from the
            dependency array since it is not used in the computation.
          </p>
        </div>

        {/* Issue 3: Incorrect Filter Logic */}
        <div>
          <p className="text-sm font-semibold">3. Incorrect Filter Logic</p>
          <ImplementationBlock
            title="Current Filter Logic"
            code={filterError}
          />
          <p className="text-sm mt-2">
            The filter logic returns <code>true</code> if{" "}
            <code>balance.amount &lt;= 0</code>, which is likely the opposite of
            the intended behavior.
          </p>
          <p className="text-sm mt-2">
            <strong>Solution:</strong> Update the filter logic to return{" "}
            <code>true</code> for <code>balance.amount &gt; 0</code>.
          </p>
        </div>

        {/* Issue 4: Incomplete Sort Logic */}
        <div>
          <p className="text-sm font-semibold">4. Incomplete Sort Logic</p>
          <ImplementationBlock title="Current Sort Logic" code={sortError} />
          <p className="text-sm mt-2">
            The sort logic is missing the case where{" "}
            <code>leftPriority === rightPriority</code>, which can lead to
            unstable sorting.
          </p>
          <ImplementationBlock
            title="Solution: Using array sort method"
            code={solution4}
          />
        </div>

        {/* Issue 5: Using Index as Key */}
        <div>
          <p className="text-sm font-semibold">5. Using Index as Key</p>
          <p className="text-sm mt-2">
            The code uses <code>index</code> as the <code>key</code> for
            elements in <code>rows</code>, which can cause issues if the order
            of elements changes.
          </p>
          <p className="text-sm mt-2">
            <strong>Solution:</strong> Use a unique and stable value (e.g.,{" "}
            <code>balance.currency</code>) as the <code>key</code>.
          </p>
        </div>

        {/* Issue 6: Unnecessary Calculation of formattedBalances */}
        <div>
          <p className="text-sm font-semibold">
            6. Unnecessary Calculation of formattedBalances
          </p>
          <p className="text-sm mt-2">
            The variable <code>formattedBalances</code> is calculated but not
            used, leading to unnecessary computation.
          </p>
          <p className="text-sm mt-2">
            <strong>Solution:</strong> Remove <code>formattedBalances</code>.
          </p>
        </div>

        {/* Issue 7: No Handling for Missing prices[balance.currency] */}
        <div>
          <p className="text-sm font-semibold">
            7. No Handling for Missing prices[balance.currency]
          </p>
          <ImplementationBlock
            title="Solution: Add a check to handle missing prices:"
            code={`const usdValue = (prices[balance.currency] || 0) * balance.amount`}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default Solution3;
