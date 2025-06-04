import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type Child = {
  id: string
  name: string
  color: string
  textColor: string
  status?: string
}

type ChildSelectorProps = {
  children: React.ReactNode
  defaultValue?: string
  childrenData: Child[]
}

export function ChildSelector({ children, defaultValue, childrenData }: ChildSelectorProps) {
  return (
    <Tabs defaultValue={defaultValue || childrenData[0]?.id} className="w-full">
      <TabsList className="bg-white w-full justify-start overflow-x-auto p-1 rounded-xl">
        {childrenData.map((child) => (
          <TabsTrigger
            key={child.id}
            value={child.id}
            className={`flex items-center gap-2 rounded-lg data-[state=active]:${child.color}`}
          >
            <div className={`w-8 h-8 ${child.color} rounded-full flex items-center justify-center`}>
              <span className={`text-xs font-bold ${child.textColor}`}>{child.name.charAt(0)}</span>
            </div>
            <div className="text-left">
              <div className="font-medium">{child.name}</div>
              {child.status && <div className="text-xs text-[#6b7280]">{child.status}</div>}
            </div>
          </TabsTrigger>
        ))}
      </TabsList>

      {children}
    </Tabs>
  )
}