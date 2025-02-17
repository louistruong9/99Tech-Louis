import ImplementationBlock from "@/components/ImplementationBlock";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const code = `interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string;
}

interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
  usdValue: number;
}

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

const WalletPage: React.FC<Props> = (props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  const getPriority = (blockchain: string): number => {
    switch (blockchain) {
      case 'Osmosis':
        return 100;
      case 'Ethereum':
        return 50;
      case 'Arbitrum':
        return 30;
      case 'Zilliqa':
      case 'Neo':
        return 20;
      default:
        return -99;
    }
  };

  const processedBalances: FormattedWalletBalance[] = balances
    .filter((balance) => {
      const priority = getPriority(balance.blockchain);
      return priority > -99 && balance.amount > 0;
    })
    .map((balance) => {
      const usdValue = (prices[balance.currency] || 0) * balance.amount;
      return {
        ...balance,
        formatted: balance.amount.toFixed(2),
        usdValue,
      };
    })
    .sort((a, b) => getPriority(b.blockchain) - getPriority(a.blockchain));

  return (
    <div {...rest}>
      {processedBalances.map((balance) => (
        <WalletRow
          key={balance.currency}
          amount={balance.amount}
          usdValue={balance.usdValue}
          formattedAmount={balance.formatted}
        />
      ))}
    </div>
  );
};
`;
const Solution3Refactor = () => {
  return (
    <Card>
      <CardHeader className="pb-0">
        <CardTitle>Problem 3</CardTitle>
        <CardDescription>Refactor code</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-sm mb-0">
          In the improved version, I did not use useMemo for the
          processedBalances variable because using useMemo does not always
          provide performance benefits, especially when the calculations are not
          complex or resource-intensive. Overusing useMemo can lead to more
          complex code without significant performance improvements.
          <br />
          In this case, filtering, mapping, and sorting balances can be done
          directly during rendering without useMemo, unless you notice
          significant performance issues when processing a large amount of data.
        </p>
        <ImplementationBlock title="" code={code} />
      </CardContent>
    </Card>
  );
};

export default Solution3Refactor;
