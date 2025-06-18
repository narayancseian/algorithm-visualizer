import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";

interface AlgorithmCardProps {
  title: string;
  description: string;
  category: string;
  timeComplexity: string;
  spaceComplexity: string;
  path: string;
  completed?: boolean;
}

const AlgorithmCard = ({
  title,
  description,
  category,
  timeComplexity,
  spaceComplexity,
  path,
  completed = false,
}: AlgorithmCardProps) => {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{title}</CardTitle>
          <Badge variant={completed ? "default" : "outline"}>
            {completed ? "Completed" : "Not Started"}
          </Badge>
        </div>
        <CardDescription className="flex gap-2 mt-1">
          <Badge variant="secondary">{category}</Badge>
        </CardDescription>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground">{description}</p>
        
        <div className="mt-4 space-y-1 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Time Complexity:</span>
            <span className="font-mono">{timeComplexity}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Space Complexity:</span>
            <span className="font-mono">{spaceComplexity}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter>
        <NavLink to={path} className="w-full">
          <Button className="w-full">
            {completed ? "Review Algorithm" : "Start Learning"}
          </Button>
        </NavLink>
      </CardFooter>
    </Card>
  );
};

export default AlgorithmCard;