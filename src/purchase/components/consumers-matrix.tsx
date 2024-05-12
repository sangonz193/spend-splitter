import { ReducerAction, ReducerState } from "@/App"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/cn"

type Props = {
  state: ReducerState
  className?: string
  dispatch: React.Dispatch<ReducerAction>
}

export function ConsumersMatrix({ state, className, dispatch }: Props) {
  if (state.persons.length === 0 || state.purchases.length === 0) {
    return null
  }

  return (
    <div
      className={cn("mx-auto flex w-full max-w-full flex-col gap-2", className)}
    >
      <span className="mx-auto w-full max-w-xl text-muted-foreground">
        Select who benefited from each purchase.
      </span>

      <div className="flex w-full overflow-auto">
        <div className="mx-auto min-w-[36rem] px-4 pb-4">
          <table>
            <thead>
              <tr>
                <th className="px-4">Person</th>
                {state.purchases.map((purchase) => {
                  return (
                    <th key={purchase.id}>
                      <Button
                        variant="ghost"
                        className="flex h-auto flex-col p-2 px-4"
                        onClick={() => {
                          const allSelected = state.persons.every((person) =>
                            purchase.consumerIds.includes(person.id),
                          )

                          if (allSelected) {
                            state.persons.forEach((person) => {
                              dispatch({
                                type: "remove-person-from-purchase",
                                person,
                                purchase,
                              })
                            })
                          } else {
                            state.persons.forEach((person) => {
                              dispatch({
                                type: "add-person-to-purchase",
                                person,
                                purchase,
                              })
                            })
                          }
                        }}
                      >
                        <span className="text-center font-bold">
                          {purchase.name}
                        </span>

                        <span className="text-center text-muted-foreground">
                          ${purchase.amount}
                        </span>
                      </Button>
                    </th>
                  )
                })}
              </tr>
            </thead>
            <tbody>
              {state.persons.map((person) => (
                <tr key={person.id}>
                  <td className="px-4 text-center">{person.name}</td>

                  {state.purchases.map((purchase) => {
                    return (
                      <td key={purchase.id}>
                        <div className="flex py-2">
                          <Switch
                            className="mx-auto"
                            checked={purchase.consumerIds.includes(person.id)}
                            onCheckedChange={() => {
                              if (purchase.consumerIds.includes(person.id)) {
                                dispatch({
                                  type: "remove-person-from-purchase",
                                  person,
                                  purchase,
                                })
                              } else {
                                dispatch({
                                  type: "add-person-to-purchase",
                                  person,
                                  purchase,
                                })
                              }
                            }}
                          />
                        </div>
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
