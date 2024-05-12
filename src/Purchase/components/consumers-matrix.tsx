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
  return (
    <div className={cn("flex max-w-full flex-col gap-2", className)}>
      <span className="mx-auto w-full max-w-xl px-4 text-muted-foreground">
        Select who benefited from each purchase.
      </span>

      <div className="max-w-full overflow-auto px-4 pb-4">
        <div>
          <table>
            <thead>
              <tr>
                <th>Person</th>
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
                  <td>{person.name}</td>

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
