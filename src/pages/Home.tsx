import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@/components/ui/tabs"
import Solution1 from "./Solution1"
import Solution2 from "./Solution2"
import Solution3 from "./Solution3"
import Solution3Refactor from "./Solution3Refactor"

const Home = () => {
	return (
		<Tabs defaultValue="solution1" className="w-[600px]">
			<TabsList className="grid w-full grid-cols-4">
				<TabsTrigger className="cursor-pointer" value="solution1">Problem 1</TabsTrigger>
				<TabsTrigger className="cursor-pointer" value="solution2">Problem 2</TabsTrigger>
				<TabsTrigger className="cursor-pointer" value="solution3-explain">Problem 3 Explain</TabsTrigger>
				<TabsTrigger className="cursor-pointer" value="solution3-refactor">Problem 3 Refactor</TabsTrigger>
			</TabsList>
			<TabsContent value="solution1">
				<Solution1 />
			</TabsContent>
			<TabsContent value="solution2">
				<Solution2 />
			</TabsContent>
			<TabsContent value="solution3-explain">
				<Solution3 />
			</TabsContent>
			<TabsContent value="solution3-refactor">
				<Solution3Refactor />
			</TabsContent>
		</Tabs>
	)
}

export default Home