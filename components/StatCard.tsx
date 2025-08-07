import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
interface StatCardProps {
  title: string;
  value: string | number;

  change?: string | number;
  changeType: 'up' | 'down';
}

export const StatCard = ({
  title,
  value,

  change,
  changeType,
}: StatCardProps) => {
  const ChangeIcon = changeType === 'up' ? ArrowUpRight : ArrowDownRight;
  const changeColor = changeType === 'up' ? 'text-green-500' : 'text-red-500';
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <ChangeIcon className={`h-4 w-4 ${changeColor}`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change && (
          <p
            className={`text-xs text-muted-foreground flex items-center ${changeColor}`}
          >
            <ChangeIcon className="mr-1 h-4 w-4" />
            {change}
          </p>
        )}
      </CardContent>
    </Card>
  );
};
export default StatCard;
